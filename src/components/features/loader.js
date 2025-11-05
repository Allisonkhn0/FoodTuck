// Hide/Show Loader
export class Loader {
  static loader = null;

  static showLoader() {
    if (!this.loader) {
      this.loader = document.createElement('div');
      this.loader.className = 'loader';
      this.loader.innerHTML = '<div class="loader-spinner"></div>';
    }
    
    if (!document.body.contains(this.loader)) {
      document.body.appendChild(this.loader);
    }
  }

  static hideLoader() {
    if (document.body.contains(this.loader)) {
      document.body.removeChild(this.loader);
    }
  }
}