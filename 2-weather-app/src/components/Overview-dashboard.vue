<script setup>
import DashboardBlock from './Dashboard-block.vue'
</script>

<template>
  <div class="overviewDashboard-container">
    <div class="quickView-container">
      <div class="left">
        <h4>City, Country</h4>
        <h6>Monday, March 10, 2025</h6>
      </div>
      <div class="right">
        <img src="/assets/images/icon-snow.webp" class="icon" alt="weather indicator" />
        <h1>20°</h1>
      </div>
    </div>
    <div class="blocks-container">
      <DashboardBlock />
      <DashboardBlock />
      <DashboardBlock />
      <DashboardBlock />
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
}
</style>
