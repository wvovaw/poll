<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import type { Poll } from "~~/types";

const props = defineProps<{
    fwPercent: number;
    libPercent: number;
    currentPoll: Poll;
}>();

const sparkEl = ref<HTMLElement | null>(null);
let timer: number | null = null;

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

// 🔥 Фактор напряжения: 0 → 1 (макс. около 50%)
const intensity = computed(() => {
    const distance = Math.abs(props.fwPercent - 50);
    return 1 - Math.min(distance / 50, 1);
});

onMounted(() => {
    timer = window.setInterval(
        () => {
            if (!sparkEl.value) return;

            const power = intensity.value;

            sparkEl.value.style.setProperty(
                "--spark-x",
                `${random(-6, 6) * power}px`,
            );
            sparkEl.value.style.setProperty(
                "--spark-y",
                `${random(-6, 6) * power}px`,
            );
            sparkEl.value.style.setProperty(
                "--spark-rot",
                `${random(-30, 30) * power}deg`,
            );
        },
        random(60, 120),
    );
});

onBeforeUnmount(() => {
    if (timer) clearInterval(timer);
});
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

            <div ref="sparkEl" class="spark" :style="{ left: fwPercent + '%' }">
                ⚡
            </div>
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
}

.fw-bar,
.lib-bar {
    height: 100%;
    transition: width var(--transition-duration) var(--transition-fn);
}

.spark {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%)
        translate(var(--spark-x, 0px), var(--spark-y, 0px))
        rotate(var(--spark-rot, 0deg)) scale(var(--spark-scale, 1));
    font-size: 3em;
    animation: spark-pulse 0.8s infinite ease-in-out;
    transition:
        left var(--transition-duration) var(--transition-fn),
        transform 120ms linear;
    transform-origin: center;
    will-change: transform;
    pointer-events: none;
}

@keyframes spark-pulse {
    0% {
        opacity: 0.7;
        --spark-scale: 1;
    }
    50% {
        opacity: 1;
        --spark-scale: 1.15;
    }
    100% {
        opacity: 0.7;
        --spark-scale: 1;
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

    .spark {
        font-size: 2.4em;
    }
}
</style>
