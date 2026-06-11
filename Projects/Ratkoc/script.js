const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const hero = document.querySelector('.hero');
const langButtons = document.querySelectorAll('.lang-btn');
const i18nElements = document.querySelectorAll('[data-i18n]');
const translations = {
  sq: {
    'nav.about': 'Rreth fshatit',
    'nav.gallery': 'Foto',
    'nav.info': 'Informacione',
    'nav.contact': 'Kontakt',
    'hero.eyebrow': 'Mirë se vini në',
    'hero.title': 'Fshatin Ratkoc',
    'hero.text': 'Një vend i qetë, me bukuri natyrore, tradita të gjalla dhe njerëz që ruajnë identitetin e komunitetit të Rahovecit.',
    'hero.button': 'Shiko fotot',
    'about.label': 'Përshkrim',
    'about.title': 'Çfarë e bën Ratkocin special?',
    'about.card1.title': 'Historia dhe identiteti',
    'about.card1.text': 'Ratkoci është një fshat me rrënjë të thella në historinë e krahinës së Rahovecit, ku koha dhe tradita kanë formuar një komunitet të fortë dhe të lidhur me tokën.',
    'about.card2.title': 'Natyra dhe peizazhi',
    'about.card2.text': 'Fushat dhe pamjet e hapura e bëjnë këtë vend të bukur për pushime, shëtitje dhe vlerësim të natyrës së gjallë të rajonit.',
    'about.card3.title': 'Jeta e përditshme',
    'about.card3.text': 'Qytetaria dhe familjet e këtij fshati vazhdojnë të mbajnë shoqërinë, punën dhe zakonet lokale me krenari dhe respekt për të kaluarën.',
    'gallery.label': 'Foto',
    'gallery.title': 'Foto të fshatit dhe peizazheve rreth tij',
    'info.label': 'Informacione',
    'info.title': 'Njohuri të dobishme për Ratkocin',
    'info.card1.title': 'Vendndodhja',
    'info.card1.text': 'Ratkoci ndodhet në zonën e Rahovecit, në një rajon ku fusha, bjeshkët dhe tradita bashkohen në një ambient të veçantë.',
    'info.card2.title': 'Qëndrueshmëria',
    'info.card2.text': 'Fshati mbetet një shembull i ndërtimit të komunitetit me kujdes për tokën, kulturën dhe familjet lokale.',
    'info.card3.title': 'Traditat',
    'info.card3.text': 'Festimet, bisedat e vjetra, punët e tokës dhe lidhja me familjet janë pjesë e identitetit të këtij vendi.',
    'info.card4.title': 'Për të vizituar',
    'info.card4.text': 'Është një vend i përshtatshëm për ata që duan të shohin një anë më autentike të jetës rurale të Rahovecit.'
  },
  en: {
    'nav.about': 'About the village',
    'nav.gallery': 'Photos',
    'nav.info': 'Information',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Welcome to',
    'hero.title': 'Ratkoc Village',
    'hero.text': 'A peaceful place with natural beauty, living traditions, and people who preserve the identity of the Rahovec community.',
    'hero.button': 'View photos',
    'about.label': 'Overview',
    'about.title': 'What makes Ratkoc special?',
    'about.card1.title': 'History and identity',
    'about.card1.text': 'Ratkoc is a village with deep roots in the history of the Rahovec region, where time and tradition have shaped a strong and grounded community.',
    'about.card2.title': 'Nature and landscape',
    'about.card2.text': 'The fields, open views, and natural surroundings make this place beautiful for walks, rest, and appreciation of the living landscape.',
    'about.card3.title': 'Daily life',
    'about.card3.text': 'The people and families of this village continue to preserve community life, work, and local customs with pride and respect for the past.',
    'gallery.label': 'Photos',
    'gallery.title': 'Photos of the village and its surroundings',
    'info.label': 'Information',
    'info.title': 'Useful information about Ratkoc',
    'info.card1.title': 'Location',
    'info.card1.text': 'Ratkoc is located in the Rahovec area, where fields, hills, and traditions come together in a distinctive setting.',
    'info.card2.title': 'Sustainability',
    'info.card2.text': 'The village remains a model of community building with care for the land, culture, and local families.',
    'info.card3.title': 'Traditions',
    'info.card3.text': 'Festivities, old conversations, farm work, and family ties are part of the identity of this place.',
    'info.card4.title': 'For visitors',
    'info.card4.text': 'It is a suitable destination for those who want to experience a more authentic side of rural life in Rahovec.'
  }
};
const bgImages = [
  'images/Dimri.jpg'
];

let bgIndex = 0;

function applyBackground() {
  const image = bgImages[bgIndex];
  document.body.style.backgroundImage = `linear-gradient(135deg, rgba(15,23,42,0.98), rgba(17,24,39,0.98)), url('${image}')`;
  if (hero) {
    hero.style.backgroundImage = `linear-gradient(120deg, rgba(8, 15, 31, 0.82), rgba(15, 23, 42, 0.65)), url('${image}')`;
  }
  bgIndex = (bgIndex + 1) % bgImages.length;
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  i18nElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

applyBackground();
setInterval(applyBackground, 4000);
setLanguage('sq');

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});
