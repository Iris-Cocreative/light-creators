'use strict';
const fs = require('fs');
const path = require('path');

// ============================================================================
// ACHTUNG: Die Vorlage enthaelt den SEO-Block der 29 erzeugten Dateien NICHT.
// Ein Lauf ueberschreibt canonical, robots, og, twitter und beide JSON-LD-
// Bloecke. Vor dem Lauf Vorlage aktualisieren. Stand: 2026-08-22.
//
// Ausserdem fehlt die Quelldatei: CONTENT_FILE zeigt auf ein Dokument, das
// nicht im Repository liegt. Es muss vor einem Lauf erst beschafft und unter
// dem unten stehenden Pfad abgelegt werden.
//
// Der Lauf ist deshalb gesperrt. Zum Uebergehen:  node generate-episodes.js --force
//
// Sperre nie ausgefuehrt, Node war beim Einbau nicht installiert.
// ============================================================================
if (!process.argv.includes('--force')) {
  console.error([
    'Abbruch: generate-episodes.js ist gesperrt.',
    '',
    'Die Vorlage in dieser Datei enthaelt den SEO-Block nicht, den alle 29',
    'Dateien in episodes/ tragen. Ein Lauf wuerde canonical, robots, og,',
    'twitter und beide JSON-LD-Bloecke in allen 29 Dateien loeschen.',
    '',
    'Vorlage zuerst um den SEO-Block ergaenzen, dann diese Sperre entfernen.',
    'Bewusstes Uebergehen:  node generate-episodes.js --force',
  ].join('\n'));
  process.exit(1);
}

// Quelldatei fehlt im Repository, siehe Kommentar oben.
const CONTENT_FILE = path.join(__dirname, 'episode-content.md');
const OUTPUT_DIR = path.join(__dirname, 'episodes');
const META_FILE = path.join(__dirname, 'episodes-meta.json');
const SPOTIFY_SHOW = 'https://open.spotify.com/show/2VJVvcbnTtvoDrmSSdTGZ2';
// Trailer = EP 1 in archive, so content#N → archive EP N+2
const EP_OFFSET = 2;

function slugify(str) {
  return str.toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,55);
}

function pad2(n) { return String(n).padStart(2,'0'); }

function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Lines that mark the start of the SEO / metadata block
const SEO_STARTERS = [
  'SEO Meta Title','SEO Meta Description',
  'SEO META TITLE','SEO META DESCRIPTION','SEO METADATEN',
  'Meta Title','Meta Description',
  'Slug-Vorschlag','Fokus-Keyword','SEO-HINWEISE',
  'H1:','H2-Struktur','Empfohlene interne','Empfohlene Bilder','Lesezeit:',
  'Die volle Folge zu'
];

function isSeoStart(line) {
  return SEO_STARTERS.some(s =>
    line === s || line.startsWith(s + ' ') || line.startsWith(s + ':') || line.startsWith(s + '(')
  );
}

// ── parser ──────────────────────────────────────────────────────────────────
function parseEpisodes(text) {
  const lines = text.split('\n');
  const map = new Map(); // num → {title, bodyLines, seoTitle, seoDesc}
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    i++;

    // Match episode header: "# N: Title", "# N Title", or "#N Title"
    const m1 = trimmed.match(/^#\s+(\d+):\s*(.+)$/);  // "# 0: Title"
    const m2 = trimmed.match(/^#(\d+)\s+(.+)$/);       // "#28 Title"
    const m3 = trimmed.match(/^#\s+(\d+)\s+(.+)$/);    // "# 26 Title"
    const match = m1 || m2 || m3;
    if (!match) continue;

    const num = parseInt(match[1], 10);
    const title = match[2].trim();

    const bodyLines = [];
    let seoTitle = '';
    let seoDesc  = '';
    let inSeo = false;

    while (i < lines.length) {
      const l = lines[i].trim();

      // Next episode header → stop this episode (all three formats)
      if (l.match(/^#\s+\d+:/) || l.match(/^#\d+\s/) || l.match(/^#\s+\d+\s/)) break;

      i++;
      if (!l) continue;

      if (!inSeo && isSeoStart(l)) inSeo = true;

      if (inSeo) {
        // SEO title: "SEO Meta Title [optional-paren] <title>" or bare label on its own line
        if (/^SEO Meta Title/i.test(l)) {
          const m = l.match(/^SEO Meta Title(?:\s*\([^)]*\))?\s+(.+)$/i);
          if (m) {
            seoTitle = m[1].trim();
          } else {
            // bare "SEO META TITLE" — next non-empty line is the title
            while (i < lines.length && !lines[i].trim()) i++;
            if (i < lines.length) { seoTitle = lines[i].trim(); i++; }
          }
        } else if (l === 'Meta Title') {
          if (i < lines.length) { seoTitle = lines[i].trim(); i++; }
        }

        // SEO description
        if (/^SEO Meta Description/i.test(l)) {
          const m = l.match(/^SEO Meta Description(?:\s*\([^)]*\))?\s+(.+)$/i);
          if (m) {
            seoDesc = m[1].trim();
          } else {
            while (i < lines.length && !lines[i].trim()) i++;
            if (i < lines.length) { seoDesc = lines[i].trim(); i++; }
          }
        } else if (l === 'Meta Description') {
          if (i < lines.length) { seoDesc = lines[i].trim().replace(/^\s+/,''); i++; }
        }
      } else {
        bodyLines.push(l);
      }
    }

    // Overwrite on duplicate number → last occurrence wins (handles draft vs published #28)
    map.set(num, { title, bodyLines, seoTitle, seoDesc });
  }

  return map;
}

// ── content → HTML ──────────────────────────────────────────────────────────
function bodyToHtml(bodyLines) {
  const out = [];
  for (const line of bodyLines) {
    if (line.startsWith('→') || line.startsWith('Oder buch')) continue;
    if (line.startsWith('Die volle Folge zu')) continue;

    // Heading: short line (≤150) that does NOT end with a full stop
    const isHeading = line.length <= 150 && !line.endsWith('.');
    if (isHeading) {
      out.push(`    <h3>${esc(line)}</h3>`);
    } else {
      out.push(`    <p>${esc(line)}</p>`);
    }
  }
  return out.join('\n');
}

// ── HTML template ────────────────────────────────────────────────────────────
function generatePage(num, { title, bodyLines, seoTitle, seoDesc }) {
  const epPadded    = pad2(num);
  const metaTitle   = seoTitle || `${title} | Leise Kraft`;
  const metaDesc    = seoDesc  || '';
  const content     = bodyToHtml(bodyLines);

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(metaTitle)}</title>
<meta name="description" content="${esc(metaDesc)}" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Hanken+Grotesk:ital,wght@0,200;0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">

<link rel="stylesheet" href="../assets/styles.css" />
<script src="../assets/podcast-cover.js"></script>
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
        <span class="eyebrow">Episode ${epPadded}</span>
        <h1>${esc(title)}</h1>
        <a href="${SPOTIFY_SHOW}" class="btn btn--gold" target="_blank" rel="noopener">Jetzt reinhören <span class="arrow">→</span></a>
      </div>
      <div class="ep-hero-cover" aria-hidden="true">
        <podcast-cover></podcast-cover>
      </div>
    </div>
  </div>
</header>

<article class="ep-content">
  <div class="container container--narrow">
${content}

    <div class="ep-cta-block">
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
          <li><a href="../threshold/">The Threshold Program</a></li>
          <li><a href="mailto:info@light-creators.com">E-Mail</a></li>
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
</html>`;
}

// ── main ─────────────────────────────────────────────────────────────────────
const text = fs.readFileSync(CONTENT_FILE, 'utf8');
const map  = parseEpisodes(text);

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const metaEntries = {};
const sorted = [...map.entries()].sort((a, b) => a[0] - b[0]);

for (const [num, data] of sorted) {
  const slug  = slugify(data.title);
  const fname = `ep-${pad2(num)}-${slug}.html`;
  const fpath = path.join(OUTPUT_DIR, fname);

  fs.writeFileSync(fpath, generatePage(num, data), 'utf8');
  console.log(`EP ${pad2(num)}: ${fname}  [${data.bodyLines.length} body lines | seo: ${!!data.seoTitle}]`);

  metaEntries[String(num)] = { subpage: `episodes/${fname}` };
}

fs.writeFileSync(META_FILE, JSON.stringify(metaEntries, null, 2) + '\n', 'utf8');
console.log(`\nWrote ${sorted.length} episode pages + episodes-meta.json`);
