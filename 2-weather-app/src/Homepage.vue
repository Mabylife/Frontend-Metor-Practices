<script setup>
import { useWeatherStore } from './stores/data'
import { onMounted } from 'vue'
import Toasts from './components/Toasts.vue'

onMounted(async () => {
  store.loading = true
  store.addToast('info', 'Loading weather data', 'loading')
  await store.getCurrentData()
  await store.getDailyData()
  await store.getHourlyData()
  store.removeSpecialToast('loading')
  store.addToast('success', 'Data done loading')
  store.loading = false
})

import SiteLogo from './components/SiteLogo.vue'
import UnitsDropdown from './components/Units-dropdown.vue'
import SiteTitle from './components/Site-title.vue'
import SearchBar from './components/Search-bar.vue'
import OverviewDashboard from './components/Overview-dashboard.vue'
import DailyForecast from './components/Daily-forecast.vue'
import HourlyForecast from './components/Hourly-forecast..vue'

const store = useWeatherStore()

function refreshPage() {
  location.reload()
}
</script>

<template>
  <div v-if="!store.error" class="container">
    <Toasts />
    <div class="top-container">
      <div style="cursor: pointer">
        <SiteLogo />
      </div>
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
  <div v-if="store.error" class="container">
    <div class="top-container">
      <SiteLogo />
      <UnitsDropdown />
    </div>

    <div class="error-container">
      <img src="/assets/images/icon-error.svg" alt="Error" />
      <h2>Something went wrong</h2>
      <h5>We couldn’t connect to the server (API error). Please try again in a few moments.</h5>
      <button @click="refreshPage()">
        <img src="/assets/images/icon-retry.svg" alt="" />
        <span>Retry</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  padding-top: var(--spacing-500, 2.5rem);
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-300, 1.5rem);
  align-self: stretch;
}

.error-container img {
  width: 2.625rem;
  height: 3.125rem;
}

.error-container h2 {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-2 */
  font-family: 'Bricolage Grotesque';
  font-size: 3.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 3.9rem */
}
.error-container h5 {
  color: var(--colors-neutral-200, #d4d3d9);
  text-align: center;

  /* text-preset-5 (Medium) */
  font-family: 'DM Sans';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.5rem */
}

.error-container button {
  display: flex;
  padding: var(--spacing-150, 0.75rem) var(--spacing-200, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-125, 0.625rem);

  border-radius: 0.5rem;
  background: #262540;

  border: none;

  cursor: pointer;
}

.error-container button span {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-7 */
  font-family: 'DM Sans';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.2rem */
}

.error-container button img {
  height: 1rem;
  width: 1rem;
}

.container {
  position: relative;

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
  .top-container {
    height: 2.6875rem;
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
    height: 2.0625rem;
    max-height: 2.0625rem;
  }
}
</style>
