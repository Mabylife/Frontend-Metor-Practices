<script setup>
import { ref } from 'vue'
import Toast from './Toast.vue'
import { useWeatherStore } from '@/stores/data'
const store = useWeatherStore()
</script>
<template>
  <div class="toasts-container">
    <Toast
      v-for="toast in store.toasts"
      :type="toast.type"
      :content="toast.content"
      :animating="toast.animating"
    />
  </div>
</template>
<style scoped>
.toasts-container {
  overflow: hidden;
  position: absolute;
  top: 7rem;
  right: 7rem;

  height: max-content;
  width: 13.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.5rem;
}
</style>
