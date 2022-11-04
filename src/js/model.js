import * as config from './config.js';
import { getJSON } from './helper.js';
export const state = {
  country: {},
  allCountries: [],
  resultsPerPage: config.RES_PER_PAGE,
  page: 1,
};

export const loadCountry = async function () {
  try {
    // const getCountry = await fetch(`${config.COUNTRY_API}/all`);
    // const countryData = await getCountry.json();
    const countryData = await getJSON(`${config.COUNTRY_API}/all`);

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

export const resultPerPage = function (page = state.page) {
  state.page = page;
  console.log(state.page);
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;

  return state.allCountries.slice(start, end);
};
