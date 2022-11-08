import * as model from './model.js';
import BorderView from './views/borderView.js';
import DetailView from './views/detailView';

const controlCountry = async function (value) {
  //! 1) Load Spinner
  DetailView.loadingSpinner();

  //! 2) Get Hash ID
  const hashID = window.location.hash.replaceAll('-', ' ').slice(1);

  //! 3) If Click on a country when it is on main page pass HASH ID to model
  if (!value) await model.detailCountry(hashID);

  //! 4) Pass value to model
  if (value) await model.detailCountry(value);

  //! 5) Render country
  DetailView.render(model.state.country);
};

//! Use IIFE (Immediately Invoked Function Expression)
(function () {
  controlCountry();
  BorderView.addHandleClickBorders(controlCountry);
})();
