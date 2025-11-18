import { RenderProductsCards } from './render/render.js';

// Filter/Sort/Search cards

// class SetupCards
export class SetupCards{

  constructor(){
    this.currentSort = 'Newest';
    this.currentFilter = 'All';
    this.searchTerm = '';
    this.checkboxes = [];
    this.isCurrentFilter = null;
    this.currentPage = 1;

    this.init()
  }

  init(){
    this.setupSorting()
    this.setupFilter()
    this.setupSearch()
    this.setupCheckboxFilter()
    this.setupPagination()
  }

  updateFilters() {
    this.complirelRenderCards();
  }

  // Sorting
  setupSorting() {
    const select1 = document.querySelector('.select-first');
    if (!select1) return;
    
    select1.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.complirelRenderCards()
    })
  }

    // Sorting
  logicSorting(products) {
    let result = [...products];

    switch (this.currentSort) {
      case 'Price': result = result.sort((a, b) => a.priceToday - b.priceToday); break; // By price (top cost < bottom cost)
      case 'Discount': result = result.sort((a, b) => a.costs.priceChange - b.costs.priceChange); break; // By discount (of biggest)
      case 'Newest': result = result.sort((a, b) => b.id - a.id); break; // By id (Newest*)....Im forget this part in lasts commits
      default: return result
    }

    return result;
  }

  // Filter
  setupFilter() {
    const select2 = document.querySelector('.select-second');
    if (!select2) return;

    select2.addEventListener('change', (e) => {
      this.currentPage = 1;
      this.setupPagination()

      this.currentFilter = e.target.value;
      this.complirelRenderCards()
    })
  }

  // Search
  setupSearch() {
    const input = document.querySelector('#searchInput');
    const form = document.querySelector('.S_aside__form');
    if (!input) return;
    if (!form) return;

    this.currentPage = 1;

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.searchTerm = input.value.trim().toLowerCase()

      this.currentPage = 1;
      this.setupPagination()

      if(!this.searchTerm) this.complirelRenderCards()
        else this.complirelRenderCards()
    })
  }

  // checkboxFilter
  setupCheckboxFilter() {
    const checkboxes = document.querySelectorAll('.checkboxes-filter');
    if (!checkboxes) return;
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {

        this.currentPage = 1;
        this.setupPagination()

        const value = e.target.value;
        const isChecked = e.target.checked;

        isChecked ? this.checkboxes.push(value) : this.checkboxes = this.checkboxes.filter(item => item !== value);
        this.complirelRenderCards()
      })
    })
  }

  setupPagination() {
    const prevButton = document.querySelector('#prevPage')
    const nextButton = document.querySelector('#nextPage')
    const pagButton1 = document.querySelector('.pag_button1')
    const pagButton2 = document.querySelector('.pag_button2')
    const pagButton3 = document.querySelector('.pag_button3')

    pagButton1.addEventListener('click', () => {
      if (this.currentPage !== 1) {
        this.currentPage = 1
        this.complirelRenderCards()        
      }
    })

    pagButton2.addEventListener('click', () => {
      if (this.currentPage !== 2) {
        this.currentPage = 2;
        this.complirelRenderCards()        
      }
    })

    pagButton3.addEventListener('click', () => {
      if (this.currentPage !== 3) {
        this.currentPage = 3;
        this.complirelRenderCards()        
      }
    })

    prevButton.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.complirelRenderCards()
      }
    })

    nextButton.addEventListener('click', () => {
      this.currentPage += 1
      this.complirelRenderCards()
    })
  }

  // Compilation
  complirelRenderCards() {

    this.currentFilter === 'Vegan' ? this.isCurrentFilter = true : this.isCurrentFilter = false
    RenderProductsCards(this.isCurrentFilter, this.checkboxes, this.searchTerm, this.currentPage)
  }
}