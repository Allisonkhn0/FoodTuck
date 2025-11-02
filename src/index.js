import { Burger, Scroll, Slider } from './feature.js';

function init(){
  Burger()
  Scroll()
  new Slider
}

// App function after loading DOM Tree
document.addEventListener('DOMContentLoaded', init);