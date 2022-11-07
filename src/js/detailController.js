import * as model from './model.js';
import detailView from './views/detailView';

const controlCountry = async function () {
  const hashID = window.location.hash.replaceAll('-', ' ').slice(1);
  await model.detailCountry(hashID);

  detailView.render(model.state.country);
};

const controlBorders = function () {};

const init = function () {
  controlCountry();
};
init();
