<script setup>
function refreshPage() {
  location.reload()
}
</script>

<template>
  <div class="SiteLogo-container" @click="refreshPage()">
    <img src="/assets/images/logo.svg" alt="site logo" />
  </div>
</template>

<style scoped>
.Sitelogo-container {
  height: 100%;
  width: max-content;
}
img {
  height: 100%;
  width: auto;
}

@media (max-width: 1440px) {
  .Sitelogo-container,
  img {
    height: 2.6875rem;
  }
}

@media (max-width: 414px) {
  .Sitelogo-container,
  img {
    height: 2.0625rem;
  }
}
</style>
