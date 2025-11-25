<script setup></script>

<template>
  <div class="units-dropdown-container">
    <button>
      <img src="/assets/images/icon-units.svg" alt="setting icon" />
      <span>Units</span>
    </button>
  </div>
</template>

<style scoped>
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
</style>
