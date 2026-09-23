#!/usr/bin/env python3
"""Pruefungen gegen den lokalen Vorschauserver (http://localhost:4173).

    python3 tools/pruefwerkzeug/pruefen.py ueberlauf
    python3 tools/pruefwerkzeug/pruefen.py kontrast --alle
    python3 tools/pruefwerkzeug/pruefen.py nav
    python3 tools/pruefwerkzeug/pruefen.py statisch

Ohne --alle laufen die Pruefungen auf drei stellvertretenden Seiten.
Eigene Auswahl: --seiten / /fuehren/ /podcast.html
"""
import argparse, collections, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import werkzeug as w

BREITEN = {'ueberlauf': (320, 360, 390, 1440), 'kontrast': ((1440, 900), (390, 844), (320, 800))}


def ueberlauf(seiten, arbeit):
    JS = """(() => { const W = innerWidth, bad = [];
      document.querySelectorAll('body *').forEach(e => { const r = e.getBoundingClientRect();
        if (r.width > 0 && (r.right > W + 0.5 || e.scrollWidth > e.clientWidth + 0.5 && e.clientWidth > 0))
          bad.push({ t: e.tagName.toLowerCase() + '.' + [...e.classList].join('.'), b: Math.round(r.width),
                     r: Math.round(r.right), sw: e.scrollWidth, cw: e.clientWidth }); });
      return { sw: document.documentElement.scrollWidth, iw: W, sh: document.documentElement.scrollHeight,
               bad: bad.slice(0, 5) }; })()"""
    jobs = [dict(url=f"{w.BASIS}{p}?pruef=1", w=b, h=800, y=0, js=JS) for p in seiten for b in BREITEN['ueberlauf']]
    res = w.cdp(jobs, arbeit, 'ueberlauf')
    hoehen, treffer = {}, 0
    for j, r in zip(jobs, res):
        p = j['url'].split('4173')[1].split('?')[0]; x = r['js']
        hoehen.setdefault(p, {})[j['w']] = x['sh']
        if x['sw'] > x['iw']:
            treffer += 1
            print(f"UEBERLAUF {p} @{j['w']}: scrollWidth {x['sw']} statt {x['iw']}")
            for b in x['bad']:
                print(f"    {b['t'][:56]}  breit {b['b']}  endet {b['r']}  innen {b['sw']}/{b['cw']}")
    json.dump(hoehen, open(os.path.join(arbeit, 'hoehen.json'), 'w'))
    print(f"{len(jobs)} Messungen, {treffer} mit Ueberlauf")
    return treffer == 0


def kontrast(seiten, arbeit, grenze=4.5):
    hoehenpfad = os.path.join(arbeit, 'hoehen.json')
    if not os.path.isfile(hoehenpfad):
        ueberlauf(seiten, arbeit)
    hoehen = json.load(open(hoehenpfad))
    bilder, messen = [], []
    for p in seiten:
        name = (p.strip('/').replace('/', '_').replace('.html', '') or 'start')[:28]
        for breite, hoehe in BREITEN['kontrast']:
            gesamt = hoehen.get(p, {}).get(str(breite)) or hoehen.get(p, {}).get(breite)
            if not gesamt:
                continue
            for k, y in enumerate(range(0, gesamt, hoehe)):
                messen.append(dict(url=f"{w.BASIS}{p}?pruef=1", w=breite, h=hoehe, y=y, css=w.FREEZE, js=w.ZEILEN_JS))
                bilder.append(os.path.join(arbeit, 'bilder', f"{name}_{breite}_{k:02d}.png"))
    os.makedirs(os.path.join(arbeit, 'bilder'), exist_ok=True)
    res = w.cdp(messen, arbeit, 'kontrast')
    aufnahmen = [dict(url=j['url'], w=j['w'], h=j['h'], y=j['y'], css=w.FREEZE + w.TEXT_AUS, out=b)
                 for j, b in zip(messen, bilder)]
    w.cdp(aufnahmen, arbeit, 'kontrast_bilder')
    out = w.kontrast([(b, r['js']['rects']) for r, b in zip(res, bilder) if r.get('js')], arbeit, 'kontrast')
    pro = collections.defaultdict(list)
    for o in out:
        pro[re.sub(r'_(\d+)_\d+\.png$', r' @\1', os.path.basename(o['png']))].append(o)
    schwach = []
    print(f"{'Seite @Breite':34} {'Zeilen':>7} {'min':>6}  schwaechste Stelle")
    for k in sorted(pro):
        l = sorted(pro[k], key=lambda o: o['ratio']); m = l[0]
        unter = [o for o in l if o['ratio'] < grenze]; schwach += unter
        print(f"{k:34} {len(l):>7} {m['ratio']:>6.2f}  {m['cls'][:26]:28} '{m['txt'][:22]}'"
              + (f"  <- {len(unter)} unter {grenze}" if unter else ""))
    json.dump(schwach, open(os.path.join(arbeit, 'kontrast_schwach.json'), 'w'))
    print(f"\nStellen unter {grenze}:1: {len(schwach)}")
    for (cls, r), n in collections.Counter((o['cls'][:44], round(o['ratio'], 2)) for o in schwach).most_common(12):
        print(f"  {r:>5}  {cls:46} {n}x")
    return not schwach


def nav(seiten, arbeit, grenze=4.5):
    """Nur die Schrift in der Leiste selbst, oben und im gescrollten Zustand."""
    JS = w.ZEILEN_JS.replace("document.body.querySelectorAll('*')", "document.querySelectorAll('nav.top *')")
    jobs, bilder = [], []
    os.makedirs(os.path.join(arbeit, 'nav'), exist_ok=True)
    for p in seiten:
        name = (p.strip('/').replace('/', '_').replace('.html', '') or 'start')[:24]
        for breite in (1440, 390, 320):
            for zustand, y in (('oben', 0), ('gescrollt', 1500)):
                jobs.append(dict(url=f"{w.BASIS}{p}?pruef=1", w=breite, h=800, y=y, css=w.FREEZE, js=JS))
                bilder.append(os.path.join(arbeit, 'nav', f"{name}_{breite}_{zustand}.png"))
    res = w.cdp(jobs, arbeit, 'nav')
    auf = [dict(url=j['url'], w=j['w'], h=j['h'], y=j['y'],
                css=w.FREEZE + "nav.top *{color:transparent!important;-webkit-text-fill-color:transparent!important}",
                out=b) for j, b in zip(jobs, bilder)]
    w.cdp(auf, arbeit, 'nav_bilder')
    out = w.kontrast([(b, r['js']['rects']) for r, b in zip(res, bilder) if r.get('js')], arbeit, 'nav')
    pro = collections.defaultdict(list)
    for o in out:
        pro[os.path.basename(o['png'])[:-4]].append(o)
    schlecht = 0
    for k in sorted(pro):
        l = sorted(pro[k], key=lambda o: o['ratio']); m = l[0]
        unter = sum(1 for o in l if o['ratio'] < grenze); schlecht += bool(unter)
        print(f"{k:44} {m['ratio']:>6.2f}  {m['cls'][:20]:22} '{m['txt'][:14]}'" + (f"  <- {unter} unter {grenze}" if unter else ""))
    print(f"\n{schlecht} von {len(pro)} Zustaenden mit Werten unter {grenze}:1")
    return schlecht == 0


def statisch(seiten, arbeit):
    """Links, Sprungmarken, Sprache, Canonical, Teilen-Bild, JSON-LD, Mail-Ziele, Events."""
    import subprocess
    subprocess.run([sys.executable, os.path.join(w.HIER, 'audit.py'), os.path.join(arbeit, 'statisch.json')], check=True)
    d = json.load(open(os.path.join(arbeit, 'statisch.json')))
    for u in seiten:
        x = d.get(u)
        if not x:
            continue
        print(f"\n{u}")
        print(f"   lang={x['lang']}  canonical={'ja' if x['canonical'] else 'FEHLT'}  hreflang={len(x['hreflang'])}"
              f"  og:image={'ja' if x['og_image'] else 'FEHLT'}  Beschreibung={'ja' if x['beschreibung'] else 'FEHLT'}")
        print(f"   JSON-LD: {', '.join(x['jsonld']) or 'keine'}")
        if x['links_tot']: print(f"   TOTE LINKS: {x['links_tot']}")
        if x['anker_tot']: print(f"   TOTE SPRUNGMARKEN: {x['anker_tot']}")
        print(f"   Mail: {sorted({m.split('?')[0] for m in x['mails']})}  Events: {len(x['events'])}")
    return True


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('pruefung', choices=['ueberlauf', 'kontrast', 'nav', 'statisch'])
    ap.add_argument('--alle', action='store_true', help='alle veroeffentlichten Seiten statt der Stichprobe')
    ap.add_argument('--seiten', nargs='+', help='eigene Auswahl, z. B. / /fuehren/')
    ap.add_argument('--arbeit', default='/tmp/pruefwerkzeug', help='Ablage fuer Aufnahmen und Zwischenstaende')
    a = ap.parse_args()
    seiten = a.seiten or w.seiten_liste(a.alle)
    os.makedirs(a.arbeit, exist_ok=True)
    print(f"{len(seiten)} Seiten, Ablage {a.arbeit}\n")
    ok = {'ueberlauf': ueberlauf, 'kontrast': kontrast, 'nav': nav, 'statisch': statisch}[a.pruefung](seiten, a.arbeit)
    sys.exit(0 if ok else 1)
