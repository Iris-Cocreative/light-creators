// comp crop IN Y0 Y1 OUT          : Zeilen Y0..Y1 (oben=0) ausschneiden
// comp stack OUT BREITE ABSTAND IN...  : untereinander, jede auf BREITE skaliert
// comp row OUT HOEHE ABSTAND IN...     : nebeneinander, jede auf HOEHE skaliert
import Foundation; import CoreGraphics; import ImageIO; import UniformTypeIdentifiers
let a = CommandLine.arguments
func load(_ p: String) -> CGImage { CGImageSourceCreateImageAtIndex(CGImageSourceCreateWithURL(URL(fileURLWithPath: p) as CFURL, nil)!, 0, nil)! }
func save(_ i: CGImage, _ p: String) { let d = CGImageDestinationCreateWithURL(URL(fileURLWithPath: p) as CFURL, UTType.png.identifier as CFString, 1, nil)!; CGImageDestinationAddImage(d, i, nil); CGImageDestinationFinalize(d) }
func canvas(_ w: Int, _ h: Int) -> CGContext { let c = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!; c.setFillColor(CGColor(srgbRed: 0.016, green: 0.09, blue: 0.12, alpha: 1)); c.fill(CGRect(x: 0, y: 0, width: w, height: h)); c.interpolationQuality = .high; return c }
switch a[1] {
case "crop":
  let i = load(a[2]); let y0 = Int(a[3])!, y1 = min(i.height, Int(a[4])!)
  save(i.cropping(to: CGRect(x: 0, y: y0, width: i.width, height: y1 - y0))!, a[5])
case "stack":
  let W = Int(a[3])!, gap = Int(a[4])!; let ims = a[5...].map(load)
  let hs = ims.map { Int(Double($0.height) * Double(W) / Double($0.width)) }
  let H = hs.reduce(0, +) + gap * (ims.count - 1); let c = canvas(W, H); var y = H
  for (i, h) in zip(ims, hs) { y -= h; c.draw(i, in: CGRect(x: 0, y: y, width: W, height: h)); y -= gap }
  save(c.makeImage()!, a[2])
case "row":
  let Hh = Int(a[3])!, gap = Int(a[4])!; let ims = a[5...].map(load)
  let ws = ims.map { Int(Double($0.width) * Double(Hh) / Double($0.height)) }
  let W = ws.reduce(0, +) + gap * (ims.count - 1); let c = canvas(W, Hh); var x = 0
  for (i, w) in zip(ims, ws) { c.draw(i, in: CGRect(x: x, y: 0, width: w, height: Hh)); x += w + gap }
  save(c.makeImage()!, a[2])
default: break
}
