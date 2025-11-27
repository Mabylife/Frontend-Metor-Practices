import { ref, computed, Static } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherData', () => {
  const displayName = ref('Taichung, Taiwan')
  const latitude = ref(24.1469)
  const longitude = ref(120.6839)
  const timezone = ref('Asia/Taipei')
  const dailyData = ref([])
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

  // for API units
  const selectedULength = ref('mm')
  const selectedUSpeed = ref('kmh')
  const selectedUDegree = ref('celsius')

  const metricCount = computed(() => {
    let count = 0
    if (selectedUDegree.value === 'celsius') {
      count++
    }
    if (selectedULength.value === 'mm') {
      count++
    }
    if (selectedUSpeed.value === 'kmh') {
      count++
    }
    return count
  })

  const apiUnit = computed(
    () =>
      `&wind_speed_unit=${selectedUSpeed.value}&temperature_unit=${selectedUDegree.value}&precipitation_unit=${selectedULength.value}`,
  )

  async function getCurrentData() {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature&forecast_days=0${apiUnit.value}`,
      )
      if (!response.ok) {
        throw new Error('current fetch api error')
      }
      const data = await response.json()
      temperature.value = Math.round(data.current.temperature_2m)
      apparent.value = Math.round(data.current.apparent_temperature)
      humidity.value = data.current.relative_humidity_2m
      wind.value = data.current.wind_speed_10m
      precipitation.value = data.current.precipitation

      weatherCode.value = data.current.weather_code

      uDegree.value = data.current_units.temperature_2m
      uSpeed.value = data.current_units.wind_speed_10m
      uLength.value = data.current_units.precipitation
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function getDailyData() {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(timezone.value)}${apiUnit.value}`,
      )
      if (!response.ok) {
        throw new Error('daily fetch api error')
      }
      const data = await response.json()
      dailyData.value = data
    } catch (error) {
      console.log(error)
    }
  }

  const hourlyData = ref([])

  async function getHourlyData() {
    selectedWeekdayNum.value = weekdayNum.value

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&hourly=temperature_2m,weather_code&timezone=${encodeURIComponent(timezone.value)}${apiUnit.value}`,
      )
      if (!response.ok) {
        throw new Error('hourly fetch api error')
      }
      const data = await response.json()
      hourlyData.value = data
    } catch (error) {
      console.log(error)
    }
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

  const StaticWeekDayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const StaticWeekDayOrderLong = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  const now = ref(new Date())
  setInterval(() => {
    now.value = new Date()
  }, 1000)

  const year = computed(() =>
    now.value.toLocaleString('en-US', {
      year: 'numeric',
      timeZone: timezone.value,
    }),
  )

  const month = computed(() =>
    now.value.toLocaleString('en-US', {
      month: '2-digit',
      timeZone: timezone.value,
    }),
  )

  const monthName = computed(() =>
    now.value.toLocaleString('en-US', {
      month: 'long',
      timeZone: timezone.value,
    }),
  )

  const day = computed(() =>
    now.value.toLocaleString('en-US', {
      day: '2-digit',
      timeZone: timezone.value,
    }),
  )

  const weekDay = computed(() =>
    now.value.toLocaleString('en-US', {
      weekday: 'long',
      timeZone: timezone.value,
    }),
  )

  const shortWeekDay = computed(() =>
    now.value.toLocaleString('en-US', {
      weekday: 'short',
      timeZone: timezone.value,
    }),
  )

  const weekdayNum = computed(() => StaticWeekDayOrder.indexOf(shortWeekDay.value))

  const weekDayOrder = computed(() => {
    return [
      ...StaticWeekDayOrder.slice(StaticWeekDayOrder.indexOf(shortWeekDay.value)),
      ...StaticWeekDayOrder.slice(0, StaticWeekDayOrder.indexOf(shortWeekDay.value)),
    ]
  })

  const selectedWeekdayNum = ref(0)

  return {
    metricCount,
    //unit
    selectedUDegree,
    selectedULength,
    selectedUSpeed,

    StaticWeekDayOrderLong,
    selectedWeekdayNum,
    getHourlyData,
    hourlyData,
    StaticWeekDayOrder,
    weekdayNum,
    weekDayOrder,
    year,
    day,
    monthName,
    weekDay,
    shortWeekDay,

    getDailyData,
    dailyData,

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
