import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

export const searchCountry = async (query) => {
  try {
    const response = await api.get(`/name/${query}`);
    return response.data.map(country => ({
      name: country.translations.por.common,
      officialName: country.translations.por.official,
      languages: country.languages,
      cca3: country.cca3
    }));
  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
};

export const searchCountriesByLanguage = async (language) => {
  try {
    const response = await api.get(`/lang/${language}`);
    return response.data.map(country => ({
      name: country.translations.por.common,
      cca3: country.cca3
    }));
  } catch (error) {
    console.error("Error fetching countries by language:", error);
    return [];
  }
};
