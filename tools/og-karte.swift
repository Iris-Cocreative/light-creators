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
// Varianten: A Name groß, B Headline, C Claim groß, T1 Threshold. Live sind C und T1.
// Siebtes Argument ist der Ausgabefaktor, live wird mit 2 gebaut.
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
// Ausgabefaktor. Das Layout rechnet immer in 1200 x 628; der Faktor vergroessert
// nur die Rasterung, damit die Karte auf Retina-Anzeigen scharf bleibt.
let SKALA: CGFloat = CommandLine.arguments.count > 6
  ? (CGFloat(Double(CommandLine.arguments[6]) ?? 1) ) : 1

let B: CGFloat = 1200, H: CGFloat = 628
let RAND: CGFloat = 44
let TEXT_X: CGFloat = 72

// Das Bild wird nie beschnitten. Es bekommt eine Hoehe, die Breite folgt aus
// dem Seitenverhaeltnis, und es sitzt rechts, senkrecht mittig.
let qurl = URL(fileURLWithPath: QUELLE) as CFURL
guard let src = CGImageSourceCreateWithURL(qurl, nil),
      let bild = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fatalError("Bild") }
let SEITEN = CGFloat(bild.width) / CGFloat(bild.height)
let BILD_H: CGFloat = (VARIANTE.hasPrefix("T") || VARIANTE.hasPrefix("P")) ? 380 : 540
let BILD_B: CGFloat = (BILD_H * SEITEN).rounded()
let BILD_X: CGFloat = B - RAND - BILD_B
let BILD_Y: CGFloat = ((H - BILD_H) / 2).rounded()
let TEXT_B: CGFloat = BILD_X - TEXT_X - 44

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
  if let zeilen = CTFrameGetLines(frame) as? [CTLine] {
    let breiten = zeilen.map { CTLineGetTypographicBounds($0, nil, nil, nil) }
    FileHandle.standardError.write(("  Zeilen: \(zeilen.count), breiteste "
      + String(format: "%.0f", breiten.max() ?? 0) + " von \(Int(TEXT_B))\n").data(using: .utf8)!)
  }
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
case "T1":
  let kopf1 = SPRACHE == "en" ? "Before you choose\n" : "Bevor du wählst,\n"
  let kopf2 = SPRACHE == "en" ? "what comes next." : "was als Nächstes kommt."
  bloecke = [
    (absatz([Stueck(text: "THRESHOLD", font: hanM(15), color: GOLD, tracking: 2.6)], zeilenhoehe: 1.0), 26),
    (absatz([Stueck(text: kopf1, font: cor(54), color: SAND, tracking: 0),
             Stueck(text: kopf2, font: corI(54), color: GOLD, tracking: 0)], zeilenhoehe: 1.22), 0)]
case "P1":
  // Partnerseiten. Wortlaut ist der Seitentitel, nichts hinzuerfunden.
  let p1 = SPRACHE == "en" ? "Fund " : "Plätze "
  let p2 = SPRACHE == "en" ? "a place." : "finanzieren."
  bloecke = [
    (absatz([Stueck(text: "THRESHOLD", font: hanM(15), color: GOLD, tracking: 2.6)], zeilenhoehe: 1.0), 26),
    (absatz([Stueck(text: p1, font: cor(54), color: SAND, tracking: 0),
             Stueck(text: p2, font: corI(54), color: GOLD, tracking: 0)], zeilenhoehe: 1.22), 0)]
case "T2":
  bloecke = []
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
guard let ctx = CGContext(data: nil, width: Int(B * SKALA), height: Int(H * SKALA),
                          bitsPerComponent: 8, bytesPerRow: 0, space: raum,
                          bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { fatalError("Kontext") }
ctx.scaleBy(x: SKALA, y: SKALA)
ctx.setFillColor(MIDNIGHT)
ctx.fill(CGRect(x: 0, y: 0, width: B, height: H))

// Bild rechts, unbeschnitten
ctx.interpolationQuality = .high
ctx.draw(bild, in: CGRect(x: BILD_X, y: BILD_Y, width: BILD_B, height: BILD_H))

// Textblock optisch mittig zur Bildkante
let hoehen = bloecke.map { hoehe($0.0) }
if bloecke.isEmpty { print("ohne Text") }
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
