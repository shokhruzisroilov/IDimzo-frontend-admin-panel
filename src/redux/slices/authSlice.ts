import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getItem, setItem, removeItem } from '../../helpers/persistanceStorage'

interface AuthState {
	accessToken: string | null
	refreshToken: string | null
	isAuthenticated: boolean
	isLoading: boolean
	error: string | null
}

const initialState: AuthState = {
	accessToken: getItem('accessToken'),
	refreshToken: getItem('refreshToken'),
	isAuthenticated: !!getItem('accessToken'),
	isLoading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart(state) {
			state.isLoading = true
			state.error = null
		},
		loginSuccess(
			state,
			action: PayloadAction<{ accessToken: string; refreshToken: string }>
		) {
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
			state.isAuthenticated = true
			state.isLoading = false
			state.error = null
			setItem('accessToken', action.payload.accessToken)
			setItem('refreshToken', action.payload.refreshToken)
		},
		loginFailure(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
		logout(state) {
			state.accessToken = null
			state.refreshToken = null
			state.isAuthenticated = false
			removeItem('accessToken')
			removeItem('refreshToken')
		},
	},
})

export const { loginStart, loginSuccess, loginFailure, logout } =
	authSlice.actions

export default authSlice.reducer
