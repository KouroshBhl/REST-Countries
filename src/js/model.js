export const state = {
  country: {},
  allCountries: [],
};

export const loadCountry = async function () {
  try {
    const getCountry = await fetch(`https://restcountries.com/v3.1/all`);
    const countryData = await getCountry.json();

    countryData.forEach((element) => {
      state.allCountries.push({
        name: element.name.common,
        capital: element.capital,
        flag: element.flags?.png,
        languages: element.languages,
        population: element.population,
        subregion: element.subregion,
        borders: element?.borders,
      });
    });
  } catch (err) {
    console.error(err);
  }
};
