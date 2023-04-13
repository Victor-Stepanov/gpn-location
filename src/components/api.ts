import { TCurrent, TLocation } from '../types';
import { baseUrl, TOKEN } from '../utils/const';

class Api {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  private parseResponse<T>(responce: Response): Promise<T> {
    return responce.ok
      ? responce.json()
      : Promise.reject(`Ошибка: ${responce.status}`);
  }
  getCurrentCoordinates(): Promise<TLocation> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          resolve({
            latitude,
            longitude,
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  async getCurrentLocation() {
    const { latitude, longitude } = await this.getCurrentCoordinates();
    const responce = await fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + TOKEN,
      },
      body: JSON.stringify({
        lat: latitude,
        lon: longitude,
      }),
    });
    return this.parseResponse<TCurrent>(responce);
  }
}

export default new Api(baseUrl);
