// Скрол вверх по странице
function scrollUp() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}


// ИМИАЦИЯ ПОЛУЧЕНИЯ ДАННЫХ С СЕРВЕРА
const products = [
  {
    "id": 1,
    "productName": "freshLime",
    "product": "Fresh Lime",
    "category": ["Uncategorized"],
    "imgCardURL": "/assets/img/shop/img_shop1.png",
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
    "category": ["Uncategorized"],
    "imgCardURL": "/assets/img/shop/img_shop2.png",
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
    "category": ["Burger", "Non Veg"],
    "imgCardURL": "/assets/img/shop/img_shop3.png",
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
    "category": ["Burger", "Non Veg"],
    "imgCardURL": "/assets/img/shop/img_shop4.png",
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
    "category": ["Drink"],
    "imgCardURL": "/assets/img/shop/img_shop5.png",
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
    "category": ["Pizza", "Non Veg"],
    "imgCardURL": "/assets/img/shop/img_shop6.png",
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
    "category": ["Uncategorized", "Non Veg"],
    "imgCardURL": "/assets/img/shop/img_shop7.png",
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
    "category": ["Sandwich", "Non Veg"],
    "imgCardURL": "/assets/img/shop/img_shop8.png",
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
    "category": ["Chicken Chup", "Non Veg"],
    "imgCardURL": "/assets/img/shop/img_shop9.png",
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



// BURGER MENU
const burger = document.querySelector('.burger');
const nav = document.querySelector('.list');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});



// SLIDER
class Slider {
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
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
  
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

document.addEventListener('DOMContentLoaded', () => new Slider());