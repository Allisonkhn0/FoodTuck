import GetData from './GetData.js';
import { hideLoader, showLoader } from './feature.js';

export async function RenderProductsCards() {
  try {
    showLoader()

    const DATA = await GetData();

    if (!DATA || DATA.length === 0) {
      return;
    }

    const productsC = DATA.map(product => ({
      ...product,
      priceToday: product.costs.price + product.costs.priceChange
    }));

    const setupProductsC = structuredClone(productsC);

    function renderProductsList(products) {
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

    function setupSorting() {
      const select1 = document.querySelector('.select-first');
      if (!select1) return;

      select1.addEventListener('change', (e) => {
        const value = e.target.value;
        let sortedProducts;

        if (value === 'Price') {
          sortedProducts = [...productsC].sort((a, b) => a.priceToday - b.priceToday);
        } else if (value === 'Discount') {
          sortedProducts = [...productsC].sort((a, b) => a.costs.priceChange - b.costs.priceChange);
        } else if (value === 'Newest') {
          sortedProducts = [...setupProductsC];
        } else {
          sortedProducts = [...productsC];
        }

        renderProductsList(sortedProducts);
      });
    }

    renderProductsList(productsC);
    setupSorting();

  } catch (error) {
    console.error('Ошибка в рендера карточки:', error);
  } finally {
    hideLoader()
  }
}