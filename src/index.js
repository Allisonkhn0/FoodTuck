import { Burger } from './components/features/burgerMenu.js'
import { Scroll } from './components/features/scroll.js'
import { Slider } from './components/slider.js'

function init(){
  try {
    Burger()
    Scroll()
    new Slider()
  } catch (error) {
    console.error(`Ошибка загрузки JavaScript в index.js: ${error}`);
  }
}

// App function after loading DOM Tree
document.addEventListener('DOMContentLoaded', init);