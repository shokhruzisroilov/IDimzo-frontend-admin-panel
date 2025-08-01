import API from './API'

interface LoginPayload {
	phoneNumber: string
	password: string
}

interface TokenResponse {
	accessToken: string
	refreshToken: string
}

const AuthService = {
	async login(payload: LoginPayload): Promise<TokenResponse> {
		const res = await API.post('/auth/admin/login', payload)
		return res.data
	},

	async refresh(refreshToken: string): Promise<{ accessToken: string }> {
		const res = await API.post('/auth/refresh', { refreshToken })
		return res.data
	},
}

export default AuthService
