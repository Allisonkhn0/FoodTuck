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
export class Loader {
  static loader = null;

  static showLoader() {
    if (!this.loader) {
      this.loader = document.createElement('div');
      this.loader.className = 'loader';
      this.loader.innerHTML = '<div class="loader-spinner"></div>';
    }
    
    if (!document.body.contains(this.loader)) {
      document.body.appendChild(this.loader);
    }
  }

  static hideLoader() {
    if (document.body.contains(this.loader)) {
      document.body.removeChild(this.loader);
    }
  }
}


// Filter/Sort cards

// Initial values
let currentSort = 'Newest';
let currentFilter = 'All';

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
  }

  if (currentSort === 'Price') {
    result = result.sort((a, b) => a.priceToday - b.priceToday);
  } else if (currentSort === 'Discount') {
    result = result.sort((a, b) => a.costs.priceChange - b.costs.priceChange);
  }

  renderProductsList(result);
}


// SLIDER
export class Slider {
  constructor() {
    this.slides = document.querySelectorAll('.recom__slide');
    this.currSlide = 0;
    this.sliderContainer = document.querySelector('.recom__slider');
    
    this.init();
  }
  
  init() {

    this.showSlide(this.currSlide);
    
    this.sliderContainer.addEventListener('click', () => {
      this.nextSlide();
    });
    
    // Next and Back - "<-" and "->"
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
  
  // Slide in next/back page. Main logic
  showSlide(index) {

    this.slides.forEach(slide => {
      slide.style.display = 'none';
      slide.classList.remove('slide-active');
    });
    
    this.slides[index].style.display = 'block';
  }
  
  nextSlide() {
    this.currSlide = (this.currSlide + 1) % this.slides.length;
    this.showSlide(this.currSlide);
    this.updatePagination();
  }
  
  prevSlide() {
    this.currSlide = (this.currSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currSlide);
    this.updatePagination();
  }
  
  // UI component 
  updatePagination() {
    const dots = document.querySelectorAll('.recom-circle');
    dots.forEach((dot, index) => {
      if (index === this.currSlide) {
        dot.style.backgroundColor = '#FF9F0D';
      } else {
        dot.style.backgroundColor = '#ff9e0d30';
      }
    });
  }
}