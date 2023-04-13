import Api from './components/api';
import { subElements } from './utils/const';

async function getData() {
  try {
    const { latitude, longitude } = await Api.getCurrentCoordinates();
    const { suggestions } = await Api.getCurrentLocation();
    const adress: string = suggestions[0].value;
    return {
      latitude,
      longitude,
      adress,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

function showData(evt: Event) {
  evt.preventDefault();
  subElements.button!.textContent = 'Определение...';
  getData()
    .then(({ adress, latitude, longitude }) => {
      subElements.adress!.textContent = `Адрес: ${adress}`;
      subElements.latitude!.textContent = `Широта: ${String(latitude)}`;
      subElements.longitude!.textContent = `Долгота: ${String(longitude)}`;
    })
    .catch(err => console.error(err))
    .finally(() => {
      subElements.button!.textContent = 'Где я?';
      subElements.button?.removeEventListener('click', showData);
    });
}

subElements.button?.addEventListener('click', showData);
