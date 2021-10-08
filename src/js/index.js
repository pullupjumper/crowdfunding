import "../scss/index.scss";

const hamburger = document.querySelector('.c-header__hamburger');
const menu = document.querySelector('.c-dropdown__menu');
const modalOverlay = document.querySelector('.c-modal');

const counterContainer = document.querySelector('.js-list--counter');
const productListContainer = document.querySelector('.js-list--product');
const selectionModal = document.querySelector('.js-modal--selection');
const selectionModalClose = document.querySelector('.js-modal__close');
const backBtn = document.querySelector('.js-btn--back');
const pledgeListContainer = document.querySelector('.js-list--pledge');

const pledgeStatus = {
  STANDARD: 0,
  CHECKED: 1,
  DISABLED: 2
};

const counter = {
  money: 89914,
  backer: 5007,
  day: 56
};

const pledgeList = [{
  status: 0,
  id: '001',
  name: "Bamboo Stand",
  stock: 101,
  pledge: 25,
  describe: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
}, {
  status: 0,
  id: '002',
  name: "Black Edition Stand",
  stock: 64,
  pledge: 75,
  describe: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
}, {
  status: 2,
  id: '003',
  name: "Mahogany Special Edition",
  stock: 0,
  pledge: 200,
  describe: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
}];

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('js-header__hamburger-closed');
  menu.classList.toggle('js-dropdown__menu-active');
  modalOverlay.classList.toggle('is-active');
});

updateCounter();
initProduct();
initModal();


function initModal() {
  updateModal();
  pledgeListContainer.addEventListener('click', onSelected);
  selectionModalClose.addEventListener('click', onClose);
  backBtn.addEventListener('click', onOpen);
  console.log('initModal');
}

function updateModal() {
  let html = ``;

  pledgeList.forEach((pledge, index, array) => {
    let className = '';
    let isChecked = '';

    if (pledgeStatus.CHECKED === pledge.status) {
      className = 'is-active';
      isChecked = 'checked';
    }

    if (pledge.stock === 0) {
      className = 'is-disabled';
      array[index].status = 2;
    }

    html += ` <li class="l-list__item" data-id="${pledge.id}">
          <div class="c-card c-card--pledge ${className}">
            <div class="c-card__body">
              <div class="c-pledge">
                <label class="c-checkbox">
                  <input type="radio" class="c-checkbox__input" name="pledge" ${isChecked}>
                  <span class="c-checkbox__checkmark"></span>
                  <span class="c-checkbox__content">
                  <span>Bamboo Stand</span>
                  <span>Pledge $${pledge.pledge} or more</span>
                </span>
                </label>
                <p class="c-pledge__text">${pledge.describe}</p>
                <div class="c-pledge__remain">
                  <span>${pledge.stock}</span>
                  <span>Left</span>
                </div>
              </div>
            </div>
            <div class="c-card__footer">
              <h4>Enter your pledge</h4>
              <div class="l-formContainer">
                <div class="c-number">
                  <span class="c-number__hint">$</span>
                  <input class="c-number__input js-number__input" type="number">
                </div>
                <a href="#" class="c-btn c-btn--primary js-continueBtn">Continue</a>
              </div>
            </div>
          </div>
        </li>`;
  });

  pledgeListContainer.innerHTML = html;
}

function setStatus(id, status) {
  pledgeList.forEach(pledge => {
    if (pledge.stock === 0) {
      pledge.status = pledgeStatus.DISABLED;
      return pledge;
    }

    if (pledge.id === id) {
      pledge.status = status;
      return pledge;
    }

    pledge.status = pledgeStatus.STANDARD;
    return pledge;
  });
}

function onSelected(e) {
  if (isParentElementExisted(e.target, 'c-checkbox')) {
    let id = getParentElementData(e.target, 'l-list__item', 'id');
    setStatus(id, pledgeStatus.CHECKED);
    updateModal();
    console.log(pledgeList);
  }

  if (e.target.classList.contains('js-continueBtn')) {
    console.log(e.target.parentElement.querySelector('.js-number__input').value);
  }
}

function onClose(e) {
  selectionModal.classList.toggle('is-active');
  console.log('close');
}

function onOpen(e) {
  selectionModal.classList.toggle('is-active');
  console.log('open');
}

function isParentElementExisted(el, className) {
  if (el) {
    while (el.parentElement) {
      if (el.parentElement.classList.contains(className)) {
        return true;
      } else {
        el = el.parentElement;
      }
    }
  }

  return false;
}

function getParentElementData(el, className, dataName) {
  if (el) {
    while (el.parentElement) {
      if (el.parentElement.classList.contains(className)) {
        return el.parentElement.dataset[dataName];
      } else {
        el = el.parentElement;
      }
    }
  }

  return null;
}

function updateCounter() {
  const html = `<li class="l-list__item">
            <div class="c-counter">
              <h1 class="c-counter__number">$${counter.money}</h1>
              <p class="c-counter__text">of $100,000 backed</p>
            </div>
          </li>
          <li class="l-list__item">
            <div class="c-counter">
              <h1 class="c-counter__number">${counter.backer}</h1>
              <p class="c-counter__text">total backers</p>
            </div>
          </li>
          <li class="l-list__item">
            <div class="c-counter">
              <h1 class="c-counter__number">${counter.day}</h1>
              <p class="c-counter__text">days left</p>
            </div>
          </li>`;

  counterContainer.innerHTML = html;
}

function initProduct() {
  let html = ``;

  pledgeList.forEach(pledge => {
    html += `<li class="l-list__item">
            <div class="c-card c-card--product ${pledge.stock === 0 ? "is-disabled" : ''}">
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