# Statische Pruefung aller Seiten von davidliebnau.com aus dem Repository.
# Sammelt je Seite: Sprache, Titel, Beschreibung, Teilen-Bild, Canonical, hreflang,
# JSON-LD, interne und externe Links, Sprungmarken, Mail-Links, Formulare, Plausible-Events.
import json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = sys.argv[1]

def url_zu_datei(u):
    """URL-Pfad -> Datei im Repository (oder None)."""
    p = u.split('#')[0].split('?')[0]
    if p.startswith('http'):
        if 'davidliebnau.com' not in p: return None
        p = '/' + p.split('davidliebnau.com', 1)[1].lstrip('/')
    if not p.startswith('/'): return None
    kand = [ROOT + p]
    if p.endswith('/'): kand.append(ROOT + p + 'index.html')
    elif not p.endswith('.html'): kand += [ROOT + p + '/index.html', ROOT + p + '.html']
    for k in kand:
        if os.path.isfile(k): return k
    return None

def seiten():
    s = []
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in ('.git', '_archiv', 'briefing', '_briefings', 'quiz-assets', 'node_modules', 'assets', 'tools')]
        for f in fn:
            if not f.endswith('.html'): continue
            voll = os.path.join(dp, f); rel = os.path.relpath(voll, ROOT)
            url = '/' + rel.replace('index.html', '')
            s.append((rel, url, voll))
    return sorted(s)

def attr(tag, name):
    m = re.search(name + r'\s*=\s*["\']([^"\']*)["\']', tag, re.I)
    return m.group(1) if m else None

res = {}
for rel, url, voll in seiten():
    h = open(voll, encoding='utf-8', errors='replace').read()
    kopf = h[:h.index('</head>') + 7] if '</head>' in h else h
    d = {'url': url, 'datei': rel, 'groesse': len(h)}
    m = re.search(r'<html[^>]*>', h, re.I); d['lang'] = attr(m.group(0), 'lang') if m else None
    m = re.search(r'<title[^>]*>(.*?)</title>', kopf, re.S | re.I); d['titel'] = re.sub(r'\s+', ' ', m.group(1)).strip() if m else None
    metas = re.findall(r'<meta[^>]*>', kopf, re.I)
    def meta(key, val):
        for t in metas:
            if (attr(t, key) or '').lower() == val: return attr(t, 'content')
        return None
    d['beschreibung'] = meta('name', 'description')
    d['og_image'] = meta('property', 'og:image') or meta('name', 'og:image')
    d['og_title'] = meta('property', 'og:title')
    d['og_desc'] = meta('property', 'og:description')
    d['robots'] = meta('name', 'robots')
    links_tags = re.findall(r'<link[^>]*>', kopf, re.I)
    d['canonical'] = next((attr(t, 'href') for t in links_tags if (attr(t, 'rel') or '').lower() == 'canonical'), None)
    d['hreflang'] = [(attr(t, 'hreflang'), attr(t, 'href')) for t in links_tags if attr(t, 'hreflang')]
    d['jsonld'] = []
    for m in re.finditer(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', h, re.S | re.I):
        try:
            j = json.loads(m.group(1))
            d['jsonld'] += [x.get('@type') for x in (j if isinstance(j, list) else [j])]
        except Exception as e:
            d['jsonld'].append('UNGUELTIG: ' + str(e)[:40])
    # Links
    intern, extern, anker, mails = [], [], [], []
    for t in re.findall(r'<a\b[^>]*>', h, re.I):
        href = attr(t, 'href')
        if not href: continue
        if href.startswith('mailto:'): mails.append(href); continue
        if href.startswith(('tel:', 'javascript:', 'data:')): continue
        if href.startswith('#'): anker.append((url, href[1:])); continue
        if href.startswith('http') and 'davidliebnau.com' not in href: extern.append(href); continue
        ziel = href.split('#')[0]
        if '#' in href and href.split('#')[1]:
            zurl = ziel if ziel else url
            anker.append((zurl, href.split('#')[1]))
        if ziel: intern.append(ziel)
    d['intern'] = sorted(set(intern)); d['extern'] = sorted(set(extern))
    d['mails'] = sorted(set(mails)); d['anker'] = sorted(set(anker))
    d['formulare'] = [attr(t, 'action') for t in re.findall(r'<form\b[^>]*>', h, re.I)]
    d['ids'] = sorted(set(re.findall(r'\bid=["\']([^"\']+)["\']', h)))
    d['plausible_script'] = bool(re.search(r'plausible\.io/js/', h))
    d['events'] = sorted(set(re.findall(r'plausible-event-name=([A-Za-z0-9_\-]+)', h)))
    d['bilder_extern'] = sorted(set(re.findall(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', h)))
    res[url] = d

# Linkziele aufloesen
for url, d in res.items():
    tot, ok = [], []
    for l in d['intern']:
        basis = os.path.dirname(url.rstrip('/')) if not url.endswith('/') else url.rstrip('/')
        ziel = l if l.startswith('/') or l.startswith('http') else os.path.normpath(os.path.join(basis or '/', l))
        if not ziel.startswith('http') and not ziel.startswith('/'): ziel = '/' + ziel
        f = url_zu_datei(ziel if ziel.startswith(('http', '/')) else '/' + ziel)
        (ok if f else tot).append(l)
    d['links_tot'] = tot
    # Anker
    fehlende = []
    for zurl, frag in d['anker']:
        if zurl == url: idliste = d['ids']
        else:
            basis = os.path.dirname(url.rstrip('/')) if not url.endswith('/') else url.rstrip('/')
            z = zurl if zurl.startswith('/') else os.path.normpath(os.path.join(basis or '/', zurl))
            f = url_zu_datei(z if z.startswith('/') else '/' + z)
            if not f: fehlende.append((zurl, frag, 'Zielseite fehlt')); continue
            idliste = re.findall(r'\bid=["\']([^"\']+)["\']', open(f, encoding='utf-8', errors='replace').read())
        if frag not in idliste: fehlende.append((zurl, frag, 'kein Abschnitt mit dieser Marke'))
    d['anker_tot'] = fehlende
json.dump(res, open(OUT, 'w'), indent=1, ensure_ascii=False)
print(len(res), 'Seiten geprueft ->', OUT)
