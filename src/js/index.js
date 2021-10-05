import "../scss/index.scss";

const hamburger = document.querySelector('.c-header__hamburger');
const menu = document.querySelector('.c-dropdown__menu');
const modalOverlay = document.querySelector('.c-modal__overlay');

const productListContainer = document.querySelector('.js-list--product');

const pledgeList = [
  {
    name: "Bamboo Stand",
    stock: 101,
    pledge: 25,
    describe: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
  },
  {
    name: "Black Edition Stand",
    stock: 64,
    pledge: 75,
    describe: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
  },
  {
    name: "Mahogany Special Edition",
    stock: 0,
    pledge: 200,
    describe: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
  },
];

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('js-header__hamburger-closed');
  menu.classList.toggle('js-dropdown__menu-active');
  modalOverlay.classList.toggle('js-modal__overlay-active');
});

initProduct();


function initProduct() {
  let html = ``;

  pledgeList.forEach(pledge => {
    html += `<li class="l-list__item">
            <div class="c-card c-card--product ${pledge.stock === 0 ? "c-card--product-disabled" : ''}">
              <div class="c-card__header">
                <h3>${pledge.name}</h3>
                <h4>${"Pledge $" + pledge.pledge + " or more"}</h4>
              </div>
              <div class="c-card__body">
                <p class="c-card__text">${pledge.describe}</p>
              </div>
              <div class="c-card__footer">
                <div class="c-counter c-counter--product">
                  <h1 class="c-counter__number">${pledge.stock}</h1>
                  <p class="c-counter__text">left</p>
                </div>
                <a href="#" class="c-btn c-btn--primary">${pledge.stock === 0 ? "Out of stock" : "Select Reward"}</a>
              </div>
            </div>
          </li>`;
  });

  productListContainer.innerHTML = html;
}