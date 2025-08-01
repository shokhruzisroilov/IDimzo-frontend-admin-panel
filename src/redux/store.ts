import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice'
import newsReducer from './slices/newsSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		news: newsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
