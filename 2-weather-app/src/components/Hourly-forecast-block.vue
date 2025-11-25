<script setup></script>

<template>
  <div class="hourlyForecastBlock-container">
    <img class="icon" src="/assets/images/icon-snow.webp" alt="weather indicator" />
    <h5>3 PM</h5>
    <p>20°</p>
  </div>
</template>

<style scoped>
.hourlyForecastBlock-container {
  display: flex;
  padding: var(--spacing-125, 0.625rem) var(--spacing-200, 1rem) var(--spacing-125, 0.625rem)
    var(--spacing-150, 0.75rem);
  align-items: center;
  gap: var(--spacing-100, 0.5rem);
  align-self: stretch;

  border-radius: var(--corner-radius-8, 0.5rem);
  border: 1px solid var(--colors-neutral-600, #3c3b5e);
  background: var(--colors-neutral-700, #302f4a);
}

.icon {
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
}

h5 {
  flex: 1 0 0;

  color: var(--colors-neutral-0, #fff);

  /* text-preset-5 (Medium) */
  font-family: 'DM Sans';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.5rem */
}

p {
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
