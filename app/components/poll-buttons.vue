<script setup lang="ts">
defineProps<{
    voted: boolean;
    error: string;
}>();

defineEmits<{
    vote: [type: "fw" | "lib"];
}>();
</script>

<template>
    <div v-if="!voted" class="vote-container">
        <button class="vote-btn pattern-fw" @click="$emit('vote', 'fw')">
            <div class="inner">Vote Framework</div>
        </button>
        <button class="vote-btn pattern-lib" @click="$emit('vote', 'lib')">
            <div class="inner">Vote Library</div>
        </button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<style scoped>
@import "~/assets/css/breakpoints.css";

.vote-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-lg);
    margin: var(--space-lg);
}

.vote-btn {
    border: none;
    padding: 10px;
    font-size: var(--font-size-base);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }

    &:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
    }

    .inner {
        background: var(--color-bg);
        padding: var(--space-md) var(--space-lg);
        border-radius: calc(var(--radius-md) - 5px);
        font-weight: bold;
    }
}

.error {
    color: var(--color-error);
    margin-top: var(--space-sm);
}
</style>
