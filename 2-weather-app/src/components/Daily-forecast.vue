<script setup>
import DailyForecastBlock from './Daily-forecast-block.vue'
import { useWeatherStore } from '@/stores/data'

const store = useWeatherStore()
</script>

<template>
  <div class="dailyForecast-container">
    <h5>Daily forecast</h5>
    <div class="blocks-container">
      <DailyForecastBlock :is-loading="store.loading" :place="0" />
      <DailyForecastBlock :is-loading="store.loading" :place="1" />
      <DailyForecastBlock :is-loading="store.loading" :place="2" />
      <DailyForecastBlock :is-loading="store.loading" :place="3" />
      <DailyForecastBlock :is-loading="store.loading" :place="4" />
      <DailyForecastBlock :is-loading="store.loading" :place="5" />
      <DailyForecastBlock :is-loading="store.loading" :place="6" />
    </div>
  </div>
</template>

<style scoped>
.dailyForecast-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-250, 1.25rem);
  align-self: stretch;
}

.blocks-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-200, 1rem);
  align-self: stretch;
}

h5 {
  color: var(--colors-neutral-0, #fff);

  /* text-preset-5 */
  font-family: 'DM Sans';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 1.5rem */
}

.blocks-container {
  flex-wrap: wrap;
}
</style>
