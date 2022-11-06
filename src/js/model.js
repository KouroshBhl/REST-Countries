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
    const country = await getJSON(`${COUNTRY_API}/all`);
    customizeData(country, state.allCountries.country);
  } catch (err) {
    console.error(err);
  }
};

//! Filter countries by Region
export const filterCountry = async function (region) {
  try {
    state.filterCountries.country = [];
    const countries = await getJSON(`${COUNTRY_API}/region/${region}`);
    customizeData(countries, state.filterCountries.country);
  } catch (error) {
    console.error(error);
  }
};

const customizeData = function (data, state) {
  data.forEach((el) => {
    state.push({
      name: el.name.common,
      capital: el.capital,
      flag: el.flags?.svg,
      languages: el.languages,
      population: el.population,
      subregion: el.subregion,
      borders: el?.borders,
      region: el.region,
    });
  });
};

//! Slice data and pass to controller
export const resultPerPage = function (page = state.allCountries.page) {
  state.allCountries.page = page;
  const start = (page - 1) * state.allCountries.resultsPerPage;
  const end = page * state.allCountries.resultsPerPage;
  return state.allCountries.country.slice(start, end);
};

//! Search input
export const searchData = function (value) {
  if (!state.allCountries) return;
  const valueLength = value.length;
  const result = state.allCountries.country.filter(
    (country) =>
      country.name.toLowerCase().slice(0, valueLength) === value.toLowerCase()
  );
  return result;
};
