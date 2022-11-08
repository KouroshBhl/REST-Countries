import View from './View.js';
class DetailCountry extends View {
  _parentEl = document.querySelector('.country-content');
  _mainEl = document.querySelector('.countries');
  _spinnerEl = document.querySelector('.spinner');

  addHandleClick(handler) {
    this._mainEl.addEventListener('click', function (e) {
      e.preventDefault();
      const element = e.target.closest('.country__name-a');
      if (!element) return;
      handler(element.innerHTML);
    });
  }

  _generateMarkup() {
    const country = this._data[0];
    return `
    <figure class="image">
      <img src="${country.flag}" alt="" class="image__country" />
    </figure>

     <div class="detail">
      <h2 class="detail__name">${country.commonName}</h2>

       <div class="detail__container">
      <ul class="detail__list">
        <li class="detail__native-name detail__li">
          <span class="detail__title"> Native Name: </span
          ><span class="detail__data">${this._generateObjectString(
            country.nativeName,
            'common'
          )}</span>
        </li>
        <li class="detail__population detail__li">
          <span class="detail__title">Population:</span>
          <span class="detail__data">${country.population}</span>
        </li>
        <li class="detail__region detail__li">
          <span class="detail__title">Region: </span
          ><span class="detail__data">${country.region}</span>
        </li>
        <li class="detail__sub-region detail__li">
          <span class="detail__title">Sub-Region:</span>
          <span class="detail__data">${country.subRegion}</span>
        </li>
        <li class="detail__capital detail__li">
          <span class="detail__title">Capital:</span>
          <span class="detail__data">${country.capital}</span>
        </li>
        <li class="detail__top-lvl-domain detail__li">
          <span class="detail__title">Top-Level-Domain:</span>
          <span class="detail__data">${country.tld}</span>
        </li>
        <li class="detail__currencies detail__li">
          <span class="detail__title">Currencies:</span>
          <span class="detail__data">${this._generateObjectString(
            country.currencies,
            'name'
          )} (${this._generateObjectString(
      country.currencies,
      'symbol'
    )})</span>
        </li>
        <li class="detail__languages detail__li">
          <span class="detail__title">Languages:</span>
          <span class="detail__data">${Object.values(country.languages)}</span>
        </li>
      </ul>
    </div>

    <div class="country__borders">
      <p class="country__borders-name">Border Countries</p>
      ${country.borders ? this._generateBorderCountries() : 'No Borders!'}
      </div>
   </div>
    `;
  }

  _generateObjectString(object, name) {
    let str = '';
    for (const [_, value] of Object.entries(object)) {
      str += `${value[name]} `;
    }
    return str;
  }

  _generateBorderCountries() {
    return this._data[0].borders
      .map((border) => `<a class="btn" href="#">${border}</a>`)
      .join('');
  }
}
export default new DetailCountry();
