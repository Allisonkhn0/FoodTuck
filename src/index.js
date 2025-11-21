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

document.addEventListener('DOMContentLoaded', init);