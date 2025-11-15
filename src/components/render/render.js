import GetData from '../api/GetData.js'
import { Loader } from '../features/loader.js'
import { SetupCards } from '../setupCards.js';

export let productsC = [];
let currentProductId = null;
let setupCardsInstance = null;

const mainShopContainer = document.querySelector('.S_container');
const dopProductPageContainer = document.getElementById('dopProductPageContainer');
dopProductPageContainer.style.display = 'none';


// The card rendering itself
export function renderProductsList(products) {
  const container = document.getElementById('productsContainer');

  if (!container) return;
  container.innerHTML = '';

  if (container.classList.contains('empty')) {
    container.innerHTML = `
      <div class='no-cards'>
        <img class="no-image" src="/public/assets/img/another/def.png" alt="Photo of null">
        <p class="p--standart" style="color: #000; font-size: 30px; line-height: 30px;">It looks like it's empty...</p>    
      </div>
    `
  }
  
  products.forEach(product => {
    const hasOldPrice = product.costs.priceChange !== 0;
    const isOnSale = product.isSale;

    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
          <img src="${product.imgCardURL}" alt="${product.product}" class="product-image">
          <div class="product-name">${product.product}</div>
          <div class="price-container">
            <span class="price-today" style="color: #FF9F0D">
              $${product.priceToday.toFixed(2)}
            </span>
            ${hasOldPrice ? `<span class="old-price">$${product.costs.price.toFixed(2)}</span>` : ''}
            ${isOnSale ? `<span class="sale-badge">Sell</span>` : ''}
          </div>
        `;

    container.appendChild(productCard);

    productCard.addEventListener('click', () => {
      renderDopInfo(product);
    });
  });
}

function renderDopInfo(product) {

  if (!mainShopContainer || !dopProductPageContainer) return;

  currentProductId = product.id;
  const hasOldPrice = product.costs.priceChange !== 0;
  const isOnSale = product.isSale;

  mainShopContainer.style.display = 'none';
  dopProductPageContainer.style.display = 'block';

  dopProductPageContainer.innerHTML = `
    <div class="dop__container">
      <button class="dop-back" id="dopBack">
        <img src="/public/assets/icons/back_two_icon.svg" alt="Back arrow" style="width: 16px; height: 16px;">
        Back to Shop
      </button>

      <h1 class="dop-name">${product.product}</h1>
      
      <div class="dop-gallery">
        <img src="${product.imgCardURL}" alt="${product.product}" class="dop-image">
        ${isOnSale ? `<span class="sale-badge">Sell</span>` : ''}
        <div class="dop-image_down__container">
          <img src="${product.imgCardURL2}" alt="${product.product}" class="dop-image_down">
          <img src="${product.imgCardURL3}" alt="${product.product}" class="dop-image_down">
        </div>
      </div>
      
      <div class="dop-details">
        
        <div class="dop-price__container">
          <span class="dop-price-today">$${product.priceToday.toFixed(2)}</span>
          ${hasOldPrice ? `<span class="dop-old-price">$${product.costs.price.toFixed(2)}</span>` : ''}
        </div>
        
        <p class="dop-description">${product.description}</p>
        <p class="dop-description">Calorias: <span class="text--highlight">${product.calorias}</span></p>
        
        <div class="dop-ball">
          <div class="dop-ball__item">
            <img src="/public/assets/img/recom/img_recom_stars.png" alt="Rating" style="height: 16px;">
            <p class="dop-description">Rate: 4/5</p>
          </div>
        </div>
        
        <button class="dop-add">
          Add to Cart - $${product.priceToday.toFixed(2)}
        </button>
      </div>
    </div>
  `;

  document.getElementById('dopBack').addEventListener('click', () => {
    dopProductPageContainer.style.display = 'none';
    dopProductPageContainer.innerHTML = '';
    mainShopContainer.style.display = 'block';
  });
}

export async function RenderProductsCards(isCurrentFilter, checkboxes, searchTerm) {
  try {
    Loader.showLoader();
    
    const DATA = await GetData(isCurrentFilter, checkboxes, searchTerm);

    // Validation for protect of null DATA || Update, sometimes Not Found 404 status is needed.
    if (!DATA || DATA.length === 0) {
      console.warn('Cards With Filters Not Found 404 Status');
      document.getElementById('productsContainer').classList.add('empty')
    } else document.getElementById('productsContainer').classList.remove('empty')

    // Adding a value for the current price
    productsC = DATA.map(product => ({
      ...product,
      priceToday: product.costs.price + product.costs.priceChange
    }));

    if (setupCardsInstance) {
      productsC = setupCardsInstance.logicSorting(productsC);
    }

    renderProductsList(productsC);
   
    // For save data of curr-values
    if (!setupCardsInstance) {
      setupCardsInstance = new SetupCards();
    }
    
  } catch (error) {
    console.error('Ошибка в рендера карточки:', error);
  } finally {
    // At the end we hide the loader
    Loader.hideLoader();
  }
}