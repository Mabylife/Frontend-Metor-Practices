import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherData', () => {
  const displayName = ref('Taichung, Taiwan')
  const latitude = ref(24.1469)
  const longitude = ref(120.6839)
  const timezone = ref('Asia/Taipei')

  const weatherCode = ref(0)

  // 'u' stands for degree
  const uDegree = ref('')
  const uSpeed = ref('')
  const uLength = ref('')

  const temperature = ref(null)
  const apparent = ref(null)
  const humidity = ref(null)
  const wind = ref(null)
  const precipitation = ref(null)

  const loading = ref(false)

  async function getCurrentData() {
    loading.value = true
    await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature&forecast_days=0`,
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
        temperature.value = Math.round(data.current.temperature_2m)
        apparent.value = Math.round(data.current.apparent_temperature)
        humidity.value = data.current.relative_humidity_2m
        wind.value = data.current.wind_speed_10m
        precipitation.value = data.current.precipitation

        weatherCode.value = data.current.weather_code

        uDegree.value = data.current_units.temperature_2m
        uSpeed.value = data.current_units.wind_speed_10m
        uLength.value = data.current_units.precipitation
      })
      .catch((error) => {
        // Handle any errors during the fetch operation
        console.error('Error fetching data:', error)
      })

    loading.value = false
  }

  function code2icon(code) {
    const iconName = [
      'drizzle', // 51 53 55 56 57
      'fog', // 45 48
      'overcast', // 3
      'partly-cloudy', // 2
      'rain', // 61 63 65 66 67 80 81 82
      'snow', // 71 73 75 77 85 86
      'storm', // 95 96 99
      'sunny', // 0 1
    ]

    let index

    if ([51, 53, 55, 56, 57].includes(code)) {
      index = 0
    }
    if ([45, 48].includes(code)) {
      index = 1
    }
    if ([3].includes(code)) {
      index = 2
    }
    if ([2].includes(code)) {
      index = 3
    }
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
      index = 4
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      index = 5
    }
    if ([95, 96, 99].includes(code)) {
      index = 6
    }
    if ([0, 1].includes(code)) {
      index = 7
    }

    return `/assets/images/icon-${iconName[index]}.webp`
  }

  const year = ref(0)
  const month = ref(0)
  const monthName = ref('')
  const day = ref(0)
  const weekDay = ref('')
  const shortWeekDay = ref('')

  setInterval(() => {
    const now = ref(new Date())

    year.value = now.value.toLocaleString('en-US', {
      year: 'numeric',
      timezone,
    })

    month.value = now.value.toLocaleString('en-US', {
      month: '2-digit',
      timezone,
    })

    monthName.value = now.value.toLocaleString('en-US', {
      month: 'long',
      timezone,
    })

    day.value = now.value.toLocaleString('en-US', {
      day: '2-digit',
      timezone,
    })

    weekDay.value = now.value.toLocaleString('en-US', {
      weekday: 'long',
      timezone,
    })

    shortWeekDay.value = now.value.toLocaleString('en-US', {
      weekday: 'short',
      timezone,
    })
  }, 1000)

  return {
    year,
    day,
    monthName,
    weekDay,
    shortWeekDay,

    timezone,
    weatherCode,
    code2icon,
    loading,
    displayName,
    getCurrentData,
    temperature,
    apparent,
    humidity,
    wind,
    precipitation,
    uDegree,
    uLength,
    uSpeed,
    latitude,
    longitude,
  }
})
