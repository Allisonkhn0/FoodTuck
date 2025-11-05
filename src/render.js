import GetData from './GetData.js';
import { setupFilter, setupSorting, Loader, setupSearch } from './feature.js';

export let productsC = [];
let currentProductId = null;

// The card rendering itself
export function renderProductsList(products) {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  container.innerHTML = '';

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
      renderDopInfo(product)
    })
  });
}

function renderDopInfo(product) {
  const containerDop = document.getElementById('productsContainerDop');
  if (!containerDop) return;

  currentProductId = product.id;
  
  const hasOldPrice = product.costs.priceChange !== 0;
  const isOnSale = product.isSale;

  containerDop.innerHTML = `
    <div class="product-dop-info">
      <button class="close-dop-info">×</button>
      <div class="dop-info-content">
        <div class="dop-image-section">
          <img src="${product.imgCardURL}" alt="${product.product}" class="dop-product-image">
          ${isOnSale ? `<span class="sale-badge">Sell</span>` : ''}
        </div>
        <div class="dop-details-section">
          <h2 class="dop-product-name">${product.product}</h2>
          <div class="dop-price-container">
            <span class="dop-price-today">$${product.priceToday.toFixed(2)}</span>
            ${hasOldPrice ? `<span class="dop-old-price">$${product.costs.price.toFixed(2)}</span>` : ''}
          </div>
          <p class="dop-description">${product.description}</p>
          <button class="add-to-cart-btn">Take it!</button>
        </div>
      </div>
    </div>
  `;


  const closeBtn = containerDop.querySelector('.close-dop-info');
  closeBtn.addEventListener('click', () => {
    const containerDop = document.getElementById('productsContainerDop');
    if (containerDop) {
      containerDop.innerHTML = '';
      currentProductId = null;
    }
  });
}


export async function RenderProductsCards() {
  try {
    Loader.showLoader()

    const DATA = await GetData();

    // Validation for protect of null DATA
    if (!DATA || DATA.length === 0) {
      return;
    }

    // Adding a value for the current price
    productsC = DATA.map(product => ({
      ...product,
      priceToday: product.costs.price + product.costs.priceChange
    }));

    renderProductsList(productsC);
    setupSorting();
    setupFilter();
    setupSearch();

  } catch (error) {
    console.error('Ошибка в рендера карточки:', error);
  } finally {
    // At the end we hide the loader
    Loader.hideLoader()
  }
}