import "../scss/index.scss";

const hamburger = document.querySelector('.js-hamburger');
const menuModal = document.querySelector('.js-menuModal');

const counterContainer = document.querySelector('.js-counterList');
const productListContainer = document.querySelector('.js-productList');
const selectionModal = document.querySelector('.js-selectionModal');
const selectionModalCloseBtn = document.querySelector('.js-selectionModalCloseBtn');
const completeModal = document.querySelector('.js-completeModal');
const completeModalCloseBtn = completeModal.querySelector('.js-completeModalCloseBtn');
const backProjectBtn = document.querySelector('.js-backProjectBtn');
const pledgeListContainer = document.querySelector('.js-pledgeList');
const subHeader = document.querySelector('.js-subHeader');

const body = document.querySelector('body');


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

let pledgeList = [{
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


updateCounter();
initProduct();
initModal();


function initModal() {
  initSelectionModal();
  hamburger.addEventListener('click', onHamburgerClick);
  pledgeListContainer.addEventListener('click', onSelectionModalSelect);
  selectionModalCloseBtn.addEventListener('click', onSelectionModalClose);
  backProjectBtn.addEventListener('click', onSelectionModalOpen);
  completeModalCloseBtn.addEventListener('click', onCompleteModalClose);
  window.addEventListener('scroll', debounce(onScroll));
  selectionModal.addEventListener('scroll', debounce(onScroll));
  console.log('initModal');
}


function onScroll() {
  const bodyPosition = (body.offsetTop) + (body.clientHeight / 2);

  if (window.scrollY > bodyPosition || selectionModal.scrollTop > 50) {
    // console.log(window.scrollY);
    // console.log(body.clientHeight);
    subHeader.classList.add('is-visible');
  } else {
    subHeader.classList.remove('is-visible');
  }
}


function onHamburgerClick(e) {
  hamburger.classList.toggle('is-active');
  menuModal.classList.toggle('is-active');
}

function initSelectionModal() {
  let html = ``;

  pledgeList.forEach((pledge, index, array) => {
    let className = '';
    let isChecked = '';
    let maxHeight = 0;

    if (pledgeStatus.CHECKED === pledge.status) {
      className = 'is-active';
      isChecked = 'checked';
      let footer = document.querySelector('.c-card--pledge .c-card__footer');

      if (footer) {
        maxHeight = footer.scrollHeight + 'px';
      }
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
            <div class="c-card__footer" style="max-height: ${maxHeight}">
            
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
  pledgeList = pledgeList.map(pledge => {

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

function updateSelectionModal() {
  pledgeList.forEach((pledge, index, array) => {
    let listItem = document.querySelector(`li[data-id="${pledge.id}"]`);
    let card = listItem.querySelector('.c-card');
    let footer = card.querySelector('.c-card__footer');
    footer.style.maxHeight = 0;
    card.classList.remove('is-active');
    card.classList.remove('is-disabled');

    if (pledgeStatus.CHECKED === pledge.status) {
      card.classList.add('is-active');

      if (footer) {
        // console.log(footer)
        // console.log(footer.scrollHeight)
        footer.style.maxHeight = footer.scrollHeight + 'px';
      }
    }

    if (pledge.stock === 0) {
      card.classList.add('is-disabled');
      array[index].status = 2;
    }
  });
}

function onSelectionModalSelect(e) {
  if (isParentElementExisted(e.target, 'c-checkbox')) {
    const id = getParentElementData(e.target, 'l-list__item', 'id');
    const card = document.querySelector(`li[data-id="${id}"] .c-card`);
    const input = card.querySelector('.c-checkbox__input');

    if (!card.classList.contains('is-disabled')) {
      input.removeAttribute('disabled');
      setStatus(id, pledgeStatus.CHECKED);
      updateSelectionModal();
    } else {
      input.setAttribute('disabled', 'true');
    }
  }

  if (e.target.classList.contains('js-continueBtn')) {
    let id = getParentElementData(e.target, 'l-list__item', 'id');
    let pledge = getPledgeById(id);
    const minPledge = pledge.pledge;
    let inputValue = e.target.parentElement.querySelector('.js-number__input').value;

    if (inputValue == null || inputValue === '' || inputValue === undefined) {
      inputValue = minPledge;
    }

    addMoney(inputValue);
    addBacker();
    updateCounter();
    closeSelectionModal();
    showCompleteModal();
    // console.log(e.target.parentElement.querySelector('.js-number__input').value);
  }
}

function closeSelectionModal() {
  selectionModal.classList.toggle('is-active');
}

function showCompleteModal() {
  completeModal.classList.toggle('is-active');
}

function addMoney(money) {
  counter.money += parseInt(money, 10);
}

function addBacker() {
  counter.backer++;
}

function setPledgeById(id, pledge) {
  pledgeList = pledgeList.map(item => {
    if (item.id = id) {
      return pledge;
    }

    return item;
  });
}

function getPledgeById(id) {
  let result = null;

  pledgeList.forEach(pledge => {
    if (pledge.id === id) {
      result = pledge;
    }
  });

  return result;
}

function onCompleteModalOpen(e) {
  completeModal.classList.toggle('is-active');
}

function onCompleteModalClose(e) {
  completeModal.classList.toggle('is-active');
}

function onSelectionModalClose(e) {
  selectionModal.classList.toggle('is-active');
  console.log('close');
}

function onSelectionModalOpen(e) {
  selectionModal.classList.toggle('is-active');
  console.log('open');
}

function debounce(func, delay = 250) {
  let timer = null;

  return () => {
    let context = this;
    let args = arguments;

    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay)
  }
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