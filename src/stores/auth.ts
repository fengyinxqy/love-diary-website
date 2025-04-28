import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, LoginParams, RegisterParams } from '@/types/auth'
import { authApi } from '@/api/auth'

const USER_STORAGE_KEY = 'user_info'

export const useAuthStore = defineStore('auth', () => {
  // 从localStorage初始化用户信息
  const storedUser = localStorage.getItem(USER_STORAGE_KEY) || null
  const user = ref<User | null>(storedUser ? JSON.parse(storedUser) : null)
  const isAuthenticated = ref(!!user.value)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 保存用户信息到localStorage
  const saveUserToStorage = (userData: User) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
  }

  // 清除localStorage中的用户信息
  const clearUserFromStorage = () => {
    localStorage.removeItem(USER_STORAGE_KEY)
  }

  const login = async (params: LoginParams) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authApi.login(params)
      user.value = response.data
      isAuthenticated.value = true
      saveUserToStorage(response.data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登录失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (params: RegisterParams) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authApi.register(params)
      user.value = response.data
      isAuthenticated.value = true
      saveUserToStorage(response.data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '注册失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      user.value = null
      isAuthenticated.value = false
      clearUserFromStorage()
    }
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
