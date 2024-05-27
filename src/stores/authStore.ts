import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
export const useAuthStore = defineStore('authStore', () => {
  const user = ref({
    name: 'Adrian'
  })

  const isLogged: Ref<boolean> = ref(false)

  return { user, isLogged }
})
