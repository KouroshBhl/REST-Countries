import View from './View.js';
class countryView extends View {
  _parentEl = document.querySelector('.countries');
  _targetEl = document.querySelector('.pagination');

  _generateMarkup() {
    return this._data.map(this._generateMarkupCountries).join('');
  }
}
export default new countryView();
