import { RES_PER_PAGE, COUNTRY_API } from './config.js';
import { getJSON } from './helper.js';
export const state = {
  country: [],
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
      population: seperateNumbers(el.population),
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
  const result = state.allCountries.country.filter(
    (country) =>
      country.name.toLowerCase().slice(0, value.length) === value.toLowerCase()
  );
  return result;
};

export const detailCountry = async function (countryName) {
  try {
    state.country = [];
    const country = await getJSON(
      `${COUNTRY_API}/name/${countryName}?fullText=true`
    );
    const countryBorders = country[0]?.borders;

    let borders;
    if (countryBorders) {
      borders = await getJSON(`${COUNTRY_API}/alpha?codes=${countryBorders}`);
      // const bordersName = borders.map((border) => border.name.common);
    }
    country.forEach((el) => {
      state.country.push({
        commonName: el.name.common,
        nativeName: el.name.nativeName,
        officialName: el.name.official,
        area: el.area,
        borders: borders ? borders.map((border) => border?.name.common) : '',
        fifa: el.fifa,
        flag: el.flags.svg,
        languages: el.languages,
        population: seperateNumbers(el.population),
        region: el.region,
        subRegion: el.subregion,
        startWeek: el.startOfWeek,
        timeZone: el.timezones,
        postalCodeFormat: el.postalCode?.format,
        capital: el.capital,
        currencies: el.currencies,
        tld: el.tld,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

//! Seperate numbers
const seperateNumbers = function (number) {
  let str = number.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('');
};
