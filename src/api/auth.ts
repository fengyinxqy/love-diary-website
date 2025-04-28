import api from './index'
import type { LoginParams, RegisterParams, AuthResponse, User } from '@/types/auth'

export const authApi = {
  login(params: LoginParams): Promise<AuthResponse> {
    return api.post('/api/auth/login', params)
  },
  register(params: RegisterParams): Promise<AuthResponse> {
    return api.post('/api/auth/register', params)
  },
  logout(): Promise<void> {
    return api.post('/api/auth/logout')
  },
  getProfile(): Promise<User> {
    return api.get('/api/auth/me')
  }
}
