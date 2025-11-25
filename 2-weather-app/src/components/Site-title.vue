<script setup></script>

<template>
  <div class="siteTitle-container">
    <h1>How's the sky looking today?</h1>
  </div>
</template>

<style scoped>
.siteTitle-container {
  width: max-content;
  height: auto;
}

h1 {
  color: var(--colors-neutral-0, #fff);
  text-align: center;

  /* text-preset-2 */
  font-family: 'Bricolage Grotesque';
  font-size: 3.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 3.9rem */
}

@media (max-width: 1440px) {
  .siteTitle-container {
    width: 100%;
    max-width: 30.125rem;
  }

  h1 {
    color: var(--colors-neutral-0, #fff);
    text-align: center;

    /* text-preset-2 */
    font-family: 'Bricolage Grotesque';
    font-size: 3.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 3.9rem */
  }
}
</style>
