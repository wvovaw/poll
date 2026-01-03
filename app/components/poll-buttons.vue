<script setup lang="ts">
defineProps<{
  voted: boolean;
  error: string;
}>();

defineEmits<{
  vote: [type: 'fw' | 'lib'];
}>();
</script>

<template>
  <div v-if="!voted">
    <button @click="$emit('vote', 'fw')">Framework</button>
    <button @click="$emit('vote', 'lib')">Library</button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
@custom-media --mobile (width < 768px);
button {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: var(--space-md) var(--space-lg);
  margin: var(--space-sm);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: oklab(from var(--color-primary) calc(l + 0.1) a b);
  }

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  /* Corner shape for modern look */
  clip-path: corner-shape(0.5rem);
}

.error {
  color: var(--color-error);
  margin-top: var(--space-sm);
}

/* Mobile-first responsive */
@media (--mobile) {
  button {
    width: 100%;
    max-width: 200px;
  }
}
</style>