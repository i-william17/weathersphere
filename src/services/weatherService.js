// const API_KEY = '9d007a31eaad681fb5d188294ab8a859'
// const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// export async function fetchWeatherByCity(city) {
//   try {
//     const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
//     if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
//     return await response.json()
//   } catch (err) {
//     console.error('Fetch error:', err.message)
//     throw err
//   }
// }

const API_KEY = '9d007a31eaad681fb5d188294ab8a859';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeatherByCity(city) {
  if (!city || typeof city !== 'string' || !city.trim()) {
    throw new Error("City name is required");
  }

  const trimmedCity = city.trim();
  const url = `${BASE_URL}?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`;
  console.log("Fetching URL:", url);

  const res = await fetch(url);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Error ${res.status}: ${res.statusText}`);
  }

  return await res.json();
}


