#!/usr/bin/env python3
"""
Erzeugt die PDFs der Rechtstexte aus dem HTML-Quelltext der Website.

    python3 tools/rechtstexte_pdf.py            PDFs neu erzeugen
    python3 tools/rechtstexte_pdf.py --check    nur pruefen, ob die PDFs zur Quelle passen

Quelle ist die HTML-Datei im Repository, also genau das, was live ausgeliefert
wird. Nichts wird von Hand abgetippt: Ein Vertragstext im PDF darf nicht von
der Website abweichen.

Uebernommen wird der Inhalt des Rechtstext-Containers (.rs): Ueberschriften,
Absaetze, Tabellen, das Stand-Datum. Nicht uebernommen werden Navigation,
Footer, das Rubrik-Label ("Rechtliches"), der englische Sprachhinweis und der
Zuruecklink.

Das Skript bricht ab, statt ein falsches PDF zu schreiben, wenn
  - die Seitenstruktur nicht mehr zum erwarteten Aufbau passt,
  - die Quelle einen Entwurfsvermerk ("ENTWURF") traegt,
  - im sichtbaren Text noch ein offener Platzhalter in eckigen Klammern steht.

Benoetigt einen Chromium-Browser (Chrome, Chromium, Edge oder Brave). Ein
anderer Pfad laesst sich ueber die Umgebungsvariable RECHTSTEXTE_BROWSER setzen.
Schriften: Georgia und Helvetica Neue, nicht die Hausschriften - Begruendung
unten bei SERIF/SANS.
"""

import argparse
import html
import os
import re
import shutil
import signal
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOMAIN = "davidliebnau.com"

DOKUMENTE = [
    # (Quelle, Ziel)
    ("agb/index.html", "agb/AGB-David-Liebnau.pdf"),
    ("widerruf/index.html", "widerruf/Widerrufsbelehrung-David-Liebnau.pdf"),
]

BROWSER_KANDIDATEN = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "google-chrome", "chromium", "chromium-browser", "microsoft-edge",
]

CONTAINER_START = '<div class="container container--narrow rs">'
UI_ELEMENTE = [
    r'<span class="eyebrow">.*?</span>',
    r'<p class="lang-note">.*?</p>',
    r'<p class="rs-zurueck">.*?</p>',
]
PLATZHALTER = re.compile(r"\[[A-ZÄÖÜ][A-ZÄÖÜ0-9 :\-]{3,}")


class Abbruch(Exception):
    pass


def browser_finden():
    eigen = os.environ.get("RECHTSTEXTE_BROWSER")
    if eigen:
        return eigen
    for kandidat in BROWSER_KANDIDATEN:
        pfad = kandidat if os.path.isabs(kandidat) else shutil.which(kandidat)
        if pfad and os.path.exists(pfad):
            return pfad
    raise Abbruch("Kein Chromium-Browser gefunden (Chrome, Chromium, Edge, Brave). "
                  "Pfad ueber RECHTSTEXTE_BROWSER angeben.")


def sichtbarer_text(fragment):
    ohne_tags = re.sub(r"<[^>]+>", " ", fragment)
    return re.sub(r"\s+", " ", html.unescape(ohne_tags)).strip()


def inhalt_auslesen(quelle):
    roh = (ROOT / quelle).read_text(encoding="utf-8")

    if re.search(r"<!--.*?ENTWURF.*?-->", roh, re.S):
        raise Abbruch(f"{quelle}: Die Quelle traegt einen Entwurfsvermerk. "
                      "Aus einem Entwurf wird kein PDF erzeugt.")

    start = roh.find(CONTAINER_START)
    if start < 0:
        raise Abbruch(f"{quelle}: Rechtstext-Container {CONTAINER_START} nicht gefunden.")
    start += len(CONTAINER_START)
    ende = re.compile(r"</div>\s*</section>").search(roh, start)
    if not ende:
        raise Abbruch(f"{quelle}: Ende des Rechtstext-Containers nicht gefunden.")
    inhalt = roh[start:ende.start()]

    inhalt = re.sub(r"<!--.*?-->", "", inhalt, flags=re.S)
    for muster in UI_ELEMENTE:
        inhalt, anzahl = re.subn(muster, "", inhalt, flags=re.S)
        if anzahl > 1:
            raise Abbruch(f"{quelle}: {muster} kommt {anzahl}-mal vor, erwartet hoechstens einmal.")

    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", inhalt, re.S)
    if not h1 or "<h2" not in inhalt:
        raise Abbruch(f"{quelle}: Ueberschriften (h1, h2) nicht gefunden.")

    text = sichtbarer_text(inhalt)
    offen = PLATZHALTER.findall(text)
    if offen:
        raise Abbruch(f"{quelle}: Offener Platzhalter im Text: {offen[0]}…")

    # Ein Formularteil (p.rs-form, z. B. das Muster-Widerrufsformular) wird
    # samt seiner Ueberschrift als geschlossener Block gesetzt und beginnt auf
    # einer neuen Seite - sonst reisst das Formular ueber zwei Blaetter. Nur die
    # Auszeichnung wird ergaenzt, kein Wort des Textes.
    erstes_feld = inhalt.find('class="rs-form"')
    if erstes_feld >= 0:
        block_start = inhalt.rfind("<h2", 0, erstes_feld)
        if block_start < 0:
            raise Abbruch(f"{quelle}: Formularteil ohne vorangehende Ueberschrift.")
        inhalt = (inhalt[:block_start] + '<div class="formularblock">'
                  + inhalt[block_start:] + "</div>")

    stand = re.search(r'<p class="rs-stand">(.*?)</p>', inhalt, re.S)
    return {
        "titel": sichtbarer_text(h1.group(1)),
        "stand": sichtbarer_text(stand.group(1)) if stand else None,
        "inhalt": inhalt,
    }


# Schriften: bewusst NICHT die Hausschriften aus assets/fonts.css.
# Gemessen am 11.09.2026 mit PDFKit (die Suche von Preview): In PDFs mit
# Cormorant Garamond sind Woerter mit "f" nicht auffindbar ("Widerrufsrecht"
# 0 Treffer), mit Hanken Grotesk scheitert die Suche ueber Satzpunkte
# ("z. B." 0 Treffer). Das liegt an den Schriftdateien selbst, nicht an
# unicode-range oder Kerning - beides wurde einzeln ausgeschlossen. Mit
# Georgia und Helvetica Neue trifft jede gepruefte Suche genau.
# Durchsuchbarkeit ist Anforderung, Hausschrift nicht.
SERIF = "Georgia, 'Times New Roman', serif"
SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"


def css_string(wert):
    return '"' + (wert or "").replace("\\", "\\\\").replace('"', '\\"') + '"'


def druckfassung(dok):
    rand = f"font-family: {SANS}; font-size: 7.5pt; color: #666;"
    return f"""<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<title>{html.escape(dok['titel'])} · David Liebnau</title>
<style>
@page {{
  size: A4;
  margin: 24mm 20mm 22mm 20mm;
  @top-left     {{ content: {css_string(dok['titel'] + ' · David Liebnau')}; {rand} }}
  @top-right    {{ content: {css_string(dok['stand'])}; {rand} }}
  @bottom-left  {{ content: {css_string(DOMAIN)}; {rand} }}
  @bottom-right {{ content: "Seite " counter(page) " von " counter(pages); {rand} }}
}}
/* Ligaturen aus: Sonst steht "ff" als ein Zeichen (U+FB00) im PDF, und die
   Suche nach "triffst" oder "Unzutreffendes" findet nichts. */
* {{ font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0, "dlig" 0; }}
body {{ margin: 0; color: #111; font-family: {SANS};
        font-weight: 400; font-size: 9.5pt; line-height: 1.5; }}
h1 {{ font-family: {SERIF}; font-weight: 400; font-size: 22pt;
      line-height: 1.15; margin: 0 0 9mm; }}
h2 {{ font-family: {SERIF}; font-weight: 400; font-size: 13pt;
      line-height: 1.25; margin: 7mm 0 2.5mm; break-after: avoid; }}
p {{ margin: 0 0 2.6mm; orphans: 3; widows: 3; }}
a {{ color: inherit; text-decoration: none; }}
.rs-adr {{ line-height: 1.55; }}
.formularblock {{ break-before: page; break-inside: avoid; }}
.formularblock h2 {{ margin-top: 0; }}
.rs-form {{ margin-bottom: 4mm; padding-bottom: 8mm; border-bottom: 0.4pt solid #bbb; }}
.rs-einleitung {{ padding-left: 3mm; border-left: 1.5pt solid #b08a3e; color: #444; }}
.rs-stand {{ margin-top: 8mm; color: #555; font-size: 9pt; }}
.rs-tabelle {{ break-inside: avoid; margin: 3mm 0 4mm; }}
table {{ border-collapse: collapse; width: 100%; max-width: 120mm; font-size: 9.5pt; }}
th {{ text-align: left; font-weight: 500; padding: 1.8mm 4mm 1.8mm 0; border-bottom: 0.6pt solid #999; }}
td {{ padding: 1.8mm 4mm 1.8mm 0; border-bottom: 0.4pt solid #ddd; }}
tr:last-child td {{ border-bottom: none; }}
</style></head>
<body>
{dok['inhalt']}
</body></html>
"""


def normalisieren(pdf_bytes):
    """Zeitstempel auf einen festen Wert gleicher Laenge setzen, damit gleiche
    Quelle gleiche Bytes ergibt. Die Laenge bleibt gleich, die xref-Tabelle
    bleibt gueltig."""
    def fest(treffer):
        return treffer.group(1) + b"0" * len(treffer.group(2)) + treffer.group(3)
    return re.sub(rb"(/(?:CreationDate|ModDate) \(D:)([0-9]+)((?:[+\-Z][^)]*)?\))", fest, pdf_bytes)


def pdf_erzeugen(browser, dok, arbeitsordner, name, zeitlimit=90):
    html_datei = arbeitsordner / f"{name}.html"
    pdf_datei = arbeitsordner / f"{name}.pdf"
    protokoll = arbeitsordner / f"{name}.log"
    html_datei.write_text(druckfassung(dok), encoding="utf-8")
    befehl = [
        browser, "--headless=new", "--disable-gpu", "--no-first-run",
        "--no-default-browser-check", "--disable-extensions",
        f"--user-data-dir={arbeitsordner / ('profil-' + name)}",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_datei}", html_datei.as_uri(),
    ]
    # Chromium schreibt das PDF, beendet sich unter macOS aber nicht immer
    # selbst (gemessen mit Edge 152). Deshalb nicht auf das Prozessende warten,
    # sondern auf die Meldung "bytes written to file" - und den Browser dann
    # samt Hilfsprozessen beenden.
    with open(protokoll, "w") as log:
        prozess = subprocess.Popen(befehl, stdout=log, stderr=subprocess.STDOUT,
                                   start_new_session=True)
    try:
        frist = time.monotonic() + zeitlimit
        while time.monotonic() < frist:
            if "bytes written to file" in protokoll.read_text(errors="replace"):
                break
            if prozess.poll() is not None and not pdf_datei.exists():
                break
            time.sleep(0.25)
        else:
            raise Abbruch(f"Browser hat nach {zeitlimit} s kein PDF gemeldet.\n"
                          f"{protokoll.read_text(errors='replace')[-800:]}")
    finally:
        if prozess.poll() is None:
            try:
                os.killpg(prozess.pid, signal.SIGTERM)
                prozess.wait(timeout=10)
            except (ProcessLookupError, subprocess.TimeoutExpired):
                try:
                    os.killpg(prozess.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
    if not pdf_datei.exists() or pdf_datei.stat().st_size == 0:
        raise Abbruch(f"Browser hat kein PDF geschrieben.\n"
                      f"{protokoll.read_text(errors='replace')[-800:]}")
    return normalisieren(pdf_datei.read_bytes())


def main():
    parser = argparse.ArgumentParser(description="PDFs der Rechtstexte aus dem Quelltext erzeugen.")
    parser.add_argument("--check", action="store_true",
                        help="Nichts schreiben, nur pruefen, ob die PDFs im Repository zur Quelle passen.")
    args = parser.parse_args()

    try:
        browser = browser_finden()
        abweichend = []
        with tempfile.TemporaryDirectory(prefix="rechtstexte-pdf-") as tmp:
            arbeitsordner = Path(tmp)
            for quelle, ziel in DOKUMENTE:
                dok = inhalt_auslesen(quelle)
                if not dok["stand"]:
                    print(f"WARNUNG {quelle}: kein Stand-Datum auf der Seite (<p class=\"rs-stand\">). "
                          "Die Kopfzeile bleibt rechts leer.", file=sys.stderr)
                neu = pdf_erzeugen(browser, dok, arbeitsordner, Path(ziel).stem)
                ziel_pfad = ROOT / ziel
                if args.check:
                    alt = ziel_pfad.read_bytes() if ziel_pfad.exists() else None
                    status = "passt" if alt == neu else "WEICHT AB"
                    if alt != neu:
                        abweichend.append(ziel)
                    print(f"{status:9}  {ziel}")
                else:
                    ziel_pfad.write_bytes(neu)
                    print(f"erzeugt    {ziel}  ({len(neu):,} Bytes, {dok['stand'] or 'ohne Stand-Datum'})")
        if args.check and abweichend:
            print("\nPDFs passen nicht zur Quelle. Neu erzeugen mit: python3 tools/rechtstexte_pdf.py",
                  file=sys.stderr)
            return 1
        return 0
    except Abbruch as fehler:
        print(f"ABBRUCH: {fehler}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
