import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherData', () => {
  const searchingCity = ref('Taipei')
  const country = ref('')
  const city = ref('')
  const latitude = ref(24.1469)
  const longitude = ref(120.6839)

  // 'u' stands for degree
  const uDegree = ref('')
  const uSpeed = ref('')
  const uLength = ref('')

  const temperature = ref(null)
  const apparent = ref(null)
  const humidity = ref(null)
  const wind = ref(null)
  const precipitation = ref(null)

  async function getCoordinatesByCity() {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchingCity.value}&count=1&language=en&format=json`,
      )
      if (!response.ok) {
        throw new Error('geocoding api error')
      }
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        latitude.value = data.results[0].latitude
        longitude.value = data.results[0].longitude
        city.value = data.results[0].name
        country.value = data.results[0].country
      }
    } catch (error) {}
  }

  async function getCurrentData() {
    await getCoordinatesByCity()
    await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&models=best_match&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature`,
    )
      .then((response) => {
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`API error`)
        }
        // Parse the response body as JSON
        return response.json()
      })
      .then((data) => {
        temperature.value = data.current.temperature_2m
        apparent.value = data.current.apparent_temperature
        humidity.value = data.current.relative_humidity_2m
        wind.value = data.current.wind_speed_10m
        precipitation.value = data.current.precipitation

        uDegree.value = data.current_units.temperature_2m
        uSpeed.value = data.current_units.wind_speed_10m
        uLength.value = data.current_units.precipitation
      })
      .catch((error) => {
        // Handle any errors during the fetch operation
        console.error('Error fetching data:', error)
      })
  }

  return {
    getCurrentData,
    temperature,
    apparent,
    humidity,
    wind,
    precipitation,
    uDegree,
    uLength,
    uSpeed,
    city,
    country,
  }
})
