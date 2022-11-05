import * as model from './model.js';
import View from './views/View';
import countryView from './views/countryView.js';
import PaginationView from './views/PaginationView.js';
import FilterView from './views/filterView.js';

const controlCountry = async function () {
  //! 1) Load data
  await model.loadCountry();

  //! 2) Render all countries
  countryView.render(model.resultPerPage());

  //! 3) Render Pagination View
  PaginationView.render(model.state);
};

//! Pagination
const controlPagination = function (goToPage) {
  //? 1) Pass go to page value
  countryView.render(model.resultPerPage(goToPage));

  //? 2) Render pagination
  PaginationView.render(model.state);
};

const controlFilter = async function (region) {
  try {
    console.log(region);
    //! 1) Send region to model
    await model.filterCountry(region);

    //! 2) Render countries by Region
    FilterView.render(model.state.filterCountries);
    console.log(model.state.filterCountries);

    //! 3) Render pagination
    // PaginationView.render(model.state.filterCountries);
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
