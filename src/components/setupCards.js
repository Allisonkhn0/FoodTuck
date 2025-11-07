import { productsC, renderProductsList } from './render/render.js';
import GetData from './api/GetData.js';

// Filter/Sort/Search cards

// class SetupCards
export class SetupCards{

  constructor(){
    this.currentSort = 'Newest';
    this.currentFilter = 'All';
    this.searchTerm = '';
    this.checkboxes = [];

    this.init()
  }

  init(){
    this.setupSorting()
    this.setupFilter()
    this.setupSearch()
    this.setupCheckboxFilter()
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

  // Filter
  setupFilter() {
    const select2 = document.querySelector('.select-second');

    if (!select2) return;

    select2.addEventListener('change', (e) => {
      this.currentFilter = e.target.value;
      this.complirelRenderCards()

    })
  }

  // Search
  setupSearch() {
    const input = document.querySelector('#searchInput');
    const form = document.querySelector('.S_aside__form');
      
    if (!input) return;

    input.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.trim().toLowerCase()
      this.complirelRenderCards()

    })

    form.addEventListener('submit', (e) => e.preventDefault())
  }

  // checkboxFilter
  setupCheckboxFilter() {
    const checkboxes = document.querySelectorAll('.checkboxes-filter');

    if (!checkboxes) return;
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {

        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) this.checkboxes.push(value)
          else this.checkboxes = this.checkboxes.filter(item => item !== value);

        this.complirelRenderCards()

      })
    })
  }

  // Compilation
  complirelRenderCards() {
    
    let result = [...productsC];

    if (this.searchTerm !== '') {
      result = result.filter((product) => product.product.trim().toLowerCase().includes(this.searchTerm));
    }  

    if (this.checkboxes.length > 0) {
      result = result.filter((product) => this.checkboxes.some(value => product.category.includes(value)));
    }

    if (this.currentFilter === 'Vegan') {
      result = result.filter((product) => product.vegan);
    }

    if (this.currentSort === 'Price') {
      result = result.sort((a, b) => a.priceToday - b.priceToday);
    } else if (this.currentSort === 'Discount') {
      result = result.sort((a, b) => a.costs.priceChange - b.costs.priceChange);
    }

    renderProductsList(result)
  }
}