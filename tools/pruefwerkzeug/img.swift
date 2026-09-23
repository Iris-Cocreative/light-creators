// Kleines Bildwerkzeug fuer die Threshold-Atmosphaere.
// img crop IN X Y W H OUT            (Pixel, Ursprung oben links)
// img scale IN W OUT                 (Breite, Seitenverhaeltnis bleibt)
// img blur IN RADIUS OUT             (Gauss, Raender geklemmt)
// img encode IN FORMAT QUALITY OUT   (avif|jpeg|png, Qualitaet 0..1)
// img noise SIZE ALPHA OUT           (graue Rauschkachel mit fester Deckkraft, PNG)
// img stats IN                       (Min/Max/Mittel-Luminanz)
import Foundation
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let ctx = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!, .outputColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
let a = CommandLine.arguments
func load(_ p: String) -> CIImage { CIImage(contentsOf: URL(fileURLWithPath: p))! }
func cg(_ i: CIImage) -> CGImage { ctx.createCGImage(i, from: i.extent, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)! }
func write(_ img: CGImage, _ path: String, _ type: UTType, _ q: Double) {
  let d = CGImageDestinationCreateWithURL(URL(fileURLWithPath: path) as CFURL, type.identifier as CFString, 1, nil)!
  CGImageDestinationAddImage(d, img, [kCGImageDestinationLossyCompressionQuality: q] as CFDictionary)
  guard CGImageDestinationFinalize(d) else { fatalError("write failed") }
}
func norm(_ i: CIImage) -> CIImage { i.transformed(by: CGAffineTransform(translationX: -i.extent.minX, y: -i.extent.minY)) }

switch a[1] {
case "crop":
  let i = load(a[2]); let (x, y, w, h) = (Double(a[3])!, Double(a[4])!, Double(a[5])!, Double(a[6])!)
  // CoreImage hat den Ursprung unten links
  let r = CGRect(x: x, y: i.extent.height - y - h, width: w, height: h)
  write(cg(norm(i.cropped(to: r))), a[7], .png, 1)
case "scale":
  let i = load(a[2]); let s = Double(a[3])! / i.extent.width
  let f = CIFilter(name: "CILanczosScaleTransform")!
  f.setValue(i, forKey: kCIInputImageKey); f.setValue(s, forKey: kCIInputScaleKey); f.setValue(1.0, forKey: kCIInputAspectRatioKey)
  write(cg(norm(f.outputImage!)), a[4], .png, 1)
case "blur":
  let i = load(a[2])
  let b = i.clampedToExtent().applyingGaussianBlur(sigma: Double(a[3])!).cropped(to: i.extent)
  write(cg(norm(b)), a[4], .png, 1)
case "encode":
  let t: UTType = a[3] == "avif" ? UTType("public.avif")! : (a[3] == "jpeg" ? .jpeg : .png)
  write(cg(load(a[2])), a[5], t, Double(a[4])!)
case "noise":
  let n = Int(a[2])!, alpha = UInt8(Double(a[3])! * 255)
  var px = [UInt8](repeating: 0, count: n * n * 4)
  var g = SystemRandomNumberGenerator()
  for k in 0..<(n * n) {
    // nur abdunkelnd: schwarze Punkte, Deckkraft 0 bis 2*alpha, im Mittel alpha
    let al = UInt8(Int.random(in: 0...min(255, Int(alpha) * 2), using: &g))
    px[k*4] = 0; px[k*4+1] = 0; px[k*4+2] = 0; px[k*4+3] = al
  }
  let prov = CGDataProvider(data: Data(px) as CFData)!
  let img = CGImage(width: n, height: n, bitsPerComponent: 8, bitsPerPixel: 32, bytesPerRow: n * 4, space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue), provider: prov, decode: nil, shouldInterpolate: false, intent: .defaultIntent)!
  write(img, a[4], .png, 1)
case "stats":
  let img = cg(load(a[2])); let w = img.width, h = img.height
  var buf = [UInt8](repeating: 0, count: w * h * 4)
  let c = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4, space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  c.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
  func lin(_ v: UInt8) -> Double { let s = Double(v) / 255; return s <= 0.03928 ? s / 12.92 : pow((s + 0.055) / 1.055, 2.4) }
  var mx = 0.0, mn = 1.0, sum = 0.0, mxp = (0, 0, 0)
  for k in 0..<(w * h) { let L = 0.2126 * lin(buf[k*4]) + 0.7152 * lin(buf[k*4+1]) + 0.0722 * lin(buf[k*4+2]); sum += L; if L > mx { mx = L; mxp = (Int(buf[k*4]), Int(buf[k*4+1]), Int(buf[k*4+2])) }; mn = min(mn, L) }
  print(String(format: "%dx%d L min %.4f max %.4f mean %.4f brightest rgb(%d,%d,%d)", w, h, mn, mx, sum / Double(w * h), mxp.0, mxp.1, mxp.2))
default: break
}

// worst IN: fuer Schleierwerte den hellsten Pixel nach Schleier, Rauschen (5%) und Karte (4% Weiss)
if a[1] == "worst" {
  let img = cg(load(a[2])); let w = img.width, h = img.height
  var buf = [UInt8](repeating: 0, count: w * h * 4)
  let c = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4, space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  c.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
  func lin(_ s0: Double) -> Double { let s = s0 / 255; return s <= 0.03928 ? s / 12.92 : pow((s + 0.055) / 1.055, 2.4) }
  func L(_ p: [Double]) -> Double { 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]) }
  func cr(_ a: Double, _ b: Double) -> Double { (max(a, b) + 0.05) / (min(a, b) + 0.05) }
  let mid = [4.0, 23, 31]; let noiseA = Double(a[3])!
  for v in stride(from: 0.60, through: 0.90, by: 0.02) {
    var worst = 0.0
    for k in 0..<(w * h) {
      var p = (0..<3).map { v * mid[$0] + (1 - v) * Double(buf[k*4 + $0]) }
      p = p.map { $0 + noiseA * (255 - $0) }        // hellster Rauschpunkt
      let card = p.map { 0.96 * $0 + 0.04 * 255 }   // Karte rgba(255,255,255,.04)
      worst = max(worst, L(card))
    }
    let wg = L([168, 161, 150]), lift = L([184, 177, 166])
    print(String(format: "Schleier %.2f  hellster Grund L %.4f  warm-gray %.2f  #B8B1A6 %.2f", v, worst, cr(wg, worst), cr(lift, worst)))
  }
}
