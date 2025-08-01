import { configureStore } from '@reduxjs/toolkit'
import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux'

// 🧩 Reducerlar
import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice'
import newsReducer from './slices/newsSlice'
import userReducer from './slices/userSlice' // 🆕

export const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		news: newsReducer,
		user: userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
