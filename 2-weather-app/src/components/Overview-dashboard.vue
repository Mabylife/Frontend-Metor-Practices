<script setup>
import { onMounted, ref } from 'vue'
import DashboardBlock from './Dashboard-block.vue'
import { useWeatherStore } from '@/stores/data'

const store = useWeatherStore()

const loading = ref(true)

onMounted(async () => {
  await store.getCurrentData()
  loading.value = false
})

const now = ref()
now.value = new Date()
const year = now.value.getFullYear()
const month = now.value.getMonth() + 1 // Add 1 because getMonth() is 0-indexed
const day = now.value.getDate()

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const weekDay = days[now.value.getDay()]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const monthName = months[now.value.getMonth()]
</script>

<template>
  <div class="overviewDashboard-container">
    <div class="quickView-container">
      <div class="left">
        <h4 v-if="loading">Loading...</h4>
        <h4 v-if="!loading">
          {{ store.city }}<span v-if="store.country">, </span>{{ store.country }}
        </h4>
        <h6>{{ weekDay }}, {{ monthName }} {{ day }}, {{ year }}</h6>
      </div>
      <div class="right">
        <img src="/assets/images/icon-snow.webp" class="icon" alt="weather indicator" />
        <h1 v-if="loading">- °</h1>
        <h1 v-if="!loading">{{ store.temperature }}°</h1>
      </div>
    </div>
    <div class="blocks-container">
      <DashboardBlock :isLoading="loading" :property="'Feels Like'" />
      <DashboardBlock :isLoading="loading" :property="'Humidity'" />
      <DashboardBlock :isLoading="loading" :property="'Wind'" />
      <DashboardBlock :isLoading="loading" :property="'Precipitation'" />
    </div>
  </div>
</template>

<style scoped>
.overviewDashboard-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-400, 2rem);
  align-self: stretch;
}

.blocks-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-300, 1.5rem);
  align-self: stretch;
}

h4 {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-4 */
  font-family: 'DM Sans';
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 2.1rem */
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

h1 {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-1 */
  font-family: 'DM Sans';
  font-size: 6rem;
  font-style: italic;
  font-weight: 600;
  line-height: 100%; /* 6rem */
  letter-spacing: -0.12rem;
}

.icon {
  width: 7.5rem;
  height: 7.5rem;
  flex-shrink: 0;
}

.quickView-container {
  width: 50rem;
  height: 17.875rem;
  background-image: url(/assets/images/bg-today-large.svg);

  background-size: cover;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 1.25rem;
  border: none;

  display: flex;
  align-items: center;
  padding: 1.5rem;
  justify-content: space-between;
  flex-wrap: wrap;
}

.quickView-container > .left {
  display: flex;
  height: 4.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1 0 0;
}

.quickView-container > .right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.25rem;
  width: max-content;

  /* italic font fix */
  padding-right: 1rem;
}

@media (max-width: 1440px) {
  .overviewDashboard-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-250, 1.25rem);
    align-self: stretch;
  }

  .quickView-container {
    width: 100%;
  }

  .blocks-container {
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .quickView-container {
    flex-direction: column;
    padding: 2.56rem 0 2.56rem 0;
    justify-content: center;
    align-items: center;
  }
  .left > h4,
  .left > h6 {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 414px) {
  .quickView-container {
    background-image: url(/assets/images/bg-today-small.svg);
  }
  .right h1 {
    transform: translateX(-1.5rem);
  }
  .blocks-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 1rem var(--spacing-200, 1rem);
    align-self: stretch;
    flex-wrap: wrap;
  }
}
</style>
