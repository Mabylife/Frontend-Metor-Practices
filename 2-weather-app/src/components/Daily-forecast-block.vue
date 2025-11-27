<script setup>
import { useWeatherStore } from '@/stores/data'
const store = useWeatherStore()

const props = defineProps({
  place: {
    type: Number,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div v-if="isLoading" class="dailyForecastBlock-container">
    <h6 class="loading">-</h6>
    <div class="icon"></div>
    <div class="stats">
      <p class="loading">-</p>
      <p class="loading">-</p>
    </div>
  </div>
  <div v-if="!isLoading && store.dailyData.daily" class="dailyForecastBlock-container">
    <h6>{{ store.weekDayOrder[place] }}</h6>
    <img
      :src="store.code2icon(store.dailyData.daily.weather_code[place])"
      class="icon"
      alt="weather indicator"
    />
    <div class="stats">
      <p>{{ Math.round(store.dailyData.daily.temperature_2m_min[place]) }}</p>
      <p>{{ Math.round(store.dailyData.daily.temperature_2m_max[place]) }}</p>
    </div>
  </div>
</template>

<style scoped>
.dailyForecastBlock-container {
  display: flex;
  padding: var(--spacing-200, 1rem) var(--spacing-125, 0.625rem);
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-200, 1rem);
  flex: 1 0 0;

  height: max-content;
  width: max-content;

  border-radius: var(--corner-radius-12, 0.75rem);
  border: 1px solid var(--colors-neutral-600, #3c3b5e);
  background: var(--colors-neutral-800, #262540);
}

h6 {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-6 */
  font-family: 'DM Sans';
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.35rem */
}

.icon {
  display: flex;
  width: 3.75rem;
  height: 3.75rem;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
}

p {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-7 */
  font-family: 'DM Sans';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.2rem */
}

.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.loading {
  color: transparent;
}

@media (max-width: 414px) {
  .dailyForecastBlock-container {
    flex: 0 0 calc(33.3% - 0.66rem);
  }
}
</style>
