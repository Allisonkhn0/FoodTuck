import { Burger } from './components/features/burgerMenu.js'
import { Scroll } from './components/features/scroll.js'
import { Slider } from './components/slider.js'

function init(){
  Burger()
  Scroll()
  new Slider
}

// App function after loading DOM Tree
document.addEventListener('DOMContentLoaded', init);