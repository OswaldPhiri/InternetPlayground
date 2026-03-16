
import axios from 'axios';

const FACT_API = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
const DOG_API = 'https://api.thedogapi.com/v1/images/search';
const COUNTRY_API = 'https://restcountries.com/v3.1/all?fields=cca3,name,flags,capital,population,region,maps';
const NASA_API = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1';

export const getRandomFact = async () => {
  const response = await axios.get(FACT_API);
  return {
    id: response.data.id,
    text: response.data.text,
    type: 'fact'
  };
};

export const getRandomDog = async () => {
  const response = await axios.get(DOG_API);
  return {
    id: response.data[0].id,
    url: response.data[0].url,
    type: 'dog'
  };
};

export const getRandomCountry = async () => {
  const response = await axios.get(COUNTRY_API);
  const countries = response.data;
  const country = countries[Math.floor(Math.random() * countries.length)];
  return {
    id: country.cca3,
    name: country.name.common,
    flag: country.flags.svg,
    capital: country.capital?.[0],
    population: country.population,
    region: country.region,
    map: country.maps.googleMaps,
    type: 'country'
  };
};

export const getSpaceImage = async () => {
  const response = await axios.get(NASA_API);
  const item = response.data[0];
  return {
    id: item.date,
    title: item.title,
    description: item.explanation,
    url: item.hdurl || item.url,
    type: 'space'
  };
};
