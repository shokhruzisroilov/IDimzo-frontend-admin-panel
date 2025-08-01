import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserService } from '../../services/UserService'

interface User {
	id: number
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	profilePhotoUrl?: string | null
	role: string
}

interface UserState {
	user: User | null
	loading: boolean
	error: string | null
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
}

export const fetchCurrentUser = createAsyncThunk(
	'user/fetchCurrentUser',
	async (_, thunkAPI) => {
		try {
			return await UserService.getCurrentUser()
		} catch (err) {
			return thunkAPI.rejectWithValue('User maʼlumotlarini olishda xatolik')
		}
	}
)

export const updateProfile = createAsyncThunk(
	'user/updateProfile',
	async (
		data: {
			firstName: string
			lastName: string
			email: string
			profilePhotoUrl?: string
		},
		thunkAPI
	) => {
		try {
			return await UserService.updateProfile(data)
		} catch (err) {
			return thunkAPI.rejectWithValue('Profil yangilashda xatolik')
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCurrentUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})

			.addCase(updateProfile.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

export default userSlice.reducer
