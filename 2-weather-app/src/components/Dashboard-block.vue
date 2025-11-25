<script setup></script>

<template>
  <div class="DashBoardBlock-container">
    <H6>Property</H6>
    <h3>0 unit</h3>
  </div>
</template>

<style scoped>
.DashBoardBlock-container {
  width: max-content;
  height: max-content;

  display: flex;
  padding: var(--spacing-250, 1.25rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-300, 1.5rem);
  flex: 1 0 0;

  border-radius: var(--corner-radius-12, 0.75rem);
  border: 1px solid var(--colors-neutral-600, #3c3b5e);
  background: var(--colors-neutral-800, #262540);
}

h6 {
  color: var(--colors-neutral-200, #d4d3d9);
  text-align: center;

  /* text-preset-6 */
  font-family: 'DM Sans';
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.35rem */
}

h3 {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-3 */
  font-family: 'DM Sans';
  font-size: 2rem;
  font-style: normal;
  font-weight: 300;
  line-height: 100%; /* 2rem */
}
</style>
