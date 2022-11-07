import * as model from './model.js';
import borderView from './views/borderView.js';
import detailView from './views/detailView';

const controlCountry = async function (value) {
  const hashID = window.location.hash.replaceAll('-', ' ').slice(1);
  console.log(hashID);

  if (!value) await model.detailCountry(hashID);

  if (value) await model.detailCountry(value);

  detailView.render(model.state.country);
};

const init = function () {
  controlCountry();
  borderView.addHandleClickBorders(controlCountry);
};
init();
