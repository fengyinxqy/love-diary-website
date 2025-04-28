import type { WebsiteSettings, UpdateSettingsParams } from '@/types/settings'
import api from './index'

export const settingsApi = {
  // 获取网站设置
  async getSettings(): Promise<WebsiteSettings> {
    return api.get('/settings')
  },

  // 更新网站设置
  async updateSettings(params: UpdateSettingsParams): Promise<WebsiteSettings> {
    return api.put('/settings', params)
  },
}
