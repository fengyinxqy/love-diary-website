import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.user?.token) {
    config.headers.Authorization = `Bearer ${authStore.user.token}`
  }
  return config
})

// 响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      const message = error.response.data?.message || error.message
      return Promise.reject(new Error(message))
    }
    return Promise.reject(error)
  }
)

export default api
