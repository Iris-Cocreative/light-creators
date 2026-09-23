# Gemeinsame Bausteine fuer die Pruefungen: Pfade, DevTools-Aufruf, Messvorlagen.
# Wird von pruefen.py benutzt; einzeln aufrufen muss man es nicht.
import json, os, subprocess, sys

HIER = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HIER))
BIN = os.path.join(HIER, 'bin')
EDGE = "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
PORT = 9333
BASIS = "http://localhost:4173"

# Drei Seiten, die stellvertretend fuer die Domain stehen: eine lange Startseite
# mit Foto-Hero, eine Programmseite mit hellem Hero, eine Episodenseite aus der
# Vorlage. Fuer den vollen Durchgang --alle.
STICHPROBE = ['/', '/fuehren/', '/episodes/ep-10-die-kunst-und-praxis-des-loslassens.html']

# Einblend-Animationen einfrieren. Ohne das misst man den halb eingeblendeten
# Zustand und bekommt falsche Farben.
FREEZE = ("*,*::before,*::after{transition:none!important;animation:none!important}"
          ".fade-in{opacity:1!important;transform:none!important}")
# Text unsichtbar, damit nur der Grund hinter den Zeilen uebrig bleibt.
TEXT_AUS = ("*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;"
            "text-shadow:none!important;text-decoration-color:transparent!important;caret-color:transparent!important}")

# Liefert je Textzeile unter 18px Rechteck, Farbe und Schriftgroesse.
# Verdeckte Zeilen hinter der fixierten Leiste bleiben aussen vor, die sind
# nicht kontrastschwach, sondern zugedeckt.
ZEILEN_JS = r"""(() => {
  const navEl = document.querySelector('nav.top');
  const navUnten = navEl ? navEl.getBoundingClientRect().bottom : 0;
  const parse = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return [0,0,0,1];
    const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0],p[1],p[2], p.length>3?p[3]:1]; };
  const out = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(el); const fs = parseFloat(cs.fontSize);
    if (fs >= 18 || cs.visibility === 'hidden' || cs.display === 'none') continue;
    let op = 1; for (let a = el; a; a = a.parentElement) op *= +getComputedStyle(a).opacity;
    if (op === 0) continue;
    const fg = parse(cs.color); fg[3] *= op;
    const imNav = navEl && navEl.contains(el);
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const q of rg.getClientRects()) {
        const X0 = Math.ceil(q.left), X1 = Math.floor(q.right);
        const Y0 = Math.ceil(Math.max(0, q.top)), Y1 = Math.floor(Math.min(innerHeight, q.bottom));
        if (X1 <= X0 || Y1 <= Y0 || q.bottom <= 0 || q.top >= innerHeight) continue;
        if (!imNav && q.top < navUnten) continue;
        out.push({ x0:X0, y0:Y0, x1:X1, y1:Y1, fg, fs, cls: el.tagName.toLowerCase() + '.' + [...el.classList].join('.'),
                   txt: el.textContent.trim().slice(0,40) });
      }
    }
  }
  return { rects: out };
})()"""


def werkzeug_da():
    fehlt = [w for w in ('cdp', 'ana') if not os.path.isfile(os.path.join(BIN, w))]
    if fehlt:
        sys.exit(f"Bitte zuerst bauen: bash {os.path.relpath(HIER, os.getcwd())}/bauen.sh  (fehlt: {', '.join(fehlt)})")


def browser_da():
    import urllib.request
    try:
        urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=2).read()
        return True
    except Exception:
        return False


def browser_starten(arbeit):
    """Startet einen headless Edge mit DevTools-Anschluss, falls noch keiner laeuft."""
    if browser_da():
        return
    profil = os.path.join(arbeit, 'edge-profil')
    subprocess.Popen([EDGE, '--headless', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
                      f'--remote-debugging-port={PORT}', '--remote-allow-origins=*',
                      f'--user-data-dir={profil}', '--force-device-scale-factor=1', 'about:blank'],
                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    import time
    for _ in range(120):
        if browser_da():
            return
        time.sleep(1)
    sys.exit("Der headless Edge antwortet nicht auf Port %d." % PORT)


def cdp(jobs, arbeit, name):
    """Arbeitet eine Jobliste im Browser ab und liefert die Ergebnisse."""
    werkzeug_da(); browser_starten(arbeit)
    os.makedirs(arbeit, exist_ok=True)
    jd = os.path.join(arbeit, f'jobs_{name}.json'); rd = os.path.join(arbeit, f'res_{name}.json')
    json.dump(jobs, open(jd, 'w'))
    subprocess.run([os.path.join(BIN, 'cdp'), jd, rd], capture_output=True)
    return json.load(open(rd))


def kontrast(paare, arbeit, name):
    """paare: Liste aus (Bildpfad, Rechtecke). Liefert je Rechteck den schwaechsten Wert."""
    ein = os.path.join(arbeit, f'anain_{name}.json'); aus = os.path.join(arbeit, f'anaout_{name}.json')
    json.dump([dict(png=p, rects=r) for p, r in paare if r], open(ein, 'w'))
    subprocess.run([os.path.join(BIN, 'ana'), 'contrast', ein, aus], check=True)
    return json.load(open(aus))


def seiten_liste(alle=False):
    """Alle veroeffentlichten Seiten aus dem Repository, oder die Stichprobe."""
    if not alle:
        return list(STICHPROBE)
    seiten = []
    for dp, dn, fn in os.walk(REPO):
        dn[:] = [d for d in dn if d not in ('.git', '_archiv', 'briefing', '_briefings', 'quiz-assets',
                                            'node_modules', 'assets', 'tools', 'landing-pages')]
        for f in fn:
            if f.endswith('.html'):
                rel = os.path.relpath(os.path.join(dp, f), REPO)
                if rel in ('test.html', 'styles.html', 'lp1.html', 'lp3.html', 'quiz-2.0.html',
                           'quiz-landing.html', 'solo.html', 'project-plan.html', 'chart-prototype.html'):
                    continue
                seiten.append('/' + rel.replace('index.html', ''))
    return sorted(seiten)
