# Backlog davidliebnau.com

Offene Punkte, die außerhalb des Relaunch-Briefings liegen oder auf eine
Entscheidung, eine Lieferung oder ein externes Set-up warten.

Stand: 2026-09-02

---

## Blockierend für den Relaunch

### E-Mail-Adressen für die drei Call-to-Action-Buttons

Erledigt. Alle Call-to-Action-Buttons laufen auf `mail@davidliebnau.com`.
Die Übergangslösung über `dl@light-creators.com` ist abgelöst, die
Fundstellentabelle von August 2026 damit gegenstandslos. Seit dem
Phase-1-Sprint kommen die vier Nachfragewege auf den Threshold-Seiten
dazu, ebenfalls auf dieselbe Adresse, unterschieden über die Betreffzeile.

### Impressum und Datenschutz

Erledigt. `/impressum/` und `/datenschutz/` tragen den echten Text, stehen
nicht mehr auf `noindex` und sind in der Sitemap. Dasselbe gilt für
`/agb/`, `/widerruf/` und `/ki-einsatz/`.

### LinkedIn-Empfehlungen

Drei Empfehlungen liegen im Wortlaut vor und stehen seit dem
Phase-1-Sprint kontextnah auf `/fuehren/` und `/fuehren/en/`: Pa M.K.
Sinyan bei „Wie ich arbeite", Viktor Szücs bei „Formate", David Kling im
Belege-Abschnitt. Die Testimonial-Wand am Seitenende ist damit aufgelöst.

- [ ] Empfehlung 4 und 5 im Wortlaut liefern. Kriterien und Einbauort
  stehen als markierter Kommentarblock im Belege-Abschnitt beider
  Führen-Seiten. Nichts erfinden.
- [ ] Anschließend `/fuehren/en/` mit derselben Empfehlung ergänzen.

Regel R2 ist seit dem Phase-1-Sprint technisch abgesichert:
`assets/award-context.js` prüft jede Award-Fundstelle im gerenderten Text
und hängt den Rollen-Satz zur SYNK GROUP an, wenn er im Block oder im
unmittelbar vorangehenden Element fehlt. Eingebunden ist der Wächter auf
`/fuehren/` und `/fuehren/en/`.

- [ ] Entscheiden, ob der Wächter auch auf `index.html`, `index-en.html`
  und `podcast.html` läuft. Dort genügt eine Zeile vor `</body>`:
  `<script src="/assets/award-context.js" defer></script>`.
  Für `threshold/index.html` und `threshold/en/index.html` käme zusätzlich
  die Regel `.award-context` in deren Inline-CSS dazu, weil diese Seiten
  `assets/styles.css` nicht laden.

---

## Englische Fassungen

### Sieben Verweise umstellen, sobald /fuehren/en/ und /threshold/partner/en/ stehen

- [x] Erledigt. `/fuehren/en/` und `/threshold/partner/en/` stehen, alle
  sieben Verweise in `index-en.html` zeigen auf die englischen Fassungen:
  vier auf `/fuehren/en/` (Navigation, Drei Wege, Organisationen, Footer)
  und drei auf `/threshold/partner/en/` (Drei Wege, Threshold-Teaser,
  Footer). Threshold selbst zeigte schon auf `/threshold/en/`.
  `podcast.html` bleibt deutsch, der Text sagt das mit „In German".

### Englischer Partnerblock stand doppelt

Erledigt am 02.09.2026. `threshold/en/index.html` trug in `#partners`
weiterhin den vollständigen Block mit Research-Strip, Insight-Kasten und
allen vier Partner-Karten, obwohl `/threshold/partner/en/` als eigene
Seite existiert. Rund 40 Zeilen standen damit identisch auf zwei
indexierbaren URLs.

Der Block ist jetzt auf denselben kurzen Teaser zurückgebaut wie in der
deutschen Fassung: Label, Überschrift, zwei Sätze und der Link auf
`/threshold/partner/en/`. Interne Sprungmarken auf `#partners` gab es
keine, es musste nichts mit umziehen.

### ProvenExpert-Siegel auf Englisch

- [ ] Das Bewertungssiegel lädt in `index-en.html` mit `l=de-de`, wie in
  der deutschen Fassung. Prüfen, ob ProvenExpert einen englischen Locale
  unterstützt. Bewusst nicht auf Verdacht geändert, ein falscher Wert
  könnte das Widget brechen.

---

## Assets

### og:image für Threshold und die Partnerseite

`threshold/og-image.jpg` ist **1920 × 1440**, also 4:3. Open Graph erwartet
1,91:1. Facebook und LinkedIn beschneiden das Bild oben und unten.

Erledigt für die vier Money Pages, am 02.09.2026. `/fuehren/` und
`/fuehren/en/` tragen `assets/og-image-fuehren.jpg`, ein 1200 × 628 großer
Zuschnitt aus `assets/hero-fuehren-split.webp`. `/threshold/partner/` und
`/threshold/partner/en/` tragen `assets/og-image-threshold-partner.jpg`,
denselben Zuschnitt aus `assets/threshold-teaser.jpg`, dem Bild, das auf
der Startseite schon den Threshold-Teaser trägt. Beide Seitenpaare
zusätzlich mit `og:image:width`, `og:image:height` und `twitter:image`.

Die Regel **kein automatisches Beschneiden** galt und gilt für
`threshold/og-image.jpg`. Diese Datei ist unangetastet, die
Threshold-Hauptseiten laufen weiter darauf und werden in der Vorschau oben
und unten beschnitten. Ein passend zugeschnittenes Bild dafür liefert
David nach.

- [ ] Entscheiden, ob `assets/og-image-threshold-partner.jpg` bleibt. Das
  Motiv ist eine Gruppensilhouette im Sonnenuntergang, thematisch
  passend, aber generisch. Ein Bild aus Finnland wäre stärker. Umstellen
  kostet eine Zeile pro Seite.

Anmerkung zur Quelle: Das Briefing nannte `hero-fuehren-split.webp` mit
1200 × 1500. Die Datei ist tatsächlich 1400 × 1400. Die Maße 1200 × 1500
stehen als `width` und `height` am `<img>` in `fuehren/index.html` und
`fuehren/en/index.html` und stimmen damit nicht mit der Datei überein.

- [ ] `width` und `height` des Hero-Bildes auf `/fuehren/` auf 1400 × 1400
  korrigieren. Das falsche Seitenverhältnis reserviert beim Laden den
  falschen Platz und erzeugt einen Layoutsprung.

### HR Excellence Award Logo: Nutzungsrechte klären

- [ ] HR Excellence Award Logo: Nutzungsrechte klären.
  Ausgezeichnet wurde ein Programm der SYNK GROUP. Ohne schriftliche
  Freigabe der SYNK GROUP wird das Logo nicht auf der Website geführt.
  Der textliche Bezug auf den Award bleibt bestehen, er ist davon nicht
  betroffen.

Die beiden Dateien waren `assets/HREA_Logo_Gewinner_2017_web.png`
(600 × 1183, transparent, sRGB) und die ältere
`assets/hr-excellence-award-2017.png`. Beide wurden beim Aufräumen am
01.09.2026 aus dem Arbeitsbaum entfernt, weil sie von keiner Seite
eingebunden waren. **Sie sind nicht verloren.** Kommt die Freigabe der
SYNK GROUP, holt man sie zurück mit:

```
git checkout 6672aca -- assets/HREA_Logo_Gewinner_2017_web.png
```

### Ungenutzte Bilder

`assets/role-entrepreneur.webp`, `assets/role-manager.webp` und
`assets/role-expert.webp` werden seit dem Relaunch nicht mehr
eingebunden. Sie bleiben bewusst liegen, mögliche Wiederverwendung auf
light-creators.com.

Am 01.09.2026 wurden 20 sonst nirgends referenzierte Dateien entfernt,
zusammen rund 22 MB: sieben große Portraits und Hintergründe aus der
Zeit vor dem Relaunch, die beiden Award-Logos, das nicht mehr genutzte
ProvenExpert-Siegelbild, vier lose Dateien im Wurzelverzeichnis und
sechs Icon-Dateien aus `quiz-assets` und `solo-assets`. Alle über
`git checkout 6672aca -- <pfad>` wiederherstellbar. Bewusst behalten:
die Bilddateien in `briefing/` als Beleg zu den Briefings und die sechs
SVGs, an denen noch die Archivseiten hängen.

### Tote Verweise im Archiv

`_archiv/founder-resonance-bloecke.html` und `_archiv/index-en-alt.html`
haben 31 tote Bildverweise, weil ihre relativen Pfade beim Verschieben
nach `_archiv/` nicht mitgezogen wurden. Bestand schon vor dem
Aufräumen. Ohne Folgen, weil `robots.txt` das Archiv sperrt und es nicht
verlinkt ist. Wenn es stört: Pfade auf `/assets/...` umstellen.

---

## Messung

### Plausible-Goals nachziehen

Klick-Events laufen über CSS-Klassen (`plausible-event-name=…`), Scrolltiefe
über `window.plausible()`. Das Script `pa-PE8LepbzU6ohWEdNxpoeQ.js` wertet
die Klassen aus, geprüft am 02.09.2026 am ausgelieferten Script.

**Ein Event im Code erscheint erst im Dashboard, wenn dort ein Goal mit
demselben Namen angelegt ist.** Neu aus dem Phase-1-Sprint, neun Stück:

```
threshold_path_application_click
threshold_path_waitlist_click
threshold_path_later_click
threshold_path_institution_click
partner_path_partnership_click
partner_path_waitlist_click
partner_path_later_click
partner_path_institution_click
fuehren_cta3_click
```

- [ ] Diese neun Goals im Plausible-Dashboard anlegen.

Bereits vorhanden und unverändert: `cta_briefing_click`,
`nav_threshold_click`, `outbound_light_creators_click`,
`fuehren_cta1_click`, `fuehren_cta2_click`, `threshold_cta_click`,
`threshold_partner_link_click`, `partner_request_click`,
`threshold_price_scroll`, `threshold_faq_seen`.

Namenskonvention: `<bereich>_<sache>_<verb>`, Klick-Events enden auf
`_click`. Die vier Wege tragen zusätzlich das Segment `path`, damit sie im
Dashboard zusammen stehen. Deutsche und englische Fassung teilen sich einen
Namen; getrennt wird nach Teilnehmer- und Partnerseite, nicht nach Sprache.

---

## Technische Schulden

### generate-episodes.js ist abgelöst

Erledigt. `generate-episodes.js` ist entfernt, an seine Stelle tritt
`tools/generate_episode.py`. Node ist auf der Zielmaschine nicht
installiert, das Skript läuft mit der Python-Standardbibliothek.

Die Vorlage trägt den vollständigen SEO-Block (canonical, robots, og,
twitter, beide JSON-LD-Blöcke) und den Footer mit allen sechs Links unter
„Arbeite mit David". Die alte Sperre ist damit gegenstandslos.

Der redaktionelle Text bleibt in der Episodenseite. `rebuild` liest ihn
heraus, setzt die Hülle neu und schreibt ihn unverändert zurück; weicht eine
Datei von der erwarteten Struktur ab, bricht der Lauf ab, bevor etwas
geschrieben wird.

### Neue Episode einpflegen

`episodes-meta.json` ist die einzige Wahrheit pro Episode. Aus einem Eintrag
entstehen vier Zielorte: die Episodenseite, die `<noscript>`-Zeile in
`podcast.html`, die Featured-Karten und der Eintrag in `sitemap.xml`.

1. Text der Folge als Datei in `content/` ablegen. Überschriften mit `## `
   auszeichnen, alles andere wird ein Absatz.
2. Einen Befehl ausführen:

```
python3 tools/generate_episode.py new 30 \
  --title "..." --seo-title "..." --description "..." \
  --content content/ep-30.txt --tags "Fuehrung,Team" \
  --spotify "https://open.spotify.com/episode/..."
```

Das schreibt die Seite und aktualisiert `episodes-meta.json`, `podcast.html`
und `sitemap.xml` in einem Zug.

Weitere Befehle: `check --diff` zeigt, was sich ändern würde, ohne zu
schreiben. `rebuild` baut alle Episodenseiten aus der Vorlage neu. `sync`
schreibt nur die abgeleiteten Stellen neu.

Die iTunes-Abfrage in `podcast.html` bleibt davon unberührt. Sie füllt das
Archiv live aus dem Apple-Feed und braucht keine Pflege. Die Tabelle
`NUMBER_OVERRIDES` für die Folgen 19 bis 21 bleibt die arbeitende Quelle;
`trackIdOverride` in `episodes-meta.json` hält dieselbe Zuordnung, und das
Skript bricht ab, wenn beide auseinanderlaufen.

Offen: Für die Folgen 0 bis 23 fehlt die `spotifyUrl`. Ohne Wert verlinkt
„Jetzt reinhören" auf die Show statt auf die Folge. Die öffentliche
Spotify-Seite gibt ohne Login nur die sechs neuesten Folgen preis; die
übrigen Adressen müssen aus dem Spotify-Konto nachgetragen werden.

### Farb-Tokens laufen auseinander

`assets/styles.css` trägt die richtigen Hex-Werte des Corporate Design, aber
eigene Namen (`--color-deep-blue` statt Midnight Blue, `--color-sage` statt
Aurora Tide). Die Token-Sammlung in
`landing-pages/flourishing-life-eltern-v2.html:30-42` folgt den
Palettennamen deutlich näher und wäre die bessere Vorlage für eine spätere
Vereinheitlichung. Bewusst nicht angefasst.

Der Gold Gradient (`#FFDB9D` nach `#A87D34`) ist in `assets/styles.css`
nicht als Variable definiert, nur inline im SVG `03-erkennen.svg`.

### Zwei Design-Systeme

`assets/styles.css` trägt Startseite, Führen, Podcast, Episoden und die
Rechtsseiten. Die Threshold-Seiten und die Partnerseite haben eigenes
Inline-CSS ohne Navigation. Bewusste Entscheidung, hier nur notiert.

---

## Umzug nach light-creators.com

`_archiv/founder-resonance-bloecke.html` sichert die von davidliebnau.com
entfernten Founder-Blöcke mit Herkunftskommentar und Datum. Vorlage für den
Umzug nach Webflow. Die Datei trägt `noindex`, `robots.txt` sperrt
`/_archiv/`.

Offen: Die Founder-Episoden 15 und 20 bis 28 sind thematisch reine
Founder-Folgen, inklusive Titel und URL-Slug. Ihr redaktioneller Inhalt
bleibt vorerst unverändert auf davidliebnau.com. Ob sie dort bleiben, ist
noch nicht entschieden.

---

## Für V2 vorgemerkt

### Methodenblock auf Mobil aufklappbar

Die vier Zweckzeilen haben den Abschnitt `#methode` auf Desktop um
175 Pixel verlängert, auf 390 Breite aber um **279 Pixel**, weil dort
jede der vier Zeilen zweizeilig umbricht. Der Block ist damit auf dem
Handy sehr lang.

Zu prüfen: ob die vier Bewegungen auf Mobil aufklappbar werden, sodass
Titel und Zweckzeile sichtbar bleiben und die beiden Beispielzeilen
erst auf Tippen erscheinen. Bewusst nicht im Relaunch geändert.

### Threshold-Teaser auf Mobil kürzen

Der Abschnitt `.threshold-teaser` auf der Startseite ist bei 390 Pixeln
Breite **1745 Pixel** hoch, also 2,07 Bildschirmhöhen bei 844 Pixeln
Viewport. In der englischen Fassung 1678 Pixel.

Er war schon vor dem Zusammenhangs-Satz zwei Bildschirmhöhen lang, der
Satz kostet 56 Pixel und ist nicht die Ursache. Die Länge kommt aus
Überschrift, Fließtext, zwei Buttons und Bild untereinander.

Zu prüfen für V2: ob auf Mobil das Bild entfällt oder der Fließtext
gekürzt wird. Bewusst nicht im Relaunch geändert.

---

## Kleinkram

- `solo.html` nennt die Telefonnummer `+49 170 43 26 737`. Einzige
  Telefonnummer im Repository, Datei ist von der Website nicht verlinkt.
- Die Threshold-Seiten haben keine Hauptnavigation. Der einzige Rückweg auf
  davidliebnau.com steht im Footer.
- `README.md` enthält nur die Zeile `# light-creators`. Der Repository-Name
  passt nicht zum Inhalt, hier liegt davidliebnau.com.
