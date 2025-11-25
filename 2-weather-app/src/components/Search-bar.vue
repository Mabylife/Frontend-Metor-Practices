<script setup></script>

<template>
  <div class="searchBar-container">
    <div class="input-container">
      <img src="/assets/images/icon-search.svg" alt="search icon" />
      <input
        type="text"
        name="Search for place"
        id="searchPlace"
        placeholder="Search for a place..."
      />
    </div>
    <button class="submit" type="submit">Search</button>
  </div>
</template>

<style scoped>
.searchBar-container {
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

img {
  height: 100%;
  width: auto;
}

input {
  color: var(--colors-neutral-200, #d4d3d9);

  background: none;
  border: none;
  outline: none;

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
}

@media (max-width: 1440px) {
  .searchBar-container {
    width: 100%;
  }
  .input-container {
    flex-grow: 1;
    width: auto;
  }

  .input-container > input {
    width: 100%;
  }
}
</style>
