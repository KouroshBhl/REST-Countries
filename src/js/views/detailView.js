import View from './View.js';
class DetailCountry extends View {
  _parentEl = document.querySelector('.country-content');
  _mainEl = document.querySelector('.countries');

  addHandleClick(handler) {
    this._mainEl.addEventListener('click', function (e) {
      e.preventDefault();
      const element = e.target.closest('.country__name-a');
      if (!element) return;
      handler(element.innerHTML);
    });
  }

  _generateMarkup() {}
}
export default new DetailCountry();
