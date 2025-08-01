import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Category } from '../../services/CategoryService'

interface CategoryState {
	categories: Category[]
	isLoading: boolean
	error: string | null
}

const initialState: CategoryState = {
	categories: [],
	isLoading: false,
	error: null,
}

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		fetchCategoriesStart(state) {
			state.isLoading = true
			state.error = null
		},
		fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
			state.categories = action.payload
			state.isLoading = false
			state.error = null
		},
		fetchCategoriesFailure(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
		createCategoryStart(state) {
			state.isLoading = true
			state.error = null
		},
		createCategorySuccess(state, action: PayloadAction<Category>) {
			state.categories.push(action.payload)
			state.isLoading = false
			state.error = null
		},
		createCategoryFailure(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailure,
	createCategoryStart,
	createCategorySuccess,
	createCategoryFailure,
} = categorySlice.actions

export default categorySlice.reducer
