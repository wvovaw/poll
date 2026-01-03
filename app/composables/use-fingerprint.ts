import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { readonly, ref } from 'vue'

export function useFingerprint() {
  const fingerprint = ref<string | null>(null)
  const loading = ref(true)

  const loadFingerprint = async () => {
    try {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      fingerprint.value = result.visitorId
    }
    catch (error) {
      console.error('Error getting fingerprint:', error)
      // Fallback to simple hash
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx?.fillText(navigator.userAgent, 10, 10)
      fingerprint.value = btoa(canvas.toDataURL()).slice(0, 32)
    }
    finally {
      loading.value = false
    }
  }

  if (import.meta.client) {
    loadFingerprint()
  }

  return {
    fingerprint: readonly(fingerprint),
    loading: readonly(loading),
  }
}
