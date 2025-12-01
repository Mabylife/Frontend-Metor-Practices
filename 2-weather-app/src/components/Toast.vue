<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  animating: {
    type: Boolean,
    require: false,
  },
})

const animatingClass = computed(() => {
  if (props.animating === true) {
    return 'animating'
  }
})

const colorBlock = computed(() => {
  if (props.type === 'error') {
    return 'var(--danger)'
  }
  if (props.type === 'info') {
    return 'var(--info)'
  }
  if (props.type === 'warning') {
    return 'var(--warning)'
  }
  if (props.type === 'success') {
    return 'var(--success)'
  }
})
</script>
<template>
  <div class="toast-container" :class="animatingClass">
    <div class="colorBlock"></div>
    <span>{{ props.content }}</span>
  </div>
</template>
<style scoped>
.animating {
  animation: slideRight 0.2s ease-in-out forwards;
}

@keyframes slideRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(14rem);
    opacity: 0;
  }
}

.toast-container {
  display: flex;
  width: 13.5rem;
  height: 3rem;
  align-items: center;
  gap: 1rem;

  border-radius: 0.5rem;
  border: 1px solid var(--colors-neutral-600, #3c3b5e);
  background: var(--colors-neutral-800, #262540);
  box-shadow: 0 8px 16px 0 rgba(2, 1, 44, 0.32);
}

.colorBlock {
  width: 1rem;
  height: 3rem;
  flex-shrink: 0;

  border-radius: 0.5rem 0 0 0.5rem;

  background: v-bind(colorBlock);
}

span {
  color: var(--colors-neutral-0, #fff);

  /* text-preset-8 */
  font-family: 'DM Sans';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.05rem */
}
</style>
