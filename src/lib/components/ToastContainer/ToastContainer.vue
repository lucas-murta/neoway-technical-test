<script setup lang="ts">
import { computed } from 'vue'
import Toast from '@/lib/base-components/Toast/Toast.vue'
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()

const visibleToasts = computed(() => toasts.value)

function handleToastClick(toastId: string) {
  removeToast(toastId)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="visibleToasts.length > 0" class="toast-container">
      <TransitionGroup name="toast" tag="div" class="toast-list">
        <div
          v-for="toast in visibleToasts"
          :key="toast.id"
          class="toast-wrapper"
          @click="handleToastClick(toast.id)"
        >
          <Toast
            :status="toast.status"
            :title="toast.title"
            :text="toast.text"
            class="toast-item"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

.toast-container {
  position: fixed;
  top: spacing('4');
  right: spacing('4');
  z-index: 9999;
  pointer-events: none;
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: spacing('3');
  align-items: flex-end;
}

.toast-wrapper {
  pointer-events: auto;
  cursor: pointer;
}

.toast-item {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
}

// Animações de transição
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}

// Responsividade
@media (max-width: 640px) {
  .toast-container {
    top: spacing('2');
    right: spacing('2');
    left: spacing('2');
  }

  .toast-list {
    align-items: stretch;
  }

  .toast-item {
    max-width: none;
  }
}
</style>
