export const baseUrl: string =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';

export const TOKEN = '1ad90d50c0f2d8b95e465e2c807c4c82b2a6d0c9';

export const OPTIONS = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token ' + TOKEN,
  },
};

// DOM
const container: Element | null = document.querySelector('.container');
const location: Element | null = container!.querySelector('.location');

export const subElements = {
  adress: location?.querySelector('.adress'),
  latitude: location?.querySelector('.latitude'),
  longitude: location?.querySelector('.longitude'),
  button: container?.querySelector('.button'),
};
