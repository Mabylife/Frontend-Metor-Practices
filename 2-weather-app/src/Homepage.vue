<script setup>
import SiteLogo from './components/SiteLogo.vue'
import UnitsDropdown from './components/Units-dropdown.vue'
import SiteTitle from './components/Site-title.vue'
import SearchBar from './components/Search-bar.vue'
import OverviewDashboard from './components/Overview-dashboard.vue'
import DailyForecast from './components/Daily-forecast.vue'
import HourlyForecast from './components/Hourly-forecast..vue'

import { useWeatherStore } from './stores/data'
import { onMounted } from 'vue'

const store = useWeatherStore()

onMounted(async () => {
  store.loading = true
  await store.getCurrentData()
  await store.getDailyData()
  store.loading = false
})
</script>

<template>
  <div class="container">
    <div class="top-container">
      <SiteLogo />
      <UnitsDropdown />
    </div>
    <SiteTitle />
    <div class="main-container">
      <SearchBar />
      <div class="main-bottom-container">
        <div class="left-container">
          <OverviewDashboard />
          <DailyForecast />
        </div>
        <HourlyForecast />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  padding: var(--spacing-600, 3rem) var(--spacing-1400, 7rem) var(--spacing-1000, 5rem)
    var(--spacing-1400, 7rem);
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-800, 4rem);
  background: var(--colors-neutral-900, #02012c);
}

.top-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-height: 2.5rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-600, 3rem);
  align-self: stretch;
}

.main-bottom-container {
  display: flex;
  align-items: stretch;
  gap: 2rem;
  align-self: stretch;
  justify-content: center;
}

.left-container {
  display: flex;
  width: 50rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-600, 3rem);
}

@media (max-width: 1440px) {
  .container {
    display: flex;
    width: 100%;
    padding: var(--spacing-300, 1.5rem) var(--spacing-300, 1.5rem) var(--spacing-1000, 5rem)
      var(--spacing-300, 1.5rem);
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-600, 3rem);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-400, 2rem);
    align-self: stretch;
  }

  .main-bottom-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    align-self: stretch;
  }

  .left-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-400, 2rem);
    align-self: stretch;
  }
}

@media (max-width: 414px) {
  .container {
    display: flex;
    width: 100%;
    padding: var(--spacing-200, 1rem) var(--spacing-200, 1rem) var(--spacing-600, 3rem)
      var(--spacing-200, 1rem);
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-600, 3rem);
  }

  .top-container {
    max-height: 2.0625rem;
  }
}
</style>
