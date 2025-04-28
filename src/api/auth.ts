import api from './index'
import type { LoginParams, RegisterParams, AuthResponse, User } from '@/types/auth'

export const authApi = {
  login(params: LoginParams): Promise<AuthResponse> {
    return api.post('/auth/login', params)
  },
  register(params: RegisterParams): Promise<AuthResponse> {
    return api.post('/auth/register', params)
  },
  logout(): Promise<void> {
    return api.post('/auth/logout')
  },
  getProfile(): Promise<User> {
    return api.get('/auth/me')
  }
}
