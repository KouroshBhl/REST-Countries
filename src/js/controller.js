import * as model from './model.js';
import countryView from './views/countryView.js';
import PaginationView from './views/PaginationView.js';

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

const init = function () {
  controlCountry();
  PaginationView.addHandlerClick(controlPagination);
};
init();
