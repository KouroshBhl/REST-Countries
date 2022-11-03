import * as model from './model.js';
import countryView from './views/countryView.js';

const controlCountry = async function () {
  //! 1) Load data
  await model.loadCountry();

  //! 2) Render all countries
  countryView.render(model.state.allCountries);
};

const init = function () {
  controlCountry();
};
init();
