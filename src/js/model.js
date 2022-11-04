export const state = {
  country: {},
  allCountries: [],
  resultsPerPage: 20,
  page: 1,
};

export const loadCountry = async function () {
  try {
    const getCountry = await fetch(`https://restcountries.com/v3.1/all`);
    const countryData = await getCountry.json();
    console.log(countryData);
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
  const start = (page - 1) * state.resultsPerPage; // 1
  const end = page * state.resultsPerPage;

  return state.allCountries.slice(start, end); // 0, 20   20, 40
};
