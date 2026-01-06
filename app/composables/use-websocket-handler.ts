import type { Poll } from '~~/types'
import { computed, ref } from 'vue'

export function useWebSocketHandler() {
  const { fingerprint, loading: fpLoading } = useFingerprint()
  const voted = ref(true)
  const error = ref('')
  const poll = ref<Poll>({ fw: 0, lib: 0 })
  const loading = computed(() => fpLoading.value)

  const proto = import.meta.env.PROD ? 'wss' : 'ws'
  const { data, send, status } = useWebSocket(
    `${proto}://${window.location.host}/poll-ws`,
    {
      heartbeat: {
        interval: 15000,
      },
      autoReconnect: {
        retries: 5,
        // Exponential backoff: 1s, 2s, 4s, 8s, 16s
        delay: retries => Math.min(1000 * 2 ** (retries - 1), 30000),
        onFailed() {
          console.log('Connection failed after 5 retries')
        },
      },
      onConnected(ws) {
        console.log('Connected ws', ws)
      },
      onError(ws) {
        console.log('Connection error', ws)
      },
      onDisconnected(ws, event) {
        console.log('Connection closed', event)
        console.log(ws)
      },
    },
  )

  watch(data, (newData) => {
    if (!newData)
      return

    if (newData.startsWith('status:')) {
      voted.value = newData === 'status:already_voted'
    }
    else if (newData.startsWith('update:')) {
      try {
        poll.value = JSON.parse(newData.slice(7))
      }
      catch (e) {
        console.warn('Failed to parse WS update', e)
      }
    }
    else if (newData.startsWith('vote:')) {
      if (newData === 'vote:success') {
        voted.value = true
        error.value = ''
      }
    }
    else if (newData.startsWith('error:')) {
      error.value = newData.slice(6)
    }
  })

  // Send ping when fingerprint is ready
  watch(
    fingerprint,
    (fp) => {
      if (fp)
        send(`ping ${fp}`)
    },
    { immediate: true },
  )

  const vote = (type: 'fw' | 'lib') => {
    if (!fingerprint.value)
      return
    send(`vote ${type} ${fingerprint.value}`)
  }

  return {
    voted: readonly(voted),
    error: readonly(error),
    poll: readonly(poll),
    loading: readonly(loading),
    vote,
    status,
  }
}
