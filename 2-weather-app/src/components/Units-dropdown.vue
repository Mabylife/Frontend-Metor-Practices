<script setup>
import { ref, computed } from 'vue'
import { useWeatherStore } from '@/stores/data'

const store = useWeatherStore()
const isOpen = ref(false)

function toggleIsOpen() {
  isOpen.value = !isOpen.value
}

const chivronClass = computed(() => {
  if (isOpen.value) {
    return 'upsideDown'
  } else {
    return ''
  }
})

async function handleChangeUnit(type) {
  let isReload = true
  if (type === 'c' && store.selectedUDegree !== 'celsius') {
    store.selectedUDegree = 'celsius'
  } else if (type === 'f' && store.selectedUDegree !== 'fahrenheit') {
    store.selectedUDegree = 'fahrenheit'
  } else if (type === 'kmh' && store.selectedUDegree !== 'kmh') {
    store.selectedUSpeed = 'kmh'
  } else if (type === 'mph' && store.selectedUDegree !== 'mph') {
    store.selectedUSpeed = 'mph'
  } else if (type === 'mm' && store.selectedUDegree !== 'mm') {
    store.selectedULength = 'mm'
  } else if (type === 'inch' && store.selectedUDegree !== 'inch') {
    store.selectedULength = 'inch'
  } else {
    isReload = false
  }
  if (isReload) {
    store.loading = true
    await store.getCurrentData()
    await store.getDailyData()
    await store.getHourlyData()
    store.loading = false
  }
}

async function changeToMetric() {
  store.selectedUDegree = 'celsius'
  store.selectedULength = 'mm'
  store.selectedUSpeed = 'kmh'
  store.loading = true
  await store.getCurrentData()
  await store.getDailyData()
  await store.getHourlyData()
  store.loading = false
}
async function changeToImperial() {
  store.selectedUDegree = 'fahrenheit'
  store.selectedULength = 'inch'
  store.selectedUSpeed = 'mph'
  store.loading = true
  await store.getCurrentData()
  await store.getDailyData()
  await store.getHourlyData()
  store.loading = false
}
</script>

<template>
  <div class="units-dropdown-container">
    <button class="toggleBtn" @click="toggleIsOpen()">
      <img src="/assets/images/icon-units.svg" alt="setting icon" />
      <span>Units</span>
      <img class="chivron" :class="chivronClass" src="/assets/images/icon-dropdown.svg" alt="" />
    </button>
    <div class="dropdownList" v-if="isOpen">
      <button v-if="store.metricCount >= 2" class="option" @click="changeToImperial()">
        <span>Switch to Imperial</span>
      </button>
      <button v-if="store.metricCount < 2" class="option" @click="changeToMetric()">
        <span>Switch to Metric</span>
      </button>
      <div class="optionsGroup">
        <span class="label">Temperature</span>
        <button class="option" @click="handleChangeUnit('c')">
          <span>Celsius (°C)</span>
          <img
            v-if="store.selectedUDegree === 'celsius'"
            src="/assets/images/icon-checkmark.svg"
            alt=""
          />
        </button>
        <button class="option" @click="handleChangeUnit('f')">
          <span>Fahrenheit (°F)</span>
          <img
            v-if="store.selectedUDegree === 'fahrenheit'"
            src="/assets/images/icon-checkmark.svg"
            alt=""
          />
        </button>
      </div>
      <div class="separator"></div>
      <div class="optionsGroup">
        <span class="label">Wind Speed</span>
        <button class="option" @click="handleChangeUnit('kmh')">
          <span>km/h</span>
          <img
            v-if="store.selectedUSpeed === 'kmh'"
            src="/assets/images/icon-checkmark.svg"
            alt=""
          />
        </button>
        <button class="option" @click="handleChangeUnit('mph')">
          <span>mph</span>
          <img
            v-if="store.selectedUSpeed === 'mph'"
            src="/assets/images/icon-checkmark.svg"
            alt=""
          />
        </button>
      </div>
      <div class="separator"></div>
      <div class="optionsGroup">
        <span class="label">Precipitation</span>
        <button class="option" @click="handleChangeUnit('mm')">
          <span>Millimeters (mm)</span>
          <img
            v-if="store.selectedULength === 'mm'"
            src="/assets/images/icon-checkmark.svg"
            alt=""
          />
        </button>
        <button class="option" @click="handleChangeUnit('inch')">
          <span>Inches (in)</span>
          <img
            v-if="store.selectedULength === 'inch'"
            src="/assets/images/icon-checkmark.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chivron {
  transition: 0.2s ease-in;
}

.upsideDown {
  transform: rotate(180deg);
}

.toggleBtn {
  cursor: pointer;
}
.dropdownList {
  z-index: 100;

  display: flex;
  width: 13.375rem;
  padding: var(--spacing-075, 0.375rem) var(--spacing-100, 0.5rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-050, 0.25rem);

  border-radius: var(--corner-radius-12, 0.75rem);
  border: 1px solid var(--colors-neutral-600, #3c3b5e);
  background: var(--colors-neutral-800, #262540);
  box-shadow: 0 8px 16px 0 rgba(2, 1, 44, 0.32);
}

.optionsGroup {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-050, 0.25rem);
  align-self: stretch;
}

.option {
  cursor: pointer;
  display: flex;
  width: 12.375rem;
  padding: var(--spacing-125, 0.625rem) var(--spacing-100, 0.5rem);
  align-items: center;
  gap: var(--spacing-125, 0.625rem);
  justify-content: space-between;

  border-radius: var(--corner-radius-8, 0.5rem);

  color: var(--colors-neutral-0, #fff);

  flex: 1 0 0;
}

.option > span {
  /* text-preset-7 */
  font-family: 'DM Sans';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.2rem */
  text-align: left;
  justify-content: flex-start;
}

.separator {
  height: 0.0625rem;
  align-self: stretch;
  background: var(--colors-neutral-600, #3c3b5e);
}

.option:hover {
  background: var(--colors-neutral-700, #302f4a);
}

.label {
  margin-bottom: 0.25rem;
  display: flex;
  padding: var(--spacing-075, 0.375rem) var(--spacing-100, 0.5rem) 0 var(--spacing-100, 0.5rem);
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  color: var(--colors-neutral-300, #acacb7);

  /* text-preset-8 */
  font-family: 'DM Sans';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.05rem */
}

.units-dropdown-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.62rem;
}

button {
  display: flex;
  padding: var(--spacing-150, 0.75rem) var(--spacing-200, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-125, 0.625rem);

  border-radius: 0.5rem;
  background: var(--colors-neutral-800, #262540);

  border: none;
  outline: none;
}

button > span {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-7 */
  font-family: 'DM Sans';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.2rem */
}

@media (max-width: 1440px) {
  .toggleBtn {
    height: 2.6875rem;
  }
}

@media (max-width: 414px) {
  .toggleBtn {
    max-height: 2.0625rem;
  }

  button {
    display: flex;
    padding: var(--spacing-100, 0.5rem) var(--spacing-125, 0.625rem);
    justify-content: center;
    align-items: center;
    gap: var(--spacing-075, 0.375rem);

    border-radius: var(--corner-radius-6, 0.375rem);
    background: var(--colors-neutral-800, #262540);
  }

  button > span {
    color: var(--colors-neutral-0, #fff);
    text-align: center;
    font-family: 'DM Sans';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 1.05rem */
  }
}
</style>
