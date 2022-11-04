export default class View {
  _parentEl = '';
  _data;
  render(country) {
    this._data = country;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCountries).join('');
  }

  _clear() {
    this._parentEl.innerHTML = '';
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
              <h2 class="country__name">${result.name}</h2>
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
}
