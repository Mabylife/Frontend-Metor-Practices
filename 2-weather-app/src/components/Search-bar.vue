<script setup>
import { ref } from 'vue'
import { useWeatherStore } from '@/stores/data'

const store = useWeatherStore()

const hasInput = ref(false)
const inputValue = ref('')

const searchResults = ref([])
const comfrimedNoResult = ref(false)
const isSearching = ref(false)

function checkInput() {
  if (inputValue.value.length > 1) {
    hasInput.value = true
    searchResults.value = []
    displaySearchResult()
  } else {
    hasInput.value = false
    searchResults.value = []
  }
}

function parseName(result) {
  if (!result.country) {
    return result.name
  } else if (result.name === result.country) {
    return result.country
  } else {
    return result.name + ', ' + result.country
  }
}

async function handleSelect(result) {
  store.latitude = result.latitude
  store.longitude = result.longitude
  store.displayName = parseName(result)
  store.timezone = result.timezone

  // apply names to store.country and store.city

  searchResults.value = []
  inputValue.value = ''
  checkInput()

  store.loading = true
  store.addToast('info', 'Loading weather data', 'loading')
  await store.getCurrentData()
  await store.getDailyData()
  await store.getHourlyData()
  store.removeSpecialToast('loading')
  if (!store.error) {
    store.addToast('success', 'Data done loading')
  }
  store.loading = false
}

let abortController = null

async function displaySearchResult() {
  if (abortController) {
    abortController.abort()
  }

  abortController = new AbortController()

  isSearching.value = true
  comfrimedNoResult.value = false

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue.value}&count=5&language=en&format=json`,
      { signal: abortController.signal },
    )
    if (!response.ok) {
      throw new Error('geocoding api error')
    }
    const data = await response.json()
    if (data.results && data.results.length > 0) {
      searchResults.value = data.results
      comfrimedNoResult.value = false
    } else {
      searchResults.value = []
      comfrimedNoResult.value = true
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      return
    }
    searchResults.value = []
    console.error(error)
    store.addToast('error', 'AbortError')
  }
  isSearching.value = false
}

const inputClass = ref('')
</script>

<template>
  <div class="searchBar-container">
    <div class="search-container">
      <div class="input-container" :class="inputClass">
        <img src="/assets/images/icon-search.svg" alt="search icon" />
        <input
          @focus="inputClass = 'focus'"
          @focusout="inputClass = ''"
          @keyup.enter="checkInput()"
          @input="checkInput()"
          v-model="inputValue"
          type="text"
          name="Search for place"
          id="searchPlace"
          placeholder="Search for a place..."
        />
      </div>
      <div v-if="hasInput" class="searchDropdown-container">
        <!-- loading indicator -->
        <button v-if="hasInput && searchResults.length < 1 && isSearching" class="option loading">
          <img class="spinner" src="/assets/images/icon-loading.svg" alt="loading" />
          Search in progress
        </button>

        <!-- no result indicator -->
        <button v-if="comfrimedNoResult && !isSearching" class="option">
          <img src="/assets/images/icon-error.svg" alt="loading" />
          No results found
        </button>

        <button
          v-if="hasInput && searchResults.length > 0"
          v-for="(result, index) in searchResults"
          @click="handleSelect(result)"
          :key="result.id || index"
          class="option"
        >
          {{ parseName(result) }}
        </button>
      </div>
    </div>
    <button class="submit" type="submit" @click="checkInput()">Search</button>
  </div>
</template>

<style scoped>
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.search-container {
  display: flex;
  flex-direction: column;
}

.searchDropdown-container {
  position: absolute;
  top: 4.12rem;
  z-index: 10 !important;

  display: flex;
  width: 100%;
  padding: var(--spacing-100, 0.5rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-050, 0.25rem);

  border-radius: var(--corner-radius-12, 0.75rem);
  border: 1px solid var(--colors-neutral-700, #302f4a);
  background: var(--colors-neutral-800, #262540);
}

.option {
  display: flex;
  padding: var(--spacing-125, 0.625rem) var(--spacing-100, 0.5rem);
  align-items: center;
  gap: var(--spacing-125, 0.625rem);
  align-self: stretch;
  width: 100%;

  border-radius: var(--corner-radius-8, 0.5rem);
  background-color: transparent;
  border: 1px solid transparent;

  color: #fff;

  /* text-preset-7 */
  font-family: 'DM Sans';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.2rem */
}

.option:hover {
  display: flex;
  padding: var(--spacing-125, 0.625rem) var(--spacing-100, 0.5rem);
  align-items: center;
  gap: var(--spacing-125, 0.625rem);
  align-self: stretch;

  border-radius: var(--corner-radius-8, 0.5rem);
  border: 1px solid var(--colors-neutral-600, #3c3b5e);
  background: var(--colors-neutral-700, #302f4a);
}

.searchBar-container {
  position: relative;
  display: flex;
  width: 41rem;
  align-items: flex-start;
  gap: var(--spacing-200, 1rem);
}

.input-container {
  display: flex;
  width: 32.875rem;
  padding: var(--spacing-200, 1rem) var(--spacing-300, 1.5rem);
  align-items: center;
  gap: var(--spacing-200, 1rem);
  flex-shrink: 0;

  border-radius: var(--corner-radius-12, 0.75rem);
  background: var(--colors-neutral-800, #262540);
}

/* It looks so bad, i'm sorry, designer */
/* .input-container.focus {
  border-radius: var(--corner-radius-12, 0.75rem);
  background: var(--colors-neutral-800, #262540);
  box-shadow:
    0 0 0 3px var(--colors-neutral-900, #02012c),
    0 0 0 5px var(--colors-neutral-0, #fff);
} */

img {
  height: 100%;
  width: auto;
}

input {
  color: var(--colors-neutral-200, #d4d3d9);

  /* Im sorry desinger but this can't be pointer cursor for real */
  cursor: text;

  background: none;
  border: none;
  outline: none;

  width: 100%;

  /* text-preset-5 (Medium) */
  font-family: 'DM Sans';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.5rem */
}

button.submit {
  display: flex;
  padding: var(--spacing-200, 1rem) var(--spacing-300, 1.5rem);
  align-items: center;
  gap: var(--spacing-200, 1rem);

  border: none;
  outline: none;
  box-shadow: none;

  border-radius: var(--corner-radius-12, 0.75rem);
  background: var(--colors-blue-500, #4658d9);

  /* text */
  color: var(--colors-neutral-0, #fff);

  /* text-preset-5 (Medium) */
  font-family: 'DM Sans';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.5rem */

  cursor: pointer;
}

button.submit:hover {
  background: var(--colors-blue-700, #2b1b9c);
}

@media (max-width: 1440px) {
  .searchBar-container {
    width: 100%;
    flex-wrap: wrap;
  }
  .input-container {
    flex-grow: 1;
    width: 100%;
  }

  .input-container > input {
    width: 100%;
  }

  .search-container {
    flex-grow: 1;
  }
}

@media (max-width: 560px) {
  button.submit {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
  .search-container {
    width: 100%;
  }
  .input-container {
    width: 100%;
  }
}

@media (max-width: 414px) {
  .input-container {
    width: 100%;
  }
}
</style>
