import * as model from './model.js';
import countryView from './views/countryView.js';
import PaginationView from './views/PaginationView.js';
import FilterView from './views/filterView.js';
import filterView from './views/filterView.js';
import SearchView from './views/searchView.js';
import searchView from './views/searchView.js';
import detailView from './views/detailView';

const controlCountry = async function (data = false) {
  //! 0) Load Spinner
  countryView.loadingSpinner();

  //! 1) Load data
  if (!data) await model.loadCountry();

  //! 2) Render all countries
  countryView.render(model.resultPerPage());

  //! 3) Render Pagination View
  PaginationView.render(model.state.allCountries);

  //! 4) Calculate and render number of ALL countries
  countryView.results(model.state.allCountries.country.length);

  //! 5) Display Pagination
  countryView.displayShow();
};

//! Pagination
const controlPagination = function (goToPage) {
  //? 1) Pass go to page value
  countryView.render(model.resultPerPage(goToPage));

  //? 2) Render pagination
  PaginationView.render(model.state.allCountries);

  //? 3) Calculate and render number of ALL countries
  countryView.results(model.state.allCountries.country.length);
};

//! Filter
const controlFilter = async function (region) {
  try {
    //! 0) Load Spinner
    filterView.loadingSpinner();

    if (region === 'All') return controlCountry(true);
    //! 1) Send region to model
    await model.filterCountry(region);

    //! 2) Render countries by Region
    FilterView.render(model.state.filterCountries.country);

    //! 3) Calculate and render number of FILTERED countries
    countryView.results(model.state.filterCountries.country.length);

    //! 4) Hide pagination
    filterView.displayNone();
  } catch (error) {
    console.error(error);
  }
};

//! Search
const controlSearch = function (value) {
  //! 1) Render countries
  searchView.render(model.searchData(value));

  //! 2) Calculate number of countries
  searchView.results(model.searchData(value).length);
};

const controlDetailCountry = function (value) {
  window.location = `/country.html#${value.replaceAll(' ', '-')}`;
};

//! Use IIFE (Immediately Invoked Function Expression)
(function () {
  controlCountry();
  PaginationView.addHandlerClick(controlPagination);
  FilterView.addHandlerClick(controlFilter);
  SearchView.addHandlerSearch(controlSearch);
  detailView.addHandleClick(controlDetailCountry);
})();
