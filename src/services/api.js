
import axios from 'axios';

const FACT_API = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
const DOG_API = 'https://dog.ceo/api/breeds/image/random';
const COUNTRY_API = 'https://restcountries.com/v3.1/all';
const NASA_API = 'https://images-api.nasa.gov/search?q=space&media_type=image';

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
    id: response.data.message.split('/').pop().split('.')[0],
    url: response.data.message,
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
  const items = response.data.collection.items;
  const item = items[Math.floor(Math.random() * items.length)];
  return {
    id: item.data[0].nasa_id,
    title: item.data[0].title,
    description: item.data[0].description,
    url: item.links[0].href,
    type: 'space'
  };
};
