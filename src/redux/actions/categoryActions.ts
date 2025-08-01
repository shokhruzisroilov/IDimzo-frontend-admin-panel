import type { AppDispatch } from '../store'
import CategoryService from '../../services/CategoryService'
import {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailure,
	createCategoryStart,
	createCategorySuccess,
	createCategoryFailure,
} from '../slices/categorySlice'
import type { CreateCategoryDto } from '../../services/CategoryService'

export const fetchCategories = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchCategoriesStart())
		const data = await CategoryService.getAll()
		dispatch(fetchCategoriesSuccess(data))
	} catch (err) {
		dispatch(
			fetchCategoriesFailure('Kategoriyalarni olishda xatolik yuz berdi')
		)
	}
}

export const createCategory =
	(data: CreateCategoryDto) => async (dispatch: AppDispatch) => {
		try {
			dispatch(createCategoryStart())
			const newCategory = await CategoryService.create(data)
			dispatch(createCategorySuccess(newCategory))
			dispatch(fetchCategories())
		} catch (err) {
			dispatch(createCategoryFailure('Kategoriya yaratishda xatolik yuz berdi'))
		}
	}

export const updateCategory =
	(id: number, data: CreateCategoryDto) => async (dispatch: AppDispatch) => {
		try {
			await CategoryService.update(id, data)
			dispatch(fetchCategories())
		} catch (err) {
			console.error('Kategoriya yangilashda xatolik:', err)
		}
	}

export const deleteCategory = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await CategoryService.delete(id)
		dispatch(fetchCategories())
	} catch (err) {
		console.error('Kategoriya o‘chirishda xatolik:', err)
	}
}
