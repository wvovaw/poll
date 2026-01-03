<script setup lang="ts">
import type { Poll } from "~~/types";
defineProps<{
    poll: Poll;
}>();
// In prod check if secure, then use wss://
const { status, data, send, open, close } = useWebSocket(
    `ws://${location.host}/api/poll-ws`,
);
</script>

<template>
    <div class="poll">{{ poll }}</div>
</template>
