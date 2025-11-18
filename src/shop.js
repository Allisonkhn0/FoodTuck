import { Burger } from './components/features/burgerMenu.js'
import { Scroll } from './components/features/scroll.js'
import { OpenAside } from './components/features/openAside.js'
import { RenderProductsCards } from './components/render/render.js'

function init() {
  try {
    Scroll()
    Burger()
    OpenAside()
    RenderProductsCards()
  } catch (error) {
    console.error(`Ошибка загрузки JavaScript в shop.js: ${error}`);
  }
}

// App function after loading DOM Tree
document.addEventListener('DOMContentLoaded', init)