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

  _generateMarkupCountries(result) {
    return `
          <div class="country">
            <div class="country__container">
            <img
              src="${result.flag}"
              alt="${result.name}"
              class="country__img"
            />
            </div>
            <div class="country__content">
              <h2 class="country__name"><a href="country.html" class="country__name-a">${result.name}</a></h2>
              <p class="country__population">
                <span class="country__title">Population:</span> ${result.population}
              </p>
              <p class="country__region">
                <span class="country__title">Region:</span> ${result.region}
              </p>
              <p class="country__capital">
                <span class="country__title">Capital:</span> ${result.capital}
              </p>
            </div>
          </div>
    `;
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
