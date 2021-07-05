const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav__item');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if(!showMenu) {
    hamburger.classList.add('open');
    nav.classList.add('open');
    menuNav.classList.add('open');
    navItems.forEach(item => item.classList.add('open'));

    showMenu = true;
  } else {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    menuNav.classList.remove('open');
    navItems.forEach(item => item.classList.remove('open'));

    showMenu = false;
  }
}

// play on load for gallery view
setTimeout(transition, 1000);

$('.js-trigger-transition').on('click', function(e) {
  e.preventDefault();
  transition();
});

function transition() {

  var tl = new TimelineMax();

  tl.to(CSSRulePlugin.getRule('body:before'), 0.2, {cssRule: {top: '50%' }, ease: Power2.easeOut}, 'close')
  .to(CSSRulePlugin.getRule('body:after'), 0.2, {cssRule: {bottom: '50%' }, ease: Power2.easeOut}, 'close')
  .to($('.loader'), 0.2, {opacity: 1})
  .to(CSSRulePlugin.getRule('body:before'), 0.2, {cssRule: {top: '0%' }, ease: Power2.easeOut}, '+=1.5', 'open')
  .to(CSSRulePlugin.getRule('body:after'), 0.2, {cssRule: {bottom: '0%' }, ease: Power2.easeOut}, '-=0.2', 'open')
  .to($('.loader'), 0.2, {opacity: 0}, '-=0.2');
}

const getTitle = async page => {
  const title = await page.evaluate(() => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle != null && ogTitle.content.length > 0) {
      return ogTitle.content;
    }
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle != null && twitterTitle.content.length > 0) {
      return twitterTitle.content;
    }
    const docTitle = document.title;
    if (docTitle != null && docTitle.length > 0) {
      return docTitle;
    }
    const h1 = document.querySelector("h1").innerHTML;
    if (h1 != null && h1.length > 0) {
      return h1;
    }
    const h2 = document.querySelector("h1").innerHTML;
    if (h2 != null && h2.length > 0) {
      return h2;
    }
    return null;
  });
  return title;
};
