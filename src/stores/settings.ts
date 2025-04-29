import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WebsiteSettings, SettingsData } from '@/types/settings'
import { settingsApi } from '@/api/settings'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<WebsiteSettings | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 获取设置
  const fetchSettings = async () => {
    try {
      isLoading.value = true
      error.value = null
      const response = await settingsApi.getSettings()
      settings.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取设置失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 更新设置
  const updateSettings = async (params: SettingsData) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await settingsApi.updateSettings(params)
      settings.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新设置失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    settings,
    isLoading,
    error,
    fetchSettings,
    updateSettings,
  }
})
