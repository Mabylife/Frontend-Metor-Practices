<script setup></script>

<template>
  <div class="daysDropdown-container">
    <button>
      <span>Tuesday</span>
      <img src="/assets/images/icon-dropdown.svg" alt="" />
    </button>
  </div>
</template>

<style scoped>
button {
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
</style>
