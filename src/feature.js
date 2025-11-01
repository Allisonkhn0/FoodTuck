import { productsC, renderProductsList } from "./render.js";


// Scroll for Button Up
export function Scroll() {
  document.querySelector('.button-up').addEventListener('click', () => {
    scrollUp()
  })

  function scrollUp() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}


// BURGER MENU
export function Burger () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.list');

  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
  });

}


// OPEN ASIDE
export function OpenAside() {
  const openButton = document.querySelector('.open-aside');
  const closeButton = document.querySelector('.close-aside');
  const aside = document.querySelector('.S_aside');

  openButton.addEventListener('click', () => {
    aside.classList.toggle('active');
  })

  closeButton.addEventListener('click', () => {
    aside.classList.remove('active');
  })
}


// Hide/Show Loader
const loader = document.createElement('div');
loader.className = 'loader';
loader.innerHTML = `
  <div class="loader-spinner"></div>
`;

export function showLoader() {
  document.body.appendChild(loader);
}

export function hideLoader() {
  if (document.body.contains(loader)) {
    document.body.removeChild(loader);
  }
}


// Filter/Sort cards

// Initial values
let currentSort = 'default';
let currentFilter = 'all';

// Function of sort cards
export function setupSorting() {
  const select1 = document.querySelector('.select-first');

  if (!select1) return;

  select1.addEventListener('change', (e) => {
    currentSort = e.target.value;
    complirelRenderCards();
  });
}

// Function of filter cards
export function setupFilter() {
  const select2 = document.querySelector('.select-second');

  if (!select2) return;

  select2.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    complirelRenderCards();
  });
}

// Compiler function
function complirelRenderCards() {
  let result = [...productsC]

  if (currentFilter === 'Vegan') {
    result = result.filter((product) => !(product.category.includes('Non Veg')));
  } else {
    result = productsC
  }

  if (currentSort === 'Price') {
    result = result.sort((a, b) => a.priceToday - b.priceToday);
  } else if (currentSort === 'Discount') {
    result = result.sort((a, b) => a.costs.priceChange - b.costs.priceChange);
  } else if (currentSort === 'Discount'){
    result = productsC
  }

  renderProductsList(result);
}