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
		// Fetch all or a single news item
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

		// Create news
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

		// Delete news
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

// Export actions
export const {
	fetchNewsStart,
	fetchNewsSuccess,
	fetchNewsFailure,
	createNewsStart,
	createNewsSuccess,
	createNewsFailure,
	deleteNewsStart,
	deleteNewsSuccess,
	deleteNewsFailure,
} = newsSlice.actions

// Export reducer
export default newsSlice.reducer
