import axios from 'axios'
import { getItem, removeItem, setItem } from '../helpers/persistanceStorage'
import AuthService from './AuthService'

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
	res => res,
	async error => {
		const originalRequest = error.config

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			getItem('refreshToken')
		) {
			originalRequest._retry = true

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						originalRequest.headers['Authorization'] = 'Bearer ' + token
						return API(originalRequest)
					})
					.catch(err => Promise.reject(err))
			}

			isRefreshing = true
			const refreshToken = getItem('refreshToken')

			try {
				const res = await AuthService.refresh(refreshToken!)
				const newAccessToken = res.accessToken
				setItem('accessToken', newAccessToken)

				processQueue(null, newAccessToken)
				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
				return API(originalRequest)
			} catch (err) {
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
