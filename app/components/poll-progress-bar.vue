<script setup lang="ts">
import type { Poll } from "~~/types";

defineProps<{
    fwPercent: number;
    libPercent: number;
    currentPoll: Poll;
}>();
</script>

<template>
    <div class="progress-bar">
        <div class="fw-bar" :style="{ width: fwPercent + '%' }">
            {{ currentPoll.fw }}
        </div>
        <div class="lib-bar" :style="{ width: libPercent + '%' }">
            {{ currentPoll.lib }}
        </div>
        <div class="spark" :style="{ left: fwPercent + '%' }">⚡</div>
    </div>
</template>

<style scoped>
@import "~/assets/css/breakpoints.css";

.progress-bar {
    position: relative;
    height: 50px;
    width: 100%;
    display: flex;
    background: var(--color-secondary);
    border-radius: var(--radius-lg);

    .fw-bar {
        height: 100%;
        background: var(--color-primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition: width 0.3s ease;
    }

    .lib-bar {
        height: 100%;
        background: var(--color-accent);
        color: white;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: var(--space-md);
        font-weight: bold;
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

/* Mobile-first responsive */
@media (--mobile) {
    .progress-bar {
        height: 40px;
    }
}
</style>
