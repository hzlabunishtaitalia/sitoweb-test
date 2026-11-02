function toggleMenu(){
  const links = document.querySelector('.links');
  const btn = document.querySelector('.menuBtn');
  const open = links.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

var selectedAmount = '10 €';
var selectedCausale = 'Quota associativa mensile';
function selAmount(btn){
  document.querySelectorAll('.amountBtn').forEach(function(b){ b.classList.remove('sel'); });
  btn.classList.add('sel');
  selectedAmount = btn.childNodes[0].textContent.trim();
  selectedCausale = btn.getAttribute('data-causale') || 'Donazione Humanitarno Zdruzenie Labunishta Italia';
}
function copyIban(){
  navigator.clipboard.writeText('IT65Z0200861624000107426851');
  var mk = document.documentElement.lang === 'mk';
  var hasAmounts = document.querySelector('.amountBtn');
  if (hasAmounts) {
    alert(mk ? 'IBAN е копиран!\nИзнос: ' + selectedAmount + '\nЦел на уплата: ' + selectedCausale
             : 'IBAN copiato!\nImporto: ' + selectedAmount + '\nCausale: ' + selectedCausale);
  } else {
    alert(mk ? 'IBAN е копиран' : 'IBAN copiato');
  }
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
