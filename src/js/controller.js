import * as model from './model.js';
import View from './views/View';
import countryView from './views/countryView.js';
import PaginationView from './views/PaginationView.js';
import FilterView from './views/filterView.js';
import filterView from './views/filterView.js';

const controlCountry = async function (data = false) {
  //! 1) Load data
  if (!data) await model.loadCountry();

  //! 2) Render all countries
  countryView.render(model.resultPerPage());

  //! 3) Render Pagination View
  PaginationView.render(model.state.allCountries);

  countryView.displayShow();
};

//! Pagination
const controlPagination = function (goToPage) {
  //? 1) Pass go to page value
  countryView.render(model.resultPerPage(goToPage));

  //? 2) Render pagination
  PaginationView.render(model.state.allCountries);
};

const controlFilter = async function (region) {
  try {
    if (region === 'All') return controlCountry(true);
    //! 1) Send region to model
    await model.filterCountry(region);

    //! 2) Render countries by Region
    FilterView.render(model.state.filterCountries.country);

    filterView.displayNone();
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  controlCountry();
  PaginationView.addHandlerClick(controlPagination);
  FilterView.addHandlerClick(controlFilter);
};
init();
