import { DATA } from "../secrets/data/data.js";

export function RenderProductsCards() {

  // Get all current products 
  const productsC = DATA.productsData.products.map(product => ({
    ...product,
    costs: {
      ...product.costs,
      priceToday: product.costs.price + product.costs.priceChange
    }
  }));

  // Render app cards in DOM
  function renderProducts() {
      const container = document.getElementById('productsContainer');

      // Clear container
      container.innerHTML = '';
      
      // Create card for every of products
      productsC.forEach(product => {
          const hasOldPrice = product.costs.priceChange !== 0;
          const isOnSale = product.isSale;
              
      if (!container) {
          console.error('Контейнер для продуктов не найден!');
          return;
      }
      
          const productCard = document.createElement('div');
          productCard.className = 'product-card';
          
          productCard.innerHTML = `
              <img src="${product.imgCardURL}" alt="${product.product}" class="product-image">

              <div class="product-name">${product.product}</div>

              <div class="price-container">

                  <span class="price-today" style="color: #FF9F0D">
                    $${product.costs.priceToday.toFixed(2)}
                  </span>

                  ${hasOldPrice ? `<span class="old-price">$${product.costs.price.toFixed(2)}</span>` : ''}
                  ${isOnSale ? `<span class="sale-badge">Sell</span>` : ''}

              </div>

          `;
          
          container.appendChild(productCard);
      });
    }

  // App function after loading DOM Tree
  document.addEventListener('DOMContentLoaded', renderProducts);
}