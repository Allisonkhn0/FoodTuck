import { Burger } from './components/features/burgerMenu.js'
import { Scroll } from './components/features/scroll.js'
import { OpenAside } from './components/features/openAside.js'
import { RenderProductsCards } from './components/render/render.js'

function init() {
  Scroll()
  Burger()
  OpenAside()
  RenderProductsCards()
}

// App function after loading DOM Tree
document.addEventListener('DOMContentLoaded', init)