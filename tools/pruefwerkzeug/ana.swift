// ana contrast JOBS.json OUT.json : je Textfeld hellster Pixel (nach Luminanz) im Screenshot ohne Text
// ana rows PNG Y X0 X1           : mittlere Farbe je Pixelzeile Y-4 .. Y+3 im Bereich X0..X1
import Foundation
import CoreGraphics
import ImageIO

func loadPx(_ p: String) -> ([UInt8], Int, Int) {
  let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: p) as CFURL, nil)!
  let img = CGImageSourceCreateImageAtIndex(src, 0, nil)!
  let w = img.width, h = img.height
  var buf = [UInt8](repeating: 0, count: w * h * 4)
  let c = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4, space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  c.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
  return (buf, w, h)
}
func lin(_ s0: Double) -> Double { let s = s0 / 255; return s <= 0.03928 ? s / 12.92 : pow((s + 0.055) / 1.055, 2.4) }
func L(_ r: Double, _ g: Double, _ b: Double) -> Double { 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) }
let a = CommandLine.arguments
if a[1] == "contrast" {
  let jobs = try! JSONSerialization.jsonObject(with: Data(contentsOf: URL(fileURLWithPath: a[2]))) as! [[String: Any]]
  var out: [[String: Any]] = []
  for j in jobs {
    let (buf, w, h) = loadPx(j["png"] as! String)
    for r in j["rects"] as! [[String: Any]] {
      let x0 = max(0, Int(r["x0"] as! Double)), y0 = max(0, Int(r["y0"] as! Double))
      let x1 = min(w, Int((r["x1"] as! Double).rounded(.up))), y1 = min(h, Int((r["y1"] as! Double).rounded(.up)))
      if x1 <= x0 || y1 <= y0 { continue }
      let fg = r["fg"] as! [Double]
      var worst = 99.0, wp = [0.0, 0, 0]
      for y in y0..<y1 { for x in x0..<x1 {
        let k = (y * w + x) * 4
        let bg = [Double(buf[k]), Double(buf[k+1]), Double(buf[k+2])]
        let f = (0..<3).map { fg[$0] * fg[3] + bg[$0] * (1 - fg[3]) }
        let lf = L(f[0], f[1], f[2]), lb = L(bg[0], bg[1], bg[2])
        let cr = (max(lf, lb) + 0.05) / (min(lf, lb) + 0.05)
        if cr < worst { worst = cr; wp = bg }
      } }
      var o = r; o["ratio"] = (worst * 100).rounded() / 100; o["bg"] = wp.map { Int($0) }; o["png"] = j["png"]
      out.append(o)
    }
  }
  try! JSONSerialization.data(withJSONObject: out, options: [.prettyPrinted]).write(to: URL(fileURLWithPath: a[3]))
  print("\(out.count) Textfelder")
} else if a[1] == "rows" {
  let (buf, w, _) = loadPx(a[2]); let y = Int(a[3])!, x0 = Int(a[4])!, x1 = min(w, Int(a[5])!)
  var rows: [[Double]] = []
  for yy in (y - 4)...(y + 3) {
    var s = [0.0, 0, 0]
    for x in x0..<x1 { let k = (yy * w + x) * 4; for c in 0..<3 { s[c] += Double(buf[k + c]) } }
    rows.append(s.map { $0 / Double(x1 - x0) })
  }
  var maxd = 0.0
  for i in 0..<(rows.count - 1) { for c in 0..<3 { maxd = max(maxd, abs(rows[i + 1][c] - rows[i][c])) } }
  let atEdge = (0..<3).map { abs(rows[4][$0] - rows[3][$0]) }
  print(String(format: "%.2f %.2f %.2f %.2f", atEdge[0], atEdge[1], atEdge[2], maxd))
}
