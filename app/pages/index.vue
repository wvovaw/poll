<script setup lang="ts">
import type { Poll } from "~~/types";

const { data: poll } = await useFetch<Poll>("/api/poll");
</script>

<template>
    <div v-if="poll">
        <ThePoll :poll />
    </div>
    <div v-else>loading</div>
</template>
