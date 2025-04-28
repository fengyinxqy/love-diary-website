import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      // TODO: 调用API登录
      isAuthenticated.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登录失败'
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
  }) => {
    try {
      isLoading.value = true
      error.value = null
      // TODO: 调用API注册
      isAuthenticated.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : '注册失败'
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout
  }
})
