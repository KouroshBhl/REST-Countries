import View from './View.js';
class DetailCountry extends View {
  _parentEl = document.querySelector('.country-content');

  addHandleClickBorders(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const element = e.target.closest('.btn');
      if (!element) return;
      handler(element.innerHTML);
    });
  }
}

export default new DetailCountry();
