import { ref, computed } from "vue";
import type { Poll } from "~~/types";

export const useWebSocketHandler = () => {
  const { fingerprint, loading: fpLoading } = useFingerprint();
  const voted = ref(true);
  const error = ref("");
  const poll = ref<Poll>({ fw: 0, lib: 0 });
  const loading = computed(() => fpLoading.value);

  // In prod check if secure, then use wss://
  const { data, send, status } = useWebSocket(
    `ws://${window.location.host}/api/poll-ws`,
  );

  watch(data, (newData) => {
    if (!newData) return;

    if (newData.startsWith("status:")) {
      voted.value = newData === "status:already_voted";
    } else if (newData.startsWith("update:")) {
      try {
        poll.value = JSON.parse(newData.slice(7));
      } catch (e) {
        console.warn("Failed to parse WS update", e);
      }
    } else if (newData.startsWith("vote:")) {
      if (newData === "vote:success") {
        voted.value = true;
        error.value = "";
      }
    } else if (newData.startsWith("error:")) {
      error.value = newData.slice(6);
    }
  });

  // Send ping when fingerprint is ready
  watch(
    fingerprint,
    (fp) => {
      if (fp) send("ping " + fp);
    },
    { immediate: true },
  );

  const vote = (type: "fw" | "lib") => {
    if (!fingerprint.value) return;
    send(`vote ${type} ${fingerprint.value}`);
  };

  return {
    voted: readonly(voted),
    error: readonly(error),
    poll: readonly(poll),
    loading: readonly(loading),
    vote,
    status,
  };
};
