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
            <div
                class="fw-bar pattern-fw"
                :style="{ width: fwPercent + '%' }"
            ></div>
            <div
                class="lib-bar pattern-lib"
                :style="{ width: libPercent + '%' }"
            ></div>
            <div class="spark" :style="{ left: fwPercent + '%' }">⚡</div>
        </div>
        <div class="progress-labels">
            <span class="fw-label">Framework: {{ currentPoll.fw }}</span>
            <span class="lib-label">Library: {{ currentPoll.lib }}</span>
        </div>
    </div>
</template>

<style scoped>
@import "~/assets/css/breakpoints.css";

.progress-container {
    width: 100%;
    max-width: 600px;

    --transition-duration: 0.4s;
    --transition-fn: ease-out;
}

.progress-bar {
    display: flex;
    position: relative;
    height: 50px;
    background: var(--color-light);
    margin-bottom: var(--space-md);

    .fw-bar {
        height: 100%;
        transition: width var(--transition-duration) var(--transition-fn);
    }

    .lib-bar {
        height: 100%;
        transition: width var(--transition-duration) var(--transition-fn);
    }

    .spark {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 3em;
        animation: spark 1s infinite alternate;
        transition: left var(--transition-duration) var(--transition-fn);
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
