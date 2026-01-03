<script setup lang="ts">
import type { Poll } from "~~/types";

defineProps<{
    fwPercent: number;
    libPercent: number;
    currentPoll: Poll;
}>();
</script>

<template>
    <div class="progress-container">
        <div class="progress-bar">
            <div class="fw-bar" :style="{ width: fwPercent + '%' }"></div>
            <div class="lib-bar" :style="{ width: libPercent + '%' }"></div>
            <div class="spark" :style="{ left: fwPercent + '%' }">⚡</div>
        </div>
        <div class="progress-labels">
            <span class="fw-label">Framework: {{ currentPoll.fw }}</span>
            <span class="lib-label">Library: {{ currentPoll.lib }}</span>
        </div>
    </div>
</template>

<style scoped>
@custom-media --mobile (width < 768px);

.progress-container {
    --color-dark: #000;
    --color-light: #eee;

    width: 100%;
    max-width: 600px;
}

.progress-bar {
    display: flex;
    position: relative;
    height: 50px;
    background: var(--color-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: var(--space-md);

    .fw-bar {
        height: 100%;
        background-color: var(--color-light);
        opacity: 0.8;
        background: radial-gradient(
            circle,
            var(--color-dark) 40%,
            transparent 41%
        );
        background-size: 0.5em 0.5em;
        background-color: var(--color-light);
        opacity: 1;
        transition: width 0.3s ease;
    }

    .lib-bar {
        height: 100%;
        background-color: var(--color-light);
        opacity: 0.8;
        background: linear-gradient(
            135deg,
            var(--color-dark) 0%,
            var(--color-dark) 5%,
            transparent 5%,
            transparent 10%,
            var(--color-dark) 10%,
            var(--color-dark) 15%,
            transparent 15%,
            transparent 20%,
            var(--color-dark) 20%,
            var(--color-dark) 25%,
            transparent 25%,
            transparent 30%,
            var(--color-dark) 30%,
            var(--color-dark) 35%,
            transparent 35%,
            transparent 40%,
            var(--color-dark) 40%,
            var(--color-dark) 45%,
            transparent 45%,
            transparent 50%,
            var(--color-dark) 50%,
            var(--color-dark) 55%,
            transparent 55%,
            transparent 60%,
            var(--color-dark) 60%,
            var(--color-dark) 65%,
            transparent 65%,
            transparent 70%,
            var(--color-dark) 70%,
            var(--color-dark) 75%,
            transparent 70%,
            transparent 80%,
            var(--color-dark) 80%,
            var(--color-dark) 85%,
            transparent 85%,
            transparent 90%,
            var(--color-dark) 90%,
            var(--color-dark) 95%,
            transparent 95%
        );
        background-size: 2em 2em;
        background-color: var(--color-light);
        opacity: 1;
        transition: width 0.3s ease;
    }

    .spark {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: var(--font-size-xl);
        animation: spark 1s infinite alternate;
    }
}

@keyframes spark {
    0% {
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
    }
}

.progress-labels {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: var(--color-text);
}

.fw-label {
    text-align: left;
}

.lib-label {
    text-align: right;
}

@media (--mobile) {
    .progress-bar {
        height: 40px;
    }
}
</style>
