#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator fuer den Podcast-Bereich "Leise Kraft".

episodes-meta.json ist die einzige Wahrheit pro Episode. Aus einem Eintrag
entstehen vier Zielorte:

  1. episodes/ep-NN-slug.html      die Episodenseite (Kopf, Hero, Footer)
  2. podcast.html <noscript>       die SEO-Ersatzzeile im Episodenindex
  3. podcast.html Featured-Karten  die drei kuratierten Empfehlungen
  4. sitemap.xml                   der Eintrag im Episodenblock

Der redaktionelle Fliesstext lebt weiter in der Episodenseite selbst. Beim
Neuaufbau wird er aus der bestehenden Datei gelesen und unveraendert wieder
eingesetzt; die Vorlage liefert nur die Huelle drumherum.

Die iTunes-Live-Abfrage in podcast.html bleibt unangetastet. Sie versorgt das
automatische Archiv und braucht keine Pflege.

Grundregel: Bei jeder Abweichung von der erwarteten Struktur bricht das Skript
ab. Es schreibt nie eine Datei, die es nicht vollstaendig verstanden hat.

Befehle:
  check     Prueft alles und zeigt an, was sich aendern wuerde. Schreibt nichts.
  rebuild   Baut alle Episodenseiten aus Vorlage + Bestandstext neu.
  sync      Schreibt noscript-Block, Featured-Karten und sitemap.xml neu.
  new       Legt eine neue Episode an (Seite + Eintrag in episodes-meta.json).

Python 3. Keine Abhaengigkeiten ausserhalb der Standardbibliothek.
"""

from __future__ import annotations

import argparse
import difflib
import json
import os
import re
import sys
import unicodedata
from collections import OrderedDict

# ---------------------------------------------------------------------------
# Konstanten
# ---------------------------------------------------------------------------

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

META_FILE     = os.path.join(ROOT, 'episodes-meta.json')
EPISODE_DIR   = os.path.join(ROOT, 'episodes')
PODCAST_FILE  = os.path.join(ROOT, 'podcast.html')
SITEMAP_FILE  = os.path.join(ROOT, 'sitemap.xml')

SITE          = 'https://davidliebnau.com'
SPOTIFY_SHOW  = 'https://open.spotify.com/show/2VJVvcbnTtvoDrmSSdTGZ2'
OG_IMAGE      = SITE + '/assets/og-image.jpg'
SERIES_NAME   = 'Leise Kraft — Der Podcast'

REQUIRED_FIELDS = [
    'subpage', 'title', 'seoTitle', 'description',
    'spotifyUrl', 'tags', 'featured', 'trackIdOverride',
]

FEATURED_COUNT = 3

# Markerpaare in den Zieldateien. Alles zwischen START und END gehoert dem
# Generator, alles ausserhalb der Hand.
MARK_INDEX    = ('<!-- EPISODE-INDEX:START -->', '<!-- EPISODE-INDEX:END -->')
MARK_FEATURED = ('<!-- FEATURED:START -->', '<!-- FEATURED:END -->')
MARK_SITEMAP  = ('<!-- EPISODES:START -->', '<!-- EPISODES:END -->')

# Grenzen im Episodendokument, zwischen denen der redaktionelle Text steht.
BODY_OPEN  = '  <div class="container container--narrow">'
BODY_CLOSE = '    <div class="ep-cta-block">'


class Abbruch(Exception):
    """Struktur weicht ab. Es wird nichts geschrieben."""


def fail(msg):
    raise Abbruch(msg)


# ---------------------------------------------------------------------------
# Hilfsfunktionen
# ---------------------------------------------------------------------------

def esc(s):
    """Fuer HTML-Text und Attribute. Wie die urspruengliche Vorlage: &, <, >
    und " werden immer ersetzt."""
    return (str(s).replace('&', '&amp;').replace('<', '&lt;')
                  .replace('>', '&gt;').replace('"', '&quot;'))


def jesc(s):
    """Fuer Werte in den JSON-LD-Bloecken.

    Die beiden Bloecke stehen in <script>, dort loest kein Parser HTML-Entities
    auf: ein &quot; landet als sechs Zeichen in den strukturierten Daten. Werte
    werden deshalb nach JSON-Regeln maskiert, nicht nach HTML-Regeln.
    """
    return json.dumps(str(s), ensure_ascii=False)[1:-1]


def pad2(n):
    return str(n).zfill(2)


def slugify(text):
    """Erzeugt denselben Slug wie die alte Vorlage: Umlaute ausgeschrieben,
    alles andere auf a-z0-9 reduziert, auf 55 Zeichen gekuerzt."""
    s = text.lower()
    for a, b in (('ä', 'ae'), ('ö', 'oe'), ('ü', 'ue'), ('ß', 'ss')):
        s = s.replace(a, b)
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'^-+|-+$', '', s)
    return s[:55]


def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def write(path, text):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


def canonical_for(subpage):
    return SITE + '/' + subpage


# ---------------------------------------------------------------------------
# episodes-meta.json laden und pruefen
# ---------------------------------------------------------------------------

def load_meta():
    if not os.path.exists(META_FILE):
        fail('episodes-meta.json fehlt: %s' % META_FILE)
    try:
        raw = json.loads(read(META_FILE), object_pairs_hook=OrderedDict)
    except ValueError as e:
        fail('episodes-meta.json ist kein gueltiges JSON: %s' % e)

    if not isinstance(raw, dict) or not raw:
        fail('episodes-meta.json ist leer oder kein Objekt.')

    meta = OrderedDict()
    seen_subpages = {}
    featured = []

    for key in raw:
        if not re.match(r'^\d+$', key):
            fail('Schluessel "%s" ist keine Episodennummer.' % key)
        num = int(key)
        entry = raw[key]
        if not isinstance(entry, dict):
            fail('Eintrag %s ist kein Objekt.' % key)

        missing = [f for f in REQUIRED_FIELDS if f not in entry]
        if missing:
            fail('Eintrag %s: Felder fehlen: %s' % (key, ', '.join(missing)))
        extra = [f for f in entry if f not in REQUIRED_FIELDS]
        if extra:
            fail('Eintrag %s: unbekannte Felder: %s' % (key, ', '.join(extra)))

        for f in ('subpage', 'title', 'seoTitle', 'description'):
            if not isinstance(entry[f], str) or not entry[f].strip():
                fail('Eintrag %s: "%s" muss ein nicht-leerer Text sein.' % (key, f))

        sub = entry['subpage']
        m = re.match(r'^episodes/ep-(\d{2})-([a-z0-9-]+)\.html$', sub)
        if not m:
            fail('Eintrag %s: subpage "%s" passt nicht auf '
                 'episodes/ep-NN-slug.html' % (key, sub))
        if int(m.group(1)) != num:
            fail('Eintrag %s: subpage traegt die Nummer %s.' % (key, m.group(1)))
        if sub in seen_subpages:
            fail('subpage "%s" wird von %s und %s benutzt.'
                 % (sub, seen_subpages[sub], key))
        seen_subpages[sub] = key

        if entry['spotifyUrl'] is not None:
            if not str(entry['spotifyUrl']).startswith('https://open.spotify.com/episode/'):
                fail('Eintrag %s: spotifyUrl ist weder null noch eine '
                     'Spotify-Episoden-URL.' % key)

        if not isinstance(entry['tags'], list) or not entry['tags']:
            fail('Eintrag %s: tags muss eine nicht-leere Liste sein.' % key)
        for t in entry['tags']:
            if not isinstance(t, str) or not t.strip():
                fail('Eintrag %s: leerer Tag.' % key)

        if not isinstance(entry['featured'], bool):
            fail('Eintrag %s: featured muss true oder false sein.' % key)
        if entry['featured']:
            featured.append(num)

        tio = entry['trackIdOverride']
        if tio is not None and not re.match(r'^\d+$', str(tio)):
            fail('Eintrag %s: trackIdOverride muss null oder eine Ziffernfolge '
                 'sein.' % key)

        meta[num] = entry

    nums = sorted(meta)
    if nums != list(range(nums[0], nums[-1] + 1)):
        luecken = [n for n in range(nums[0], nums[-1] + 1) if n not in meta]
        fail('Luecke in der Episodennummerierung: %s'
             % ', '.join(str(n) for n in luecken))

    if len(featured) != FEATURED_COUNT:
        fail('Es muessen genau %d Episoden featured sein, gefunden: %d (%s).'
             % (FEATURED_COUNT, len(featured),
                ', '.join(str(n) for n in sorted(featured)) or 'keine'))

    return meta


def check_track_id_overrides(meta, podcast_html):
    """podcast.html pinnt die Folgen 19-21 ueber ihre Apple-trackId auf eine
    Nummer. Diese Tabelle bleibt die arbeitende Quelle. episodes-meta.json
    haelt dieselbe Zuordnung als Dokumentation. Laufen beide auseinander,
    bricht der Lauf ab."""
    block = re.search(r'var NUMBER_OVERRIDES = \{(.*?)\};', podcast_html, re.S)
    if not block:
        fail('podcast.html: Tabelle NUMBER_OVERRIDES nicht gefunden.')
    im_js = {}
    for tid, num in re.findall(r"'(\d+)'\s*:\s*(\d+)", block.group(1)):
        im_js[tid] = int(num)

    im_json = {}
    for num in meta:
        tio = meta[num]['trackIdOverride']
        if tio is not None:
            im_json[str(tio)] = num

    if im_js != im_json:
        fail('NUMBER_OVERRIDES in podcast.html und trackIdOverride in '
             'episodes-meta.json stimmen nicht ueberein.\n'
             '  podcast.html:       %s\n'
             '  episodes-meta.json: %s'
             % (sorted(im_js.items()), sorted(im_json.items())))
    return im_js


# ---------------------------------------------------------------------------
# Ziel 1: die Episodenseite
# ---------------------------------------------------------------------------

PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>@@SEOTITLE@@</title>
<meta name="description" content="@@DESC@@" />

<!-- SEO-BLOCK -->
<link rel="canonical" href="@@CANONICAL@@" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="David Liebnau" />
<meta property="og:url" content="@@CANONICAL@@" />
<meta property="og:title" content="@@SEOTITLE@@" />
<meta property="og:description" content="@@DESC@@" />
<meta property="og:image" content="@@OGIMAGE@@" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="@@SERIES@@ – David Liebnau" />
<meta property="og:locale" content="de_DE" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="@@SEOTITLE@@" />
<meta name="twitter:description" content="@@DESC@@" />
<meta name="twitter:image" content="@@OGIMAGE@@" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "url": "@@CANONICAL@@",
  "name": "@@TITLE_JSON@@",
  "description": "@@DESC_JSON@@",
  "inLanguage": "de",
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": "@@SERIES@@",
    "url": "@@SITE@@/podcast.html"
  },
  "author": {
    "@type": "Person",
    "name": "David Liebnau",
    "url": "@@SITE@@/"
  },
  "episodeNumber": @@NUM@@
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Start",
      "item": "@@SITE@@/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Podcast",
      "item": "@@SITE@@/podcast.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "@@TITLE_JSON@@",
      "item": "@@CANONICAL@@"
    }
  ]
}
</script>
<!-- /SEO-BLOCK -->
<link rel="stylesheet" href="../assets/fonts.css" />

<link rel="stylesheet" href="../assets/styles.css" />
<script src="../assets/podcast-cover.js"></script>
<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-PE8LepbzU6ohWEdNxpoeQ.js"></script>
<script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
</script>
</head>
<body>

<header class="ep-hero on-dark">
  <nav class="top">
    <a href="../index.html" class="logo">David Liebnau<em>.</em></a>
    <div class="nav-meta">
      <a href="../fuehren/">Führen</a>
      <span class="sep">·</span>
      <a href="../threshold/">Threshold</a>
      <span class="sep">·</span>
      <a href="../podcast.html">Podcast</a>
      <span class="sep">·</span>
      <a href="../index.html#about">Über mich</a>
      <span class="sep">·</span>
      <a href="../index.html#contact">Kontakt</a>
      <span class="sep">·</span>
      <a href="../index.html" style="color: var(--accent);">DE</a>
      <span class="sep">/</span>
      <a href="../index-en.html">EN</a>
    </div>
  </nav>
  <div class="container">
    <div class="ep-hero-grid">
      <div class="ep-hero-text">
        <a href="../podcast.html" class="ep-back">← Alle Episoden</a>
        <span class="eyebrow">Episode @@PADDED@@</span>
        <h1>@@TITLE@@</h1>
        <a href="@@LISTEN@@" class="btn btn--gold" target="_blank" rel="noopener">Jetzt reinhören <span class="arrow">→</span></a>
      </div>
      <div class="ep-hero-cover" aria-hidden="true">
        <podcast-cover></podcast-cover>
      </div>
    </div>
  </div>
</header>

<article class="ep-content">
@@BODYOPEN@@
@@BODY@@

@@BODYCLOSE@@
      <a href="https://light-creators.com" class="btn btn--ghost" target="_blank" rel="noopener">Für Founder Resonance: light-creators.com <span class="arrow">→</span></a>
      <a href="../threshold/" class="btn btn--gold">The Threshold Program: sechs Tage für junge Erwachsene <span class="arrow">→</span></a>
    </div>
  </div>
</article>

<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo">David Liebnau<em>.</em></span>
        <p>Bewusstes Leadership an kritischen Wendepunkten.</p>
        <span class="footer-tagline"><em>Wer klar ist — dem folgt die Welt.</em></span>
      </div>

      <div class="footer-col">
        <h5>Podcast</h5>
        <ul>
          <li><a href="../podcast.html">Alle Episoden</a></li>
          <li><a href="https://open.spotify.com/show/2VJVvcbnTtvoDrmSSdTGZ2" target="_blank" rel="noopener">Spotify</a></li>
          <li><a href="https://podcasts.apple.com/us/podcast/leise-kraft-der-podcast-f%C3%BCr-unternehmer-und-unternehmerinnen/id1841403507" target="_blank" rel="noopener">Apple Podcasts</a></li>
          <li><a href="https://www.youtube.com/@DavidLiebnau" target="_blank" rel="noopener">YouTube</a></li>
          <li><a href="https://music.amazon.de/podcasts/5b2ea7a6-73a4-4ef7-abbd-642c353295bb/" target="_blank" rel="noopener">Amazon Music</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5>Arbeite mit David</h5>
        <ul>
          <li><a href="../fuehren/">Führen</a></li>
          <li><a href="../threshold/">The Threshold Program</a></li>
          <li><a href="../threshold/partner/">Plätze finanzieren</a></li>
          <li><a href="../index.html#contact">Kontakt</a></li>
          <li><a href="mailto:mail@davidliebnau.com">E-Mail</a></li>
          <li><a href="https://light-creators.com" target="_blank" rel="noopener">Für Founder Resonance: light-creators.com</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5>English</h5>
        <ul>
          <li><a href="../index-en.html">For international clients</a></li>
          <li><a href="https://light-creators.com/en" target="_blank" rel="noopener">light-creators.com/en</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2026 David Liebnau</span>
      <div class="footer-legal">
        <a href="../impressum/">Impressum</a>
        <span class="sep">·</span>
        <a href="../datenschutz/">Datenschutz</a>
        <span class="sep">·</span>
        <a href="../agb/">AGB</a>
        <span class="sep">·</span>
        <a href="../widerruf/">Widerruf</a>
        <span class="sep">·</span>
        <a href="../ki-einsatz/">KI-Einsatz</a>
      </div>
    </div>
  </div>
</footer>

<script>
  (function() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.ep-content h3, .ep-content p').forEach(function(el) {
      el.classList.add('fade-in'); obs.observe(el);
    });

    var nav = document.querySelector('nav.top');
    function upNav() { nav.classList.toggle('nav-scrolled', window.scrollY > 60); }
    window.addEventListener('scroll', upNav, { passive: true });
    upNav();
  })();
</script>

</body>
</html>"""


def render_page(num, entry, body):
    canonical = canonical_for(entry['subpage'])
    listen = entry['spotifyUrl'] or SPOTIFY_SHOW
    out = PAGE_TEMPLATE
    for needle, value in (
        ('@@SEOTITLE@@',  esc(entry['seoTitle'])),
        ('@@DESC@@',      esc(entry['description'])),
        ('@@TITLE_JSON@@', jesc(entry['title'])),
        ('@@DESC_JSON@@',  jesc(entry['description'])),
        ('@@TITLE@@',     esc(entry['title'])),
        ('@@CANONICAL@@', canonical),
        ('@@OGIMAGE@@',   OG_IMAGE),
        ('@@SERIES@@',    SERIES_NAME),
        ('@@SITE@@',      SITE),
        ('@@NUM@@',       str(num)),
        ('@@PADDED@@',    pad2(num)),
        ('@@LISTEN@@',    listen),
        ('@@BODYOPEN@@',  BODY_OPEN),
        ('@@BODYCLOSE@@', BODY_CLOSE),
        ('@@BODY@@',      body),
    ):
        out = out.replace(needle, value)
    if '@@' in out:
        fail('Episode %d: unersetzter Platzhalter in der Vorlage.' % num)
    return out


def extract_body(path, num):
    """Holt den redaktionellen Fliesstext aus einer bestehenden Episodenseite."""
    text = read(path)
    if text.count(BODY_OPEN) != 1:
        fail('%s: Textanfang "%s" kommt %d mal vor, erwartet genau einmal.'
             % (path, BODY_OPEN.strip(), text.count(BODY_OPEN)))
    if text.count(BODY_CLOSE) != 1:
        fail('%s: Textende "%s" kommt %d mal vor, erwartet genau einmal.'
             % (path, BODY_CLOSE.strip(), text.count(BODY_CLOSE)))

    after = text.split(BODY_OPEN, 1)[1]
    body = after.split(BODY_CLOSE, 1)[0]
    if not body.startswith('\n'):
        fail('%s: nach dem Textanfang fehlt der Zeilenumbruch.' % path)
    if not body.endswith('\n\n'):
        fail('%s: vor dem CTA-Block fehlt die Leerzeile.' % path)
    body = body[1:-2]

    if not body.strip():
        fail('%s: kein redaktioneller Text gefunden.' % path)
    for line in body.split('\n'):
        if not re.match(r'^    <(h3|p)>.*</\1>$', line):
            fail('%s: Textzeile passt nicht auf <h3> oder <p>:\n  %s'
                 % (path, line[:120]))
    return body


def body_from_content_file(path):
    """Baut den Fliesstext aus einer einfachen Quelldatei.

    Zeilen mit "## " am Anfang werden zu <h3>, alle anderen zu <p>.
    Leerzeilen werden uebersprungen. Die Auszeichnung ist bewusst
    ausdruecklich: die alte Heuristik "kurze Zeile ohne Punkt ist eine
    Ueberschrift" hat Absaetze still zu Ueberschriften gemacht.
    """
    if not os.path.exists(path):
        fail('Quelldatei nicht gefunden: %s' % path)
    out = []
    for raw in read(path).split('\n'):
        line = raw.strip()
        if not line:
            continue
        if line.startswith('## '):
            out.append('    <h3>%s</h3>' % esc(line[3:].strip()))
        elif line.startswith('#'):
            fail('Quelldatei %s: Ueberschriften bitte mit "## " auszeichnen, '
                 'gefunden:\n  %s' % (path, line[:120]))
        else:
            out.append('    <p>%s</p>' % esc(line))
    if not out:
        fail('Quelldatei %s enthaelt keinen Text.' % path)
    return '\n'.join(out)


# ---------------------------------------------------------------------------
# Ziel 2: die noscript-Zeile
# ---------------------------------------------------------------------------

def render_index(meta):
    lines = []
    for num in sorted(meta):
        e = meta[num]
        lines.append('    <li><a href="%s">Episode %d: %s</a></li>'
                     % (canonical_for(e['subpage']), num, esc(e['title'])))
    return '\n'.join(lines)


# ---------------------------------------------------------------------------
# Ziel 3: die Featured-Karten
# ---------------------------------------------------------------------------

def render_featured(meta):
    cards = []
    for num in sorted(n for n in meta if meta[n]['featured']):
        e = meta[num]
        listen = e['spotifyUrl'] or SPOTIFY_SHOW
        cards.append(
            '      <article class="episode">\n'
            '        <a class="episode-card-link" href="%(sub)s" tabindex="-1" aria-hidden="true"></a>\n'
            '        <div class="episode-thumb">\n'
            '          <img src="assets/podcast-cover-spotify-sm.webp" width="240" height="240" loading="lazy" alt="EP %(pad)s" />\n'
            '        </div>\n'
            '        <div class="episode-body">\n'
            '          <span class="eyebrow">Episode %(pad)s</span>\n'
            '          <h3>%(title)s</h3>\n'
            '          <p>%(desc)s</p>\n'
            '          <div class="episode-actions">\n'
            '            <a href="%(listen)s" class="btn btn--sm btn--gold" target="_blank" rel="noopener">Jetzt reinhören <span class="arrow">→</span></a>\n'
            '            <a href="%(sub)s" class="btn btn--sm btn--ghost">Mehr lesen <span class="arrow">→</span></a>\n'
            '          </div>\n'
            '        </div>\n'
            '      </article>'
            % {'sub': e['subpage'], 'pad': pad2(num), 'title': esc(e['title']),
               'desc': esc(e['description']), 'listen': listen})
    return '\n'.join(cards)


# ---------------------------------------------------------------------------
# Ziel 4: der Sitemap-Eintrag
# ---------------------------------------------------------------------------

def render_sitemap(meta):
    out = []
    for num in sorted(meta):
        out.append('  <url>\n    <loc>%s</loc>\n    <priority>0.7</priority>\n  </url>'
                   % canonical_for(meta[num]['subpage']))
    return '\n'.join(out)


# ---------------------------------------------------------------------------
# Markerblock ersetzen
# ---------------------------------------------------------------------------

def replace_block(text, marks, payload, where):
    start, end = marks
    if text.count(start) != 1 or text.count(end) != 1:
        fail('%s: Marker %s / %s muessen genau einmal vorkommen '
             '(gefunden: %d / %d).'
             % (where, start, end, text.count(start), text.count(end)))
    i = text.index(start)
    j = text.index(end)
    if j < i:
        fail('%s: Marker %s steht vor %s.' % (where, end, start))
    # Einrueckung des Endmarkers erhalten, damit die Datei sauber bleibt.
    zeilenanfang = text.rfind('\n', 0, j) + 1
    einzug = text[zeilenanfang:j]
    if einzug.strip():
        fail('%s: vor dem Marker %s steht anderer Inhalt.' % (where, end))
    return (text[:i + len(start)] + '\n' + payload + '\n'
            + einzug + text[j:])


# ---------------------------------------------------------------------------
# Befehle
# ---------------------------------------------------------------------------

def plan(meta):
    """Berechnet alle Zieltexte, ohne zu schreiben."""
    podcast = read(PODCAST_FILE)
    check_track_id_overrides(meta, podcast)

    pages = OrderedDict()
    for num in sorted(meta):
        path = os.path.join(ROOT, meta[num]['subpage'])
        if not os.path.exists(path):
            fail('Episode %d: Datei fehlt: %s\n'
                 '  Neue Episoden mit "new" anlegen.' % (num, meta[num]['subpage']))
        body = extract_body(path, num)
        pages[num] = (path, render_page(num, meta[num], body))

    podcast_new = replace_block(podcast, MARK_INDEX, render_index(meta),
                                'podcast.html')
    podcast_new = replace_block(podcast_new, MARK_FEATURED, render_featured(meta),
                                'podcast.html')
    sitemap_new = replace_block(read(SITEMAP_FILE), MARK_SITEMAP,
                                render_sitemap(meta), 'sitemap.xml')
    return pages, podcast_new, sitemap_new


def show_diff(path, old, new):
    if old == new:
        return 0
    rel = os.path.relpath(path, ROOT)
    d = list(difflib.unified_diff(old.split('\n'), new.split('\n'),
                                  'alt/' + rel, 'neu/' + rel, lineterm='', n=1))
    print('\n'.join(d))
    return sum(1 for l in d if l.startswith(('+', '-'))
               and not l.startswith(('+++', '---')))


def cmd_check(args):
    meta = load_meta()
    pages, podcast_new, sitemap_new = plan(meta)
    total = 0
    changed = []
    for num in pages:
        path, new = pages[num]
        n = show_diff(path, read(path), new) if args.diff else (
            0 if read(path) == new else 1)
        if n:
            changed.append('Episode %d' % num)
            total += n
    for path, new in ((PODCAST_FILE, podcast_new), (SITEMAP_FILE, sitemap_new)):
        n = show_diff(path, read(path), new) if args.diff else (
            0 if read(path) == new else 1)
        if n:
            changed.append(os.path.basename(path))
            total += n

    print('Geprueft: %d Episoden, podcast.html, sitemap.xml.' % len(meta))
    ohne = [n for n in meta if meta[n]['spotifyUrl'] is None]
    if ohne:
        print('Hinweis: %d Episoden ohne spotifyUrl (%s). Diese fallen auf die '
              'Show-URL zurueck.'
              % (len(ohne), ', '.join(str(n) for n in sorted(ohne))))
    if changed:
        print('Wuerde sich aendern: %s' % ', '.join(changed))
    else:
        print('Alles auf Stand. Nichts zu tun.')
    return 0


def cmd_rebuild(args):
    meta = load_meta()
    pages, _, _ = plan(meta)
    n = 0
    for num in pages:
        path, new = pages[num]
        if read(path) != new:
            write(path, new)
            n += 1
            print('neu gebaut: %s' % os.path.relpath(path, ROOT))
    print('%d von %d Episodenseiten geschrieben.' % (n, len(pages)))
    return 0


def cmd_sync(args):
    meta = load_meta()
    _, podcast_new, sitemap_new = plan(meta)
    for path, new in ((PODCAST_FILE, podcast_new), (SITEMAP_FILE, sitemap_new)):
        if read(path) != new:
            write(path, new)
            print('aktualisiert: %s' % os.path.relpath(path, ROOT))
        else:
            print('unveraendert: %s' % os.path.relpath(path, ROOT))
    return 0


def cmd_new(args):
    meta = load_meta()
    num = args.number
    if num in meta:
        fail('Episode %d gibt es schon: %s' % (num, meta[num]['subpage']))

    slug = slugify(args.title)
    subpage = 'episodes/ep-%s-%s.html' % (pad2(num), slug)
    path = os.path.join(ROOT, subpage)
    if os.path.exists(path):
        fail('Datei existiert bereits: %s' % subpage)

    body = body_from_content_file(args.content)
    entry = OrderedDict([
        ('subpage', subpage),
        ('title', args.title),
        ('seoTitle', args.seo_title),
        ('description', args.description),
        ('spotifyUrl', args.spotify),
        ('tags', [t.strip() for t in args.tags.split(',') if t.strip()]),
        ('featured', False),
        ('trackIdOverride', None),
    ])

    raw = json.loads(read(META_FILE), object_pairs_hook=OrderedDict)
    raw[str(num)] = entry
    merged = OrderedDict((k, raw[k]) for k in sorted(raw, key=int))
    write(META_FILE, json.dumps(merged, ensure_ascii=False, indent=2) + '\n')

    meta = load_meta()                      # prueft den neuen Eintrag mit
    write(path, render_page(num, meta[num], body))
    print('angelegt: %s' % subpage)

    _, podcast_new, sitemap_new = plan(meta)
    write(PODCAST_FILE, podcast_new)
    write(SITEMAP_FILE, sitemap_new)
    print('aktualisiert: episodes-meta.json, podcast.html, sitemap.xml')
    return 0


def main():
    p = argparse.ArgumentParser(
        description='Generator fuer den Podcast-Bereich "Leise Kraft".')
    sub = p.add_subparsers(dest='cmd')

    c = sub.add_parser('check', help='pruefen, nichts schreiben')
    c.add_argument('--diff', action='store_true', help='Unterschiede zeigen')
    c.set_defaults(func=cmd_check)

    r = sub.add_parser('rebuild', help='alle Episodenseiten neu bauen')
    r.set_defaults(func=cmd_rebuild)

    s = sub.add_parser('sync', help='noscript, Featured und sitemap.xml neu schreiben')
    s.set_defaults(func=cmd_sync)

    n = sub.add_parser('new', help='neue Episode anlegen')
    n.add_argument('number', type=int)
    n.add_argument('--title', required=True)
    n.add_argument('--seo-title', required=True)
    n.add_argument('--description', required=True)
    n.add_argument('--content', required=True, help='Quelldatei mit dem Text')
    n.add_argument('--tags', required=True, help='kommagetrennt')
    n.add_argument('--spotify', default=None)
    n.set_defaults(func=cmd_new)

    args = p.parse_args()
    if not getattr(args, 'func', None):
        p.print_help()
        return 1
    try:
        return args.func(args)
    except Abbruch as e:
        sys.stderr.write('\nAbbruch: %s\n\nEs wurde nichts geschrieben.\n' % e)
        return 1


if __name__ == '__main__':
    sys.exit(main())
