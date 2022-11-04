import { RES_PER_PAGE, COUNTRY_API } from './config.js';
import { getJSON } from './helper.js';
export const state = {
  country: {},
  allCountries: [],
  resultsPerPage: RES_PER_PAGE,
  page: 1,
};

//! Get countries data and make customization object with data
export const loadCountry = async function () {
  try {
    const countryData = await getJSON(`${COUNTRY_API}/all`);

    countryData.forEach((element) => {
      state.allCountries.push({
        name: element.name.common,
        capital: element.capital,
        flag: element.flags?.svg,
        languages: element.languages,
        population: element.population,
        subregion: element.subregion,
        borders: element?.borders,
        region: element.region,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

//! Slice data and pass to controller
export const resultPerPage = function (page = state.page) {
  state.page = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;

  return state.allCountries.slice(start, end);
};
