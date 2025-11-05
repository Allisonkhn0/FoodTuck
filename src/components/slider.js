// SLIDER
export class Slider {
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
    
    // Next and Back - "<-" and "->"
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
  
  // Slide in next/back page. Main logic
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
  
  // UI component 
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