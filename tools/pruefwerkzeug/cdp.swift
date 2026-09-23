// Minimaler DevTools-Client: arbeitet eine Jobliste (JSON) gegen einen laufenden
// headless Edge ab (--remote-debugging-port=9333). Je Job: Viewport setzen, Seite
// laden, CSS einschleusen, scrollen, optional JS auswerten, Screenshot speichern.
// Aufruf: cdp jobs.json results.json
import Foundation

struct Job: Codable { let url: String; let w: Int; let h: Int; let y: Int; let css: String?; let js: String?; let out: String? }

final class CDP {
  let ws: URLSessionWebSocketTask
  var nextId = 1
  init(_ url: URL) { ws = URLSession.shared.webSocketTask(with: url); ws.maximumMessageSize = 64 * 1024 * 1024; ws.resume() }
  func call(_ method: String, _ params: [String: Any] = [:]) async throws -> [String: Any] {
    let id = nextId; nextId += 1
    let msg = try JSONSerialization.data(withJSONObject: ["id": id, "method": method, "params": params])
    try await ws.send(.string(String(data: msg, encoding: .utf8)!))
    while true {
      let m = try await ws.receive()
      var d: Data
      switch m { case .string(let s): d = s.data(using: .utf8)!; case .data(let x): d = x; @unknown default: continue }
      guard let o = try JSONSerialization.jsonObject(with: d) as? [String: Any] else { continue }
      if let rid = o["id"] as? Int, rid == id {
        if let e = o["error"] { throw NSError(domain: "cdp", code: 1, userInfo: ["e": "\(method): \(e)"]) }
        return o["result"] as? [String: Any] ?? [:]
      }
    }
  }
  func eval(_ expr: String) async throws -> Any? {
    let r = try await call("Runtime.evaluate", ["expression": expr, "awaitPromise": true, "returnByValue": true])
    if let ex = r["exceptionDetails"] { throw NSError(domain: "js", code: 2, userInfo: ["e": "\(ex)"]) }
    return (r["result"] as? [String: Any])?["value"]
  }
}

let args = CommandLine.arguments
let jobs = try JSONDecoder().decode([Job].self, from: Data(contentsOf: URL(fileURLWithPath: args[1])))
let list = try JSONSerialization.jsonObject(with: Data(contentsOf: URL(string: "http://127.0.0.1:9333/json/list")!)) as! [[String: Any]]
let page = list.first { ($0["type"] as? String) == "page" }!
let cdp = CDP(URL(string: page["webSocketDebuggerUrl"] as! String)!)
var results: [[String: Any]] = []
let sema = DispatchSemaphore(value: 0)
Task {
  do {
    _ = try await cdp.call("Page.enable")
    _ = try await cdp.call("Network.enable")
    _ = try await cdp.call("Network.setCacheDisabled", ["cacheDisabled": true])
    // keine Messbesuche in der Statistik von davidliebnau.com
    _ = try await cdp.call("Network.setBlockedURLs", ["urls": ["*plausible.io*"]])
    var lastKey = ""
    for (n, j) in jobs.enumerated() {
      let key = "\(j.url)|\(j.w)|\(j.h)|\(j.css ?? "")"
      if key != lastKey {
        _ = try await cdp.call("Emulation.setDeviceMetricsOverride", ["width": j.w, "height": j.h, "deviceScaleFactor": 1, "mobile": false])
        _ = try await cdp.call("Page.navigate", ["url": j.url])
        // warten bis geladen, Schriften bereit, Bilder dekodiert
        _ = try await cdp.eval("new Promise(r => { const ok = () => document.readyState === 'complete' && location.href !== 'about:blank'; const t = () => ok() ? r(1) : setTimeout(t, 50); t(); })")
        // Bilder auf eager stellen und auf Schriften/Bilder warten, aber hoechstens 4s:
        // ein lazy-Bild weit unterhalb des Fensters dekodiert sonst nie.
        _ = try await cdp.eval("""
          (async () => { document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
            const warten = Promise.all([document.fonts.ready, ...[...document.images].map(i => i.decode().catch(() => 0))]);
            await Promise.race([warten, new Promise(r => setTimeout(r, 4000))]); return 1; })()
          """)
        if let css = j.css { _ = try await cdp.eval("(() => { const s = document.createElement('style'); s.id = '__hide'; s.textContent = \(String(data: try JSONSerialization.data(withJSONObject: [css]), encoding: .utf8)!)[0]; document.head.appendChild(s); return 1; })()") }
        _ = try await cdp.eval("document.documentElement.style.scrollBehavior = 'auto'; 1")
        lastKey = key
      }
      _ = try await cdp.eval("window.scrollTo(0, \(j.y)); new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => r(1), 120))))")
      var res: [String: Any] = ["i": n]
      if let js = j.js { res["js"] = try await cdp.eval(js) ?? NSNull() }
      res["scrollY"] = try await cdp.eval("window.scrollY") ?? NSNull()
      if let out = j.out {
        let s = try await cdp.call("Page.captureScreenshot", ["format": "png", "captureBeyondViewport": false])
        try Data(base64Encoded: s["data"] as! String)!.write(to: URL(fileURLWithPath: out))
        res["out"] = out
      }
      results.append(res)
      FileHandle.standardError.write("\(n + 1)/\(jobs.count)\r".data(using: .utf8)!)
    }
  } catch { FileHandle.standardError.write("ERROR \(error)\n".data(using: .utf8)!) }
  sema.signal()
}
sema.wait()
try JSONSerialization.data(withJSONObject: results, options: [.prettyPrinted]).write(to: URL(fileURLWithPath: args[2]))
print("\(results.count) Jobs")
