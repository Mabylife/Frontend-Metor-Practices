<script setup>
import SiteLogo from './components/SiteLogo.vue'
import UnitsDropdown from './components/Units-dropdown.vue'
import SiteTitle from './components/Site-title.vue'
import SearchBar from './components/Search-bar.vue'
import OverviewDashboard from './components/Overview-dashboard.vue'
import DailyForecast from './components/Daily-forecast.vue'
import HourlyForecast from './components/Hourly-forecast..vue'
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
  align-items: center;
  gap: 2rem;
  align-self: stretch;
  justify-content: center;
}

.left-container {
  display: flex;
  width: 50rem;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-600, 3rem);
}
</style>
