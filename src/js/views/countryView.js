import View from './View.js';
class countryView extends View {
  _parentEl = document.querySelector('.countries');
  _targetEl = document.querySelector('.pagination');

  _generateMarkup() {
    return this._data.map(this._generateMarkupCountries).join('');
  }

  _generateMarkupCountries(result) {
    // console.log(pop);

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

  helllooo() {
    // let str = number.toString().split('.');
    // if (str[0].length >= 5) {
    //   str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    // }
    // if (str[1] && str[1].length >= 5) {
    //   str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    // }
    console.log('ssssssss');
    // return str.join('');
  }
}
export default new countryView();
