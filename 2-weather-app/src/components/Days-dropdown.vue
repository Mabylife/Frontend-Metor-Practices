<script setup>
import { computed, ref } from 'vue'
import { useWeatherStore } from '@/stores/data'
const store = useWeatherStore()

const isOpen = ref(false)

function toggleIsOpen() {
  isOpen.value = !isOpen.value
}

function handleSelectDay(i) {
  store.selectedWeekdayNum = i
  isOpen.value = false
}

const chivronClass = computed(() => {
  if (isOpen.value) {
    return 'upsideDown'
  } else {
    return ''
  }
})
</script>

<template>
  <div class="daysDropdown-container">
    <button v-if="!store.loading" @click="toggleIsOpen">
      <span>{{ store.StaticWeekDayOrderLong[store.selectedWeekdayNum] }}</span>
      <img class="chivron" :class="chivronClass" src="/assets/images/icon-dropdown.svg" alt="" />
    </button>
    <button v-if="store.loading">
      <span>–</span>
      <img :class="chivronClass" src="/assets/images/icon-dropdown.svg" alt="" />
    </button>
    <div class="dropdown-container" v-if="isOpen">
      <button @click="handleSelectDay(i - 1)" class="option" v-for="i in 7">
        {{ store.StaticWeekDayOrderLong[i - 1] }}
      </button>
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

.daysDropdown-container {
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  align-items: flex-end;
  max-height: 2.3125rem;
  max-width: 7.5rem;
}

button {
  cursor: pointer;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  border: none;
  outline: none;

  border-radius: 0.5rem;
  background: var(--colors-neutral-600, #3c3b5e);
}

span {
  color: var(--colors-neutral-0, #fff);
  text-align: center;
  font-family: 'DM Sans';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.dropdown-container {
  z-index: 10;

  display: flex;
  width: 13.375rem;
  padding: var(--spacing-100, 0.5rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-050, 0.25rem);

  border-radius: var(--corner-radius-12, 0.75rem);
  border: 1px solid var(--colors-neutral-600, #3c3b5e);
  background: var(--colors-neutral-800, #262540);
  box-shadow: 0 8px 16px 0 rgba(2, 1, 44, 0.32);
}

.option {
  display: flex;
  width: 12.375rem;
  padding: var(--spacing-125, 0.625rem) var(--spacing-100, 0.5rem);
  align-items: center;
  gap: var(--spacing-125, 0.625rem);

  border-radius: var(--corner-radius-8, 0.5rem);
  background-color: transparent;

  flex: 1 0 0;

  color: var(--colors-neutral-0, #fff);

  /* text-preset-7 */
  font-family: 'DM Sans';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.2rem */

  justify-content: flex-start;
}

.option:hover {
  border-radius: var(--corner-radius-8, 0.5rem);
  background: var(--colors-neutral-700, #302f4a);
}
</style>
