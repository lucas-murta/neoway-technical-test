<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>

<template>
  <section>
    <h1>Home</h1>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">Increment</button>
  </section>
  <RouterLink to="/">Home</RouterLink>
  <RouterView />
</template>

<style scoped>
section {
  padding: 1rem;
}
button {
  margin-top: 0.5rem;
}
</style>
