export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  username: string
  password: string
  email?: string
}

export interface User {
  id: number
  username: string
  email?: string
  avatar?: string
  token: string
}

export interface AuthResponse {
  data: User
}

export interface AuthResponse {
  data: User
}
