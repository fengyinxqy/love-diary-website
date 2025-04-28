export interface User {
  id: number
  name: string
  email: string
  token?: string
  avatar?: string
}

export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams extends LoginParams {
  name: string
}

export interface AuthResponse {
  user: User
  token: string
}
