import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { News } from '../../services/NewsService'

interface NewsState {
	news: News[]
	isLoading: boolean
	error: string | null
}

const initialState: NewsState = {
	news: [],
	isLoading: false,
	error: null,
}

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		// Fetch all or single
		fetchNewsStart(state) {
			state.isLoading = true
			state.error = null
		},
		fetchNewsSuccess(state, action: PayloadAction<News[]>) {
			state.news = action.payload
			state.isLoading = false
		},
		fetchNewsFailure(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},

		// Create
		createNewsStart(state) {
			state.isLoading = true
			state.error = null
		},
		createNewsSuccess(state, action: PayloadAction<News>) {
			state.news.unshift(action.payload)
			state.isLoading = false
		},
		createNewsFailure(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},

		// Update
		updateNewsStart(state) {
			state.isLoading = true
			state.error = null
		},
		updateNewsSuccess(state, action: PayloadAction<News>) {
			state.news = state.news.map(n =>
				n.id === action.payload.id ? action.payload : n
			)
			state.isLoading = false
		},
		updateNewsFailure(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},

		// Delete
		deleteNewsStart(state) {
			state.isLoading = true
			state.error = null
		},
		deleteNewsSuccess(state, action: PayloadAction<number>) {
			state.news = state.news.filter(n => n.id !== action.payload)
			state.isLoading = false
		},
		deleteNewsFailure(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const {
	fetchNewsStart,
	fetchNewsSuccess,
	fetchNewsFailure,
	createNewsStart,
	createNewsSuccess,
	createNewsFailure,
	updateNewsStart,
	updateNewsSuccess,
	updateNewsFailure,
	deleteNewsStart,
	deleteNewsSuccess,
	deleteNewsFailure,
} = newsSlice.actions

export default newsSlice.reducer
