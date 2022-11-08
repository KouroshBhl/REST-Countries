export default class View {
  _parentEl = '';
  _targetEl = '';
  _data;
  _resultsEl = document.querySelector('.results__number');
  _spinnerEl = document.querySelector('.spinner');

  render(country) {
    this._data = country;
    const markup = this._generateMarkup();
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCountries).join('');
  }

  clear() {
    this._parentEl.innerHTML = '';
    this._spinnerEl.innerHTML = '';
  }

  loadingSpinner() {
    const markup = ` 
    <span class="loader"></span>
    `;
    this.clear();
    this._spinnerEl.insertAdjacentHTML('beforeend', markup);
  }

  displayNone() {
    this._targetEl.style.display = 'none';
  }
  displayShow() {
    this._targetEl.style.display = 'flex';
  }

  results(numbers) {
    this._resultsEl.textContent = numbers;
  }
}
