#!/usr/bin/env python3
"""Schreibt Preise und Formularlinks aus assets/angebot-werte.json ins HTML.

Die Angebotsseite /mirror-edge/ nennt Nettopreise und verlinkt die MIRROR-Anfrage
(Tally) und das Passungsgespraech (Calendly) an mehreren Stellen. Gepflegt
werden die Werte nur in der JSON-Datei. Im HTML tragen die betroffenen
Elemente ein Attribut:

    <span data-wert="preis-mirror">450&#160;€</span>
    <a data-link="calendly_passung" href="...">
    <a data-link="calendly_passung" data-link-parameter="calendly_team_parameter" href="...">

Das Skript setzt den Inhalt jedes data-wert-Elements und das href jedes
data-link-Elements neu. Traegt ein Link zusaetzlich data-link-parameter, haengt
es den gleichnamigen Eintrag aus "parameter" als Query an (heute nur der
Team-Lab-Link, Vorbelegung der Calendly-Frage). Die Werte stehen damit
fertig im HTML, auch ohne JavaScript und fuer Suchmaschinen.

Aufruf:
    python3 tools/angebotswerte.py            schreibt die Werte ins HTML
    python3 tools/angebotswerte.py --pruefen  aendert nichts, meldet
                                              Abweichungen und Platzhalter

--pruefen endet mit Status 1, wenn eine Datei nicht zur JSON-Datei passt,
ein Schluessel im HTML fehlt oder noch ein Platzhalter verlinkt ist
(Adresse unter platzhalter.invalid oder Parameter mit "platzhalter"). Vor jedem Merge auf main laufen lassen.
"""
import json
import re
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
QUELLE = WURZEL / "assets" / "angebot-werte.json"
AUSGENOMMEN = {"_archiv", "_briefings", ".git", ".claude", "node_modules"}
PLATZHALTER = "platzhalter"

WERT_RE = re.compile(r'(<(\w+)\b[^>]*\bdata-wert="([^"]+)"[^>]*>)(.*?)(</\2>)', re.S)
LINK_TAG_RE = re.compile(r'<a\b[^>]*\bdata-link="([^"]+)"[^>]*>')
HREF_RE = re.compile(r'\bhref="([^"]*)"')
PARAM_RE = re.compile(r'\bdata-link-parameter="([^"]+)"')


def euro(betrag):
    """2900 -> '2.900&#160;€' (deutsche Tausenderpunkte, geschuetztes Leerzeichen)."""
    return f"{betrag:,}".replace(",", ".") + "&#160;€"


def html_dateien():
    for pfad in sorted(WURZEL.rglob("*.html")):
        if not AUSGENOMMEN.intersection(pfad.relative_to(WURZEL).parts):
            yield pfad


def bearbeiten(text, werte, links, parameter, fehler, name):
    def wert_ersetzen(m):
        schluessel = m.group(3)
        if schluessel not in werte:
            fehler.append(f"{name}: data-wert=\"{schluessel}\" fehlt in {QUELLE.name}")
            return m.group(0)
        return m.group(1) + euro(werte[schluessel]) + m.group(5)

    def link_ersetzen(m):
        schluessel = m.group(1)
        if schluessel not in links:
            fehler.append(f"{name}: data-link=\"{schluessel}\" fehlt in {QUELLE.name}")
            return m.group(0)
        ziel = links[schluessel]
        p = PARAM_RE.search(m.group(0))
        if p:
            if p.group(1) not in parameter:
                fehler.append(f"{name}: data-link-parameter=\"{p.group(1)}\" fehlt in {QUELLE.name}")
                return m.group(0)
            if parameter[p.group(1)]:
                ziel += ("&" if "?" in ziel else "?") + parameter[p.group(1)]
        return HREF_RE.sub(f'href="{ziel}"', m.group(0), count=1)

    text = WERT_RE.sub(wert_ersetzen, text)
    return LINK_TAG_RE.sub(link_ersetzen, text)


def main():
    pruefen = "--pruefen" in sys.argv[1:]
    daten = json.loads(QUELLE.read_text(encoding="utf-8"))
    werte, links = daten["werte"], daten["links"]
    parameter = daten.get("parameter", {})

    fehler, geaendert, platzhalter = [], [], []
    for pfad in html_dateien():
        alt = pfad.read_text(encoding="utf-8")
        if "data-wert=" not in alt and "data-link=" not in alt:
            continue
        name = str(pfad.relative_to(WURZEL))
        neu = bearbeiten(alt, werte, links, parameter, fehler, name)
        if neu != alt:
            geaendert.append(name)
            if not pruefen:
                pfad.write_text(neu, encoding="utf-8")
        for m in LINK_TAG_RE.finditer(neu):
            href = HREF_RE.search(m.group(0)).group(1).lower()
            if PLATZHALTER in href:
                p = PARAM_RE.search(m.group(0))
                teile = [f'data-link="{m.group(1)}"'] if PLATZHALTER in href.split("?")[0] else []
                if p and PLATZHALTER in href.partition("?")[2]:
                    teile.append(f'data-link-parameter="{p.group(1)}"')
                for t in teile:
                    platzhalter.append(f"{name}: {t}")

    for f in fehler:
        print("FEHLER   ", f)
    for g in geaendert:
        print("ABWEICHUNG" if pruefen else "GESCHRIEBEN", g)
    for p in sorted(set(platzhalter)):
        print("PLATZHALTER", p)

    if pruefen and (fehler or geaendert or platzhalter):
        sys.exit(1)
    if not (fehler or geaendert or platzhalter):
        print("Alles konsistent, keine Platzhalter.")


if __name__ == "__main__":
    main()
