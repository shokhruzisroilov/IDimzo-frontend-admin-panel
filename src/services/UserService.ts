import API from './API'

interface UpdateUserPayload {
	firstName: string
	lastName: string
	email: string
	profilePhotoUrl?: string
}

export const UserService = {
	async getCurrentUser() {
		const res = await API.get('/users/me')
		return res.data
	},

	async updateProfile(data: UpdateUserPayload) {
		const res = await API.put('/users/profile', data)
		return res.data
	},
}
