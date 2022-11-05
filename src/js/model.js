import { RES_PER_PAGE, COUNTRY_API } from './config.js';
import { getJSON } from './helper.js';
export const state = {
  country: {},
  allCountries: {
    country: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  filterCountries: {
    country: [],
  },
};

//! Get countries data and make customization object with data
export const loadCountry = async function () {
  try {
    const countryData = await getJSON(`${COUNTRY_API}/all`);

    countryData.forEach((element) => {
      state.allCountries.country.push({
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
export const resultPerPage = function (page = state.allCountries.page) {
  state.allCountries.page = page;
  const start = (page - 1) * state.allCountries.resultsPerPage;
  const end = page * state.allCountries.resultsPerPage;
  return state.allCountries.country.slice(start, end);
};

//! Filter countries by Region
export const filterCountry = async function (region) {
  try {
    state.filterCountries.country = [];
    const countries = await getJSON(`${COUNTRY_API}/region/${region}`);
    countries.forEach((element) => {
      state.filterCountries.country.push({
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
  } catch (error) {
    console.error(error);
  }
};
