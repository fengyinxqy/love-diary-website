interface SettingsData {
  boyName: string
  girlName: string
  togetherDate: string
  description: string
}

export interface WebsiteSettings {
  data: SettingsData
}

export interface UpdateSettingsParams extends WebsiteSettings {}
