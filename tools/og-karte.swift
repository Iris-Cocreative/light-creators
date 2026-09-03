// og-Karte für /fuehren/, 1200 x 628. Reproduzierbarer Bau der Datei, die
// unter assets/og-image-fuehren-de.jpg und -en.jpg liegt.
//
// Aufruf:
//   swiftc -O tools/og-karte.swift -o /tmp/og-karte
//   /tmp/og-karte <arbeitsverzeichnis> assets/hero-fuehren-split.webp <ziel.jpg> C de
//
// <arbeitsverzeichnis> muss einen Unterordner ttf/ mit den entpackten
// Schriften enthalten. Die woff2-Dateien aus assets/fonts/ lassen sich mit
// fonttools umwandeln:
//   python3 -c "from fontTools.ttLib import TTFont; \
//     f=TTFont('assets/fonts/cormorant-400-normal-latin.woff2'); f.flavor=None; \
//     f.save('ttf/cormorant-400-normal-latin.ttf')"
// Gebraucht werden cormorant-400-normal-latin, cormorant-400-italic-latin,
// hanken-300-normal-latin und hanken-500-normal-latin.
//
// Varianten: A Name groß, B Headline, C Claim groß. Live ist C.
import Foundation
import CoreGraphics
import CoreText
import ImageIO
import UniformTypeIdentifiers

let S = CommandLine.arguments[1]          // Scratchpad
let QUELLE = CommandLine.arguments[2]     // Portrait
let ZIEL = CommandLine.arguments[3]       // Ausgabedatei
let VARIANTE = CommandLine.arguments[4]   // A | B | C
let SPRACHE = CommandLine.arguments.count > 5 ? CommandLine.arguments[5] : "de"

let B: CGFloat = 1200, H: CGFloat = 628
let RAND: CGFloat = 44, KANTE: CGFloat = 540
let TEXT_X: CGFloat = 72
let TEXT_B: CGFloat = B - RAND - KANTE - TEXT_X - 44   // 500

func farbe(_ hex: UInt32, _ a: CGFloat = 1) -> CGColor {
  CGColor(red: CGFloat((hex >> 16) & 255)/255, green: CGFloat((hex >> 8) & 255)/255,
          blue: CGFloat(hex & 255)/255, alpha: a)
}
let MIDNIGHT = farbe(0x04171F), SAND = farbe(0xFFF8E6), GOLD = farbe(0xE0B76F)

func schrift(_ datei: String, _ groesse: CGFloat) -> CTFont {
  let url = URL(fileURLWithPath: "\(S)/ttf/\(datei).ttf") as CFURL
  guard let ds = CTFontManagerCreateFontDescriptorsFromURL(url) as? [CTFontDescriptor],
        let d = ds.first else { fatalError("Schrift fehlt: \(datei)") }
  return CTFontCreateWithFontDescriptor(d, groesse, nil)
}

struct Stueck { let text: String; let font: CTFont; let color: CGColor; let tracking: CGFloat }

let K_FONT  = NSAttributedString.Key(kCTFontAttributeName as String)
let K_COLOR = NSAttributedString.Key(kCTForegroundColorAttributeName as String)
let K_PARA  = NSAttributedString.Key(kCTParagraphStyleAttributeName as String)
let K_KERN  = NSAttributedString.Key(kCTKernAttributeName as String)

func stil(_ zeilenhoehe: CGFloat, _ basis: CGFloat) -> CTParagraphStyle {
  let ph = UnsafeMutablePointer<CGFloat>.allocate(capacity: 1)
  let pa = UnsafeMutablePointer<CTTextAlignment>.allocate(capacity: 1)
  defer { ph.deallocate(); pa.deallocate() }
  ph.pointee = basis * zeilenhoehe
  pa.pointee = .left
  let einst = [
    CTParagraphStyleSetting(spec: .minimumLineHeight, valueSize: MemoryLayout<CGFloat>.size, value: ph),
    CTParagraphStyleSetting(spec: .maximumLineHeight, valueSize: MemoryLayout<CGFloat>.size, value: ph),
    CTParagraphStyleSetting(spec: .alignment, valueSize: MemoryLayout<CTTextAlignment>.size, value: pa),
  ]
  return CTParagraphStyleCreate(einst, einst.count)
}

func absatz(_ stuecke: [Stueck], zeilenhoehe: CGFloat) -> NSAttributedString {
  let s = NSMutableAttributedString()
  let basis = CTFontGetSize(stuecke[0].font)
  let p = stil(zeilenhoehe, basis)
  for st in stuecke {
    var attrs: [NSAttributedString.Key: Any] = [K_FONT: st.font, K_COLOR: st.color, K_PARA: p]
    if st.tracking != 0 { attrs[K_KERN] = st.tracking }
    s.append(NSAttributedString(string: st.text, attributes: attrs))
  }
  return s
}

func hoehe(_ s: NSAttributedString) -> CGFloat {
  let fs = CTFramesetterCreateWithAttributedString(s)
  let sz = CTFramesetterSuggestFrameSizeWithConstraints(
    fs, CFRangeMake(0, 0), nil, CGSize(width: TEXT_B, height: .greatestFiniteMagnitude), nil)
  return ceil(sz.height)
}

func zeichne(_ ctx: CGContext, _ s: NSAttributedString, y_oben: CGFloat, h: CGFloat) {
  let fs = CTFramesetterCreateWithAttributedString(s)
  let pfad = CGPath(rect: CGRect(x: TEXT_X, y: y_oben - h, width: TEXT_B, height: h), transform: nil)
  let frame = CTFramesetterCreateFrame(fs, CFRangeMake(0, 0), pfad, nil)
  CTFrameDraw(frame, ctx)
}

// ── Textbausteine ───────────────────────────────────────────────────────────
let cor  = { (g: CGFloat) in schrift("cormorant-400-normal-latin", g) }
let corI = { (g: CGFloat) in schrift("cormorant-400-italic-latin", g) }
let han  = { (g: CGFloat) in schrift("hanken-300-normal-latin", g) }
let hanM = { (g: CGFloat) in schrift("hanken-500-normal-latin", g) }

let name = "David Liebnau"
let eyebrow = "DAVID LIEBNAU"
let claimA = SPRACHE == "en" ? "Conscious leadership at business-critical turning points."
                             : "Bewusstes Leadership an erfolgskritischen Wendepunkten."
let claimC1 = SPRACHE == "en" ? "Conscious leadership at " : "Bewusstes Leadership an "
let claimC2 = SPRACHE == "en" ? "business-critical turning points." : "erfolgskritischen Wendepunkten."
let h1a = SPRACHE == "en" ? "When what made the company great "
                          : "Wenn das, was das Unternehmen groß gemacht hat, "
let h1b = SPRACHE == "en" ? "is now holding it back." : "es jetzt bremst."

var bloecke: [(NSAttributedString, CGFloat)] = []   // (Text, Abstand darunter)
switch VARIANTE {
case "A":
  bloecke = [
    (absatz([Stueck(text: name, font: cor(64), color: SAND, tracking: 0),
             Stueck(text: ".", font: corI(64), color: GOLD, tracking: 0)], zeilenhoehe: 1.0), 26),
    (absatz([Stueck(text: claimA, font: han(21), color: SAND, tracking: 0)], zeilenhoehe: 1.5), 0)]
case "B":
  bloecke = [
    (absatz([Stueck(text: h1a, font: cor(46), color: SAND, tracking: 0),
             Stueck(text: h1b, font: corI(46), color: GOLD, tracking: 0)], zeilenhoehe: 1.22), 30),
    (absatz([Stueck(text: eyebrow, font: hanM(13), color: GOLD, tracking: 2.4)], zeilenhoehe: 1.0), 0)]
default:
  bloecke = [
    (absatz([Stueck(text: eyebrow, font: hanM(13), color: GOLD, tracking: 2.4)], zeilenhoehe: 1.0), 24),
    (absatz([Stueck(text: claimC1, font: cor(50), color: SAND, tracking: 0),
             Stueck(text: claimC2, font: corI(50), color: GOLD, tracking: 0)], zeilenhoehe: 1.24), 0)]
}

// ── Leinwand ────────────────────────────────────────────────────────────────
let raum = CGColorSpaceCreateDeviceRGB()
guard let ctx = CGContext(data: nil, width: Int(B), height: Int(H), bitsPerComponent: 8,
                          bytesPerRow: 0, space: raum,
                          bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { fatalError("Kontext") }
ctx.setFillColor(MIDNIGHT)
ctx.fill(CGRect(x: 0, y: 0, width: B, height: H))

// Portrait rechts, quadratisch, vollstaendig sichtbar
let qurl = URL(fileURLWithPath: QUELLE) as CFURL
guard let src = CGImageSourceCreateWithURL(qurl, nil),
      let bild = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fatalError("Bild") }
ctx.interpolationQuality = .high
ctx.draw(bild, in: CGRect(x: B - RAND - KANTE, y: RAND, width: KANTE, height: KANTE))

// Textblock optisch mittig zur Bildkante
let hoehen = bloecke.map { hoehe($0.0) }
let gesamt = hoehen.reduce(0, +) + bloecke.dropLast().map { $0.1 }.reduce(0, +)
var y = H/2 + gesamt/2
for (i, b) in bloecke.enumerated() {
  zeichne(ctx, b.0, y_oben: y, h: hoehen[i])
  y -= hoehen[i] + b.1
}

guard let aus = ctx.makeImage() else { fatalError("Rendern") }
let ziel = URL(fileURLWithPath: ZIEL) as CFURL
guard let dst = CGImageDestinationCreateWithURL(ziel, UTType.jpeg.identifier as CFString, 1, nil)
  else { fatalError("Ziel") }
CGImageDestinationAddImage(dst, aus, [kCGImageDestinationLossyCompressionQuality: 0.88] as CFDictionary)
CGImageDestinationFinalize(dst)
print("geschrieben \(ZIEL)")
