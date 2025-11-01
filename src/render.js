import GetData from './GetData.js';
import { hideLoader, showLoader, setupFilter, setupSorting } from './feature.js';

export let productsC = [];

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
  });
}


export async function RenderProductsCards() {
  try {
    showLoader()

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

  } catch (error) {
    console.error('Ошибка в рендера карточки:', error);
  } finally {
    // At the end we hide the loader
    hideLoader()
  }
}