/* ============================================================
   GALLERIE FOTOGRAFICHE — Humanitarno Zdruzenie Labunishta Italia
   ============================================================
   COME AGGIUNGERE UNA NUOVA GALLERIA (3 passi):

   1. Crea una cartella dentro  assets/gallerie/  (es. assets/gallerie/eid-2026/)
      e carica dentro le foto (jpg o png).

   2. Aggiungi un blocco qui sotto nella lista GALLERIE, copiando
      uno di quelli esistenti e cambiando i valori:
        cartella : il nome della cartella creata
        foto     : la lista dei nomi dei file foto
        titolo / titoloMk : titolo in italiano e macedone
        data / dataMk     : periodo dell'evento nelle due lingue
        descrizione / descrizioneMk : breve frase (facoltativa)

   3. Carica su GitHub la cartella con le foto e questo file aggiornato.
      Fine! La galleria appare da sola su entrambe le pagine (IT e MK).

   La prima foto della lista viene usata come copertina.
   ============================================================ */

const GALLERIE = [
  {
    cartella: "assets/gallerie/donatorska-vecer-2026/",
    foto: ["foto-01.jpg", "foto-02.jpg", "foto-03.jpg", "foto-04.jpg", "foto-05.jpg",
           "foto-06.jpg", "foto-07.jpg", "foto-08.jpg", "foto-09.jpg", "foto-10.jpg",
           "foto-11.jpg", "foto-12.jpg", "foto-13.jpg", "foto-14.jpg", "foto-15.jpg",
           "foto-16.jpg", "foto-17.jpg", "foto-18.jpg", "foto-19.jpg", "foto-20.jpg",
           "foto-21.jpg", "foto-22.jpg", "foto-23.jpg", "foto-24.jpg", "foto-25.jpg",
           "foto-26.jpg", "foto-27.jpg", "foto-28.jpg", "foto-29.jpg", "foto-30.jpg",
           "foto-31.jpg", "foto-32.jpg", "foto-33.jpg", "foto-34.jpg", "foto-35.jpg",
           "foto-36.jpg", "foto-37.jpg", "foto-38.jpg", "foto-39.jpg", "foto-40.jpg",
           "foto-41.jpg", "foto-42.jpg", "foto-43.jpg", "foto-44.jpg", "foto-45.jpg"],
    titolo: "Donatorska Večer 2026",
    titoloMk: "Донаторска вечер 2026",
    data: "17 ottobre 2026",
    dataMk: "17 октомври 2026",
    descrizione: "La cena dei donatori organizzata dall'associazione presso il Centro Islamico Emanet di Susegana: preghiera, cena insieme e serata con interventi.",
    descrizioneMk: "Донаторската вечер организирана од здружението во Исламскиот центар Еманет во Сусегана: молитва, заедничка вечера и вечер со предавања."
  },
  {
    cartella: "assets/gallerie/iftar-2026/",
    foto: ["foto-01.jpg", "foto-02.jpg", "foto-03.jpg", "foto-04.jpg", "foto-05.jpg",
           "foto-06.jpg", "foto-07.jpg", "foto-08.jpg", "foto-09.jpg", "foto-10.jpg",
           "foto-11.jpg", "foto-12.jpg", "foto-13.jpg", "foto-14.jpg", "foto-15.jpg"],
    titolo: "Iftar 2026",
    titoloMk: "Ифтар 2026",
    data: "Ramadan 2026",
    dataMk: "Рамазан 2026",
    descrizione: "La cena dell'iftar organizzata dall'associazione presso il Centro Islamico Emanet di Susegana.",
    descrizioneMk: "Ифтарската вечера организирана од здружението во Исламскиот центар Еманет во Сусегана."
  }
  /* ============================================================
     PICNIC 2026 — DA RIATTIVARE DOPO L'EVENTO:
     1. togli la riga con /* qui sopra e quella con il segno di
        chiusura qui sotto
     2. metti una virgola dopo la parentesi graffa della galleria
        Iftar qui sopra
     3. crea la cartella assets/gallerie/picnic-2026/ con le foto
        e aggiorna la lista "foto"
  ,
  {
    cartella: "assets/gallerie/picnic-2026/",
    foto: ["foto-01.jpg", "foto-02.jpg", "foto-03.jpg", "foto-04.jpg"],
    titolo: "Picnic 2026",
    titoloMk: "Пикник 2026",
    data: "2026",
    dataMk: "2026",
    descrizione: "Una giornata insieme tra le famiglie della comunità.",
    descrizioneMk: "Ден поминат заедно со семејствата од заедницата."
  }
  ============================================================ */
];

/* ============================================================
   Da qui in giù non serve modificare nulla.
   ============================================================ */
(function () {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;
  var mk = document.documentElement.lang === 'mk';
  var current = null, index = 0;

  if (!GALLERIE.length) {
    grid.innerHTML = '<p class="muted">' + (mk ? 'Наскоро ќе бидат објавени првите фотогалерии.' : 'Presto saranno pubblicate le prime gallerie fotografiche.') + '</p>';
    return;
  }

  GALLERIE.forEach(function (g, gi) {
    var card = document.createElement('article');
    card.className = 'galleryCard';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    var title = mk ? (g.titoloMk || g.titolo) : g.titolo;
    var date = mk ? (g.dataMk || g.data) : g.data;
    var desc = mk ? (g.descrizioneMk || '') : (g.descrizione || '');
    card.setAttribute('aria-label', title);
    card.innerHTML =
      '<div class="galleryCover"><img alt="' + title + '" loading="lazy" src="' + g.cartella + g.foto[0] + '"/>' +
      '<span class="galleryCount">📷 ' + g.foto.length + '</span></div>' +
      '<div class="galleryBody"><h3>' + title + '</h3>' +
      '<p><strong>' + date + '</strong>' + (desc ? ' — ' + desc : '') + '</p></div>';
    function open() { openLb(gi, 0); }
    card.addEventListener('click', open);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    grid.appendChild(card);
  });

  // ----- Lightbox -----
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button aria-label="' + (mk ? 'Затвори' : 'Chiudi') + '" class="lbClose" type="button">×</button>' +
    '<button aria-label="' + (mk ? 'Претходна' : 'Precedente') + '" class="lbPrev" type="button">‹</button>' +
    '<img alt="" class="lbImg"/>' +
    '<button aria-label="' + (mk ? 'Следна' : 'Successiva') + '" class="lbNext" type="button">›</button>' +
    '<div class="lbBar"></div>';
  document.body.appendChild(lb);
  var img = lb.querySelector('.lbImg'), bar = lb.querySelector('.lbBar');

  function show() {
    var g = GALLERIE[current];
    var title = mk ? (g.titoloMk || g.titolo) : g.titolo;
    img.src = g.cartella + g.foto[index];
    img.alt = title + ' — ' + (index + 1);
    bar.textContent = title + '  ·  ' + (index + 1) + ' / ' + g.foto.length;
  }
  function openLb(gi, i) { current = gi; index = i; show(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function step(d) { var n = GALLERIE[current].foto.length; index = (index + d + n) % n; show(); }

  lb.querySelector('.lbClose').addEventListener('click', closeLb);
  lb.querySelector('.lbPrev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
  lb.querySelector('.lbNext').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  // swipe su telefono
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });
})();
