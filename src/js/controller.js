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

const controlPagination = function (goToPage) {
  countryView.render(model.resultPerPage(goToPage));
  PaginationView.render(model.state);
};

const init = function () {
  controlCountry();
  PaginationView.addHandlerClick(controlPagination);
};
init();
