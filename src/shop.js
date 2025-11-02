import { Scroll, Burger, OpenAside } from './feature.js';
import { RenderProductsCards } from './render.js';

function init() {
  Scroll()
  Burger()
  OpenAside()
  RenderProductsCards()
}

// App function after loading DOM Tree
document.addEventListener('DOMContentLoaded', init)