import "../scss/index.scss";

const hamburger = document.querySelector('.c-header__hamburger');
const menu = document.querySelector('.c-dropdown__menu');
const modalOverlay = document.querySelector('.c-modal__overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('js-header__hamburger-closed');
  menu.classList.toggle('js-dropdown__menu-active');
  modalOverlay.classList.toggle('js-modal__overlay-active');
});