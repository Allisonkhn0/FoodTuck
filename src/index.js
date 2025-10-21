// ИМИАЦИЯ ПОЛУЧЕНИЯ ДАННЫХ С СЕРВЕРА
const products = [
  {
    "id": 1,
    "productName": "freshLime",
    "product": "Fresh Lime",
    "imgCardURL": "../../assets/img/shop/img_shop1.png",
    "isSale": false,
    "costs": {
      "price": 45.00,
      "priceChange": -7.00,
      "priceToday": 0
    }
  },
  {
    "id": 2,
    "productName": "chocolateMuffin",
    "product": "Chocolate Muffin",
    "imgCardURL": "../../assets/img/shop/img_shop2.png",
    "isSale": true,
    "costs": {
      "price": 28.00,
      "priceChange": 0,
      "priceToday": 0
    }
  },
  {
    "id": 3,
    "productName": "burger",
    "product": "Burger",
    "imgCardURL": "../../assets/img/shop/img_shop3.png",
    "isSale": false,
    "costs": {
      "price": 45.00,
      "priceChange": -24.00,
      "priceToday": 0
    }
  },
  {
    "id": 4,
    "productName": "countryBurger",
    "product": "Country Burger",
    "imgCardURL": "../../assets/img/shop/img_shop4.png",
    "isSale": false,
    "costs": {
      "price": 45.00,
      "priceChange": 0,
      "priceToday": 0
    }
  },
  {
    "id": 5,
    "productName": "drink",
    "product": "Drink",
    "imgCardURL": "../../assets/img/shop/img_shop5.png",
    "isSale": false,
    "costs": {
      "price": 45.00,
      "priceChange": -22.00,
      "priceToday": 0
    }
  },
  {
    "id": 6,
    "productName": "pizza",
    "product": "Pizza",
    "imgCardURL": "../../assets/img/shop/img_shop6.png",
    "isSale": false,
    "costs": {
      "price": 43.00,
      "priceChange": 0,
      "priceToday": 0
    }
  },
  {
    "id": 7,
    "productName": "cheeseButter",
    "product": "Cheese Butter",
    "imgCardURL": "../../assets/img/shop/img_shop7.png",
    "isSale": false,
    "costs": {
      "price": 10.00,
      "priceChange": 0,
      "priceToday": 0
    }
  },
  {
    "id": 8,
    "productName": "sandwiches",
    "product": "Sandwiches",
    "imgCardURL": "../../assets/img/shop/img_shop8.png",
    "isSale": false,
    "costs": {
      "price": 25.00,
      "priceChange": 0,
      "priceToday": 0
    }
  },
  {
    "id": 9,
    "productName": "chickenChup",
    "product": "Chicken Chup",
    "imgCardURL": "../../assets/img/shop/img_shop9.png",
    "isSale": true,
    "costs": {
      "price": 12.00,
      "priceChange": 0,
      "priceToday": 0
    }
  }
];

const productsC = products.map(product => ({
  ...product,
  costs: {
    ...product.costs,
    priceToday: product.costs.price + product.costs.priceChange
  }
}));


function renderProducts() {
    const container = document.getElementById('productsContainer');
    
    if (!container) {
        console.error('Контейнер для продуктов не найден!');
        return;
    }
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаем карточки для каждого продукта
    productsC.forEach(product => {
        const hasOldPrice = product.costs.priceChange !== 0;
        const isOnSale = product.isSale;
        
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

document.addEventListener('DOMContentLoaded', renderProducts);



// Скрол вверх по странице
function scrollUp() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}




let burger = document.querySelector('.burger');
let list = document.querySelector('.list');

burger.addEventListener('click', (e) => {
  e.stopPropagation();
  list.classList.toggle('active')
})

document.addEventListener('click', (e) => {

	if (!list.contains(e.target)) {
		list.classList.remove('active');
	}

});

