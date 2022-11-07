import * as model from './model.js';
import detailView from './views/detailView';
import View from './views/View.js';

const controlCountry = async function () {
  const hashID = window.location.hash.replaceAll('-', ' ').slice(1);
  await model.detailCountry(hashID);
  console.log(model.state.country);
};

const init = function () {
  controlCountry();
};
init();
