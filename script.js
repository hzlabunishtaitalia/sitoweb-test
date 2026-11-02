function toggleMenu(){
  const links = document.querySelector('.links');
  const btn = document.querySelector('.menuBtn');
  const open = links.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

var selectedAmount = '10 €';
var selectedCausale = 'Quota associativa mensile';
function selAmount(btn){
  document.querySelectorAll('.amountBtn').forEach(function(b){ b.classList.remove('sel'); b.setAttribute('aria-pressed','false'); });
  btn.classList.add('sel');
  btn.setAttribute('aria-pressed','true');
  selectedAmount = btn.childNodes[0].textContent.trim();
  selectedCausale = btn.getAttribute('data-causale') || 'Donazione Humanitarno Zdruzenie Labunishta Italia';
}
function showToast(html){
  var t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    t.setAttribute('role','status'); t.setAttribute('aria-live','polite');
    document.body.appendChild(t);
  }
  t.innerHTML = html;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(function(){ t.classList.remove('show'); }, 3800);
}
function copyIban(){
  var IBAN = 'IT65Z0200861624000107426851';
  var mk = document.documentElement.lang === 'mk';
  var hasAmounts = document.querySelector('.amountBtn');
  var msg;
  if (hasAmounts) {
    msg = mk ? '<b>IBAN е копиран.</b><br>Износ: ' + selectedAmount + ' · Цел на уплата: ' + selectedCausale
             : '<b>IBAN copiato.</b><br>Importo: ' + selectedAmount + ' · Causale: ' + selectedCausale;
  } else {
    msg = mk ? '<b>IBAN е копиран.</b>' : '<b>IBAN copiato.</b>';
  }
  function done(){
    if (document.querySelector('link[href="wow.css"]')) { showToast(msg); }
    else { alert(msg.replace(/<br>/g,'\n').replace(/<[^>]+>/g,'')); }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(IBAN).then(done, function(){ showToast((mk ? 'IBAN: ' : 'IBAN: ') + IBAN); });
  } else { showToast('IBAN: ' + IBAN); }
}

function openCallPopup(){ const p = document.getElementById('callPopup'); if(p){ p.style.display='flex'; p.setAttribute('aria-hidden','false'); } }
function closeCallPopup(){ const p = document.getElementById('callPopup'); if(p){ p.style.display='none'; p.setAttribute('aria-hidden','true'); } }
function openWhatsappPopup(){ const p = document.getElementById('whatsappPopup'); if(p){ p.style.display='flex'; p.setAttribute('aria-hidden','false'); } }
function closeWhatsappPopup(){ const p = document.getElementById('whatsappPopup'); if(p){ p.style.display='none'; p.setAttribute('aria-hidden','true'); } }

document.addEventListener('click', function(e){
  if (e.target && e.target.id === 'callPopup') closeCallPopup();
  if (e.target && e.target.id === 'whatsappPopup') closeWhatsappPopup();
  // chiude il menu mobile cliccando fuori
  var links = document.querySelector('.links');
  var btn = document.querySelector('.menuBtn');
  if (links && links.classList.contains('open') && !links.contains(e.target) && !(btn && btn.contains(e.target))) {
    links.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape'){ closeCallPopup(); closeWhatsappPopup(); }
});

// Animazioni di comparsa allo scroll (rispetta prefers-reduced-motion via CSS)
(function(){
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach && els.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function(el){ io.observe(el); });
})();

// Home: scena del lago, le catene di montagne si spostano appena con il mouse e lo scorrimento
(function(){
  var scene = document.querySelector('.heroScene');
  if (!scene) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var layers = [
    {els: scene.querySelectorAll('.hsL1'), k: 0.25},
    {els: scene.querySelectorAll('.hsL2'), k: 0.55},
    {els: scene.querySelectorAll('.hsL3'), k: 1}
  ];
  var mx = 0, sy = 0, raf = 0;
  function apply(){
    raf = 0;
    layers.forEach(function(l){
      var x = (mx * 18 * l.k).toFixed(1);
      var y = (Math.min(sy, 600) * 0.06 * l.k).toFixed(1);
      l.els.forEach(function(el, idx){
        // idx 0 = montagne, idx 1 = riflesso (capovolto: si muove al contrario in verticale)
        el.setAttribute('transform', 'translate(' + x + ' ' + (idx === 0 ? y : -y) + ')');
      });
    });
  }
  function req(){ if (!raf) raf = requestAnimationFrame(apply); }
  window.addEventListener('mousemove', function(e){ mx = (e.clientX / window.innerWidth) - 0.5; req(); }, {passive:true});
  window.addEventListener('scroll', function(){ sy = window.scrollY; req(); }, {passive:true});
})();

// Home: video del hero fermo per chi ha chiesto meno animazioni
(function(){
  var v = document.querySelector('.hsVideo');
  if (!v) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); }
})();
