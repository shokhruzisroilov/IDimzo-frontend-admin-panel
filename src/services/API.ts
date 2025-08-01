import axios from 'axios'
import { getItem, removeItem, setItem } from '../helpers/persistanceStorage'
import AuthService from './AuthService'
import { jwtDecode } from 'jwt-decode'

let isRefreshing = false

type FailedRequest = {
	resolve: (token: string) => void
	reject: (error: unknown) => void
}

let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else if (token) {
			prom.resolve(token)
		}
	})
	failedQueue = []
}

// Token muddati tugaganini tekshiruvchi funksiya
const isTokenExpired = (token: string): boolean => {
	try {
		const decoded: any = jwtDecode(token)
		return decoded.exp * 1000 < Date.now()
	} catch (e) {
		return true
	}
}

const API = axios.create({
	baseURL: 'https://api.idimzo.uz/api',
})

API.interceptors.request.use(config => {
	const accessToken = getItem('accessToken')
	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

API.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		// 401 va refreshToken mavjud bo‘lsa
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			getItem('refreshToken')
		) {
			originalRequest._retry = true

			const refreshToken = getItem('refreshToken')

			// ❗️ refreshToken muddati tugaganini tekshiramiz
			if (!refreshToken || isTokenExpired(refreshToken)) {
				console.warn(
					'🚫 Refresh token muddati tugagan. Login sahifaga yo‘naltirilmoqda.'
				)
				removeItem('accessToken')
				removeItem('refreshToken')
				window.location.href = '/login'
				return Promise.reject(error)
			}

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						originalRequest.headers['Authorization'] = `Bearer ${token}`
						return API(originalRequest)
					})
					.catch(err => Promise.reject(err))
			}

			isRefreshing = true

			try {
				console.log('🔄 Access token yangilanmoqda...')
				const res = await AuthService.refresh(refreshToken)
				const newAccessToken = res.accessToken

				console.log('✅ Yangi access token olindi:', newAccessToken)
				setItem('accessToken', newAccessToken)

				processQueue(null, newAccessToken)
				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
				return API(originalRequest)
			} catch (err) {
				console.error('❌ Token yangilab bo‘lmadi.')
				processQueue(err, null)
				removeItem('accessToken')
				removeItem('refreshToken')
				window.location.href = '/login'
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

export default API
