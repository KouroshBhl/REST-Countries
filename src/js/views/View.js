export default class View {
  _parentEl = '';
  _targetEl = '';
  _data;
  _resultsEl = document.querySelector('.results__number');

  render(country) {
    this._data = country;
    const markup = this._generateMarkup();
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
    this.results();
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCountries).join('');
  }

  clear() {
    this._parentEl.innerHTML = '';
  }

  displayNone() {
    this._targetEl.style.display = 'none';
  }
  displayShow() {
    this._targetEl.style.display = 'flex';
  }

  _generateMarkupCountries(result) {
    let str = result.population.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
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
                <span class="country__title">Population:</span> ${str.join()}
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

  results(numbers) {
    this._resultsEl.textContent = numbers;
  }
}
