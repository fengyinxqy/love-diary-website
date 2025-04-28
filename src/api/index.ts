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
api.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    if (authStore.user?.token) {
      config.headers.Authorization = `Bearer ${authStore.user.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    const authStore = useAuthStore()

    if (error.response?.status === 401) {
      // 清除用户信息并重新加载页面
      authStore.logout()
    }

    const message = error.response?.data?.message || error.message
    return Promise.reject(new Error(message))
  }
)

export default api
