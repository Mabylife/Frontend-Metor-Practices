<script setup>
import DaysDropdown from './Days-dropdown.vue'
import HourlyForecastBlock from './Hourly-forecast-block.vue'
</script>

<template>
  <div class="hourlyForecast-container">
    <div class="top">
      <h5>Hourly forcast</h5>
      <DaysDropdown />
    </div>

    <HourlyForecastBlock />
    <HourlyForecastBlock />
    <HourlyForecastBlock />
    <HourlyForecastBlock />
    <HourlyForecastBlock />
    <HourlyForecastBlock />
    <HourlyForecastBlock />
    <HourlyForecastBlock />
  </div>
</template>

<style scoped>
.hourlyForecast-container {
  display: flex;
  width: 24rem;
  padding: var(--spacing-300, 1.5rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-200, 1rem);

  border-radius: var(--corner-radius-20, 1.25rem);
  background: var(--colors-neutral-800, #262540);
}

.top {
  display: flex;
  justify-content: space-between;
  height: max-content;
  align-items: center;
  width: 100%;
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

@media (max-width: 1440px) {
  .hourlyForecast-container {
    width: 100%;
  }
}
</style>
