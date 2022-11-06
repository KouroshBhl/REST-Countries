import View from './View.js';
class SearchView extends View {
  _parentEl = document.querySelector('.countries');
  _searchInput = document.querySelector('.search__input');

  addHandlerSearch(handler) {
    this._searchInput.addEventListener('input', function (e) {
      e.preventDefault();

      handler(this.value);
    });
  }
}
export default new SearchView();
