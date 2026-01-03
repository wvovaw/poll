<script setup lang="ts">
const {
  voted,
  error,
  poll: currentPoll,
  loading,
  vote: handleVote,
} = useWebSocketHandler()

const total = computed(() => currentPoll.value.fw + currentPoll.value.lib)
const fwPercent = computed(() =>
  total.value > 0 ? (currentPoll.value.fw / total.value) * 100 : 50,
)
const libPercent = computed(() => 100 - fwPercent.value)
</script>

<template>
  <div class="poll">
    <PollQuestion />
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <template v-else>
      <PollProgressBar :fw-percent="fwPercent" :lib-percent="libPercent" :current-poll="currentPoll" />
      <PollButtons v-if="!voted" :voted="voted" :error="error" @vote="handleVote" />
    </template>
  </div>
</template>

<style scoped>
@import "~/assets/css/breakpoints.css";

.poll {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 200px;
    justify-content: start;
    height: 100vh;
    padding: var(--space-lg);
    color: var(--color-text);
}

.loading {
    font-size: var(--font-size-lg);
    color: var(--color-text);
}

@media (--mobile) {
    .poll {
        padding: var(--space-md);
    }
}
</style>
