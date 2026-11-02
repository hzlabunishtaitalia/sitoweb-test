/* ============================================================
   ANNUNCIO IN EVIDENZA — Humanitarno Zdruzenie Labunishta Italia
   ============================================================
   Questo file fa comparire un avviso (pop-up) quando qualcuno
   apre il sito. Si chiude con la X, con il tasto Esc o cliccando
   fuori dal riquadro, e non ricompare finché la persona non
   chiude e riapre il browser.

   PER MODIFICARE L'AVVISO: cambia solo i valori qui sotto,
   tra le virgolette. Non toccare il resto del file.

   PER SPEGNERE L'AVVISO A EVENTO FINITO:
   metti  attivo: false   nella prima riga della lista.
   ============================================================ */

const ANNUNCIO = {

  attivo: false,                    // true = si vede, false = spento

   soloHome: true,                //true = solo nella home  false = su tutte le pagine del sito
                                            

  /* --- COME SI PRESENTA L'AVVISO ---
     "locandina" = si apre direttamente la locandina a tutto schermo
                   (l'immagine qui sotto, con la X per chiudere)
     "testo"     = si apre il riquadro con titolo, data, luogo e bottoni */
  modo: "locandina",

  /* --- LA LOCANDINA (usata quando modo = "locandina") ---
     Metti l'immagine della locandina nella cartella  documenti/
     e scrivi qui il percorso. Deve essere un'immagine (.jpg o .png),
     non un .pdf: sui telefoni i PDF non si vedono dentro la pagina.
     Se hai solo il PDF, chiedimi di convertirtelo in immagine.
     Nella riga pdf: qui sotto puoi mettere il PDF da scaricare:
     comparirà un piccolo bottone sotto la locandina.            */
  locandina:       "documenti/locandina-cena.jpg",
  locandinaTesto:  "Locandina della cena benefica",
  locandinaTestoMk:"Леток за хуманитарната вечера",

  /* --- TESTI IN ITALIANO --- */
  occhiello:  "Evento di beneficenza",
  titolo:     "Cena benefica",
  data:       "sabato 00 mese 2026, ore 00:00",
  luogo:      "Nome della sala, Via Esempio 1, Città",
  testo:      "Una serata insieme per raccogliere fondi a sostegno delle famiglie in difficoltà. Posti limitati: prenota il tuo.",
  bottone:    "Info e prenotazioni",

  /* --- TESTI IN MACEDONE (pagine -mk) --- */
  occhielloMk: "Хуманитарен настан",
  titoloMk:    "Хуманитарна вечера",
  dataMk:      "сабота 00 месец 2026, во 00:00",
  luogoMk:     "Име на салата, Ул. Пример 1, Град",
  testoMk:     "Вечер заедно за собирање средства за семејствата во потреба. Местата се ограничени: резервирајте го вашето.",
  bottoneMk:   "Инфо и резервации",

  /* --- DOVE PORTA IL BOTTONE ---
     Lascia così per aprire WhatsApp, oppure scrivi "contatti.html"
     per mandare le persone alla pagina Contatti.              */
  link: "contatti.html",

  /* --- FOTO (facoltativa) ---
     Nome di un'immagine presente nel sito, es. "logo.jpeg".
     Lascia "" (due virgolette vuote) per non mostrare nessuna foto. */
  immagine: "",

  /* --- PDF DA SCARICARE (facoltativo) ---
     1. Metti il file PDF nella cartella  documenti/  del sito
        (es. documenti/locandina-cena.pdf)
     2. Scrivi qui sotto lo stesso percorso, tra virgolette.
     Lascia "" per non mostrare nessun PDF.                      */
  pdf:          "documenti/locandina-cena.pdf",
  pdfEtichetta:   "Scarica la locandina",
  pdfEtichettaMk: "Преземи го летокот"
};

/* ============================================================
   DA QUI IN GIÙ NON SERVE MODIFICARE NULLA
   ============================================================ */
(function () {
  if (!ANNUNCIO.attivo) return;

   var pag = location.pathname.split('/').pop().toLowerCase();
  if (ANNUNCIO.soloHome && pag !== '' && pag !== 'index.html' && pag !== 'index-mk.html') return;

  var mk = document.documentElement.lang === 'mk';
  var T = {
    occhiello: mk ? ANNUNCIO.occhielloMk : ANNUNCIO.occhiello,
    titolo:    mk ? ANNUNCIO.titoloMk    : ANNUNCIO.titolo,
    data:      mk ? ANNUNCIO.dataMk      : ANNUNCIO.data,
    luogo:     mk ? ANNUNCIO.luogoMk     : ANNUNCIO.luogo,
    testo:     mk ? ANNUNCIO.testoMk     : ANNUNCIO.testo,
    bottone:   mk ? ANNUNCIO.bottoneMk   : ANNUNCIO.bottone,
    pdf:       mk ? ANNUNCIO.pdfEtichettaMk : ANNUNCIO.pdfEtichetta,
    alt:       mk ? ANNUNCIO.locandinaTestoMk : ANNUNCIO.locandinaTesto,
    chiudi:    mk ? 'Затвори'            : 'Chiudi'
  };

  /* già chiuso in questa visita? */
  try {
    if (sessionStorage.getItem('annuncioChiuso') === '1') return;
  } catch (e) {}

  var css = document.createElement('style');
  css.textContent =
    '.annOverlay{position:fixed;inset:0;background:rgba(7,63,43,.55);backdrop-filter:blur(5px);z-index:1200;display:flex;justify-content:center;align-items:center;padding:18px;opacity:0;transition:opacity .25s ease}' +
    '.annOverlay.on{opacity:1}' +
    '.annBox{position:relative;width:100%;max-width:430px;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 18px 50px rgba(8,42,68,.35);transform:scale(.92);transition:transform .25s ease;max-height:90vh;overflow-y:auto}' +
    '.annOverlay.on .annBox{transform:scale(1)}' +
    '.annBox img.annFoto{width:100%;height:170px;object-fit:cover;display:block}' +
    '.annBody{padding:24px 22px 22px}' +
    '.annOcchiello{display:inline-block;background:#d9b25f;color:#073f2b;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:6px 12px;border-radius:999px}' +
    '.annBox h2{font-family:Prata,Georgia,serif;font-weight:400;font-size:26px;color:#073f2b;margin:14px 0 12px;line-height:1.2}' +
    '.annRiga{display:flex;gap:10px;align-items:flex-start;color:#082a44;font-size:15px;margin-bottom:6px}' +
    '.annRiga span{flex:0 0 auto}' +
    '.annTesto{color:#617484;font-size:15px;margin:14px 0 20px}' +
    '.annBtn{display:block;text-align:center;background:linear-gradient(90deg,#d9b25f,#c9a24b);color:#073f2b;font-weight:800;text-decoration:none;padding:14px 18px;border-radius:14px;box-shadow:0 6px 16px rgba(201,162,75,.35)}' +
    '.annPdf{display:flex;justify-content:center;align-items:center;gap:8px;margin-top:10px;text-align:center;background:#fff;border:2px solid #073f2b;color:#073f2b;font-weight:700;text-decoration:none;padding:12px 18px;border-radius:14px}' +
    '.annChiudi{position:absolute;top:12px;right:12px;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.92);color:#073f2b;font-size:20px;line-height:1;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.18)}' +
    '.annBox.locandina{max-width:520px;background:transparent;box-shadow:none;overflow:visible}' +
    '.annBox.locandina img{width:auto;max-width:100%;margin:0 auto;max-height:80vh;object-fit:contain;display:block;border-radius:18px;box-shadow:0 18px 50px rgba(0,0,0,.4);background:#fff}' +
    '.annBox.locandina .annPdf{max-width:320px;margin:12px auto 0;background:rgba(255,255,255,.95)}' +
    '@media (prefers-reduced-motion:reduce){.annOverlay,.annBox{transition:none}}';
  document.head.appendChild(css);

  var overlay = document.createElement('div');
  overlay.className = 'annOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', T.titolo);

  var foto = ANNUNCIO.immagine
    ? '<img class="annFoto" src="' + ANNUNCIO.immagine + '" alt="">'
    : '';
  var bottone = ANNUNCIO.link
    ? '<a class="annBtn" href="' + ANNUNCIO.link + '" target="_blank" rel="noopener">' + T.bottone + '</a>'
    : '';
  var pdf = ANNUNCIO.pdf
    ? '<a class="annPdf" href="' + ANNUNCIO.pdf + '" target="_blank" rel="noopener"><span>📄</span>' + T.pdf + '</a>'
    : '';

  if (ANNUNCIO.modo === 'locandina') {
    var linkLocandina = ANNUNCIO.link
      ? '<a href="' + ANNUNCIO.link + '" target="_blank" rel="noopener"><img src="' + ANNUNCIO.locandina + '" alt="' + T.alt + '"></a>'
      : '<img src="' + ANNUNCIO.locandina + '" alt="' + T.alt + '">';
    overlay.innerHTML =
      '<div class="annBox locandina">' +
        '<button class="annChiudi" type="button" aria-label="' + T.chiudi + '">&times;</button>' +
        linkLocandina +
        pdf +
      '</div>';
  } else {
  overlay.innerHTML =
    '<div class="annBox">' +
      '<button class="annChiudi" type="button" aria-label="' + T.chiudi + '">&times;</button>' +
      foto +
      '<div class="annBody">' +
        '<span class="annOcchiello">' + T.occhiello + '</span>' +
        '<h2>' + T.titolo + '</h2>' +
        '<div class="annRiga"><span>📅</span><div>' + T.data + '</div></div>' +
        '<div class="annRiga"><span>📍</span><div>' + T.luogo + '</div></div>' +
        '<p class="annTesto">' + T.testo + '</p>' +
        bottone +
        pdf +
      '</div>' +
    '</div>';
  }

  function chiudi() {
    overlay.classList.remove('on');
    try { sessionStorage.setItem('annuncioChiuso', '1'); } catch (e) {}
    setTimeout(function () { overlay.remove(); }, 250);
    document.removeEventListener('keydown', esc);
  }
  function esc(e) { if (e.key === 'Escape') chiudi(); }

  function mostra() {
    document.body.appendChild(overlay);
    overlay.querySelector('.annChiudi').addEventListener('click', chiudi);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) chiudi(); });
    document.addEventListener('keydown', esc);
    requestAnimationFrame(function () {
      overlay.classList.add('on');
      overlay.querySelector('.annChiudi').focus();
    });
  }

  setTimeout(mostra, 700);
})();
