import type { AppDispatch } from '../store'
import {
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
} from '../slices/newsSlice'
import NewsService, { type CreateNewsDto } from '../../services/NewsService'

// 🔐 Get news for admin panel
export const fetchAdminNews = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchNewsStart())
		const news = await NewsService.getAdmin()
		dispatch(fetchNewsSuccess(news))
	} catch (error) {
		dispatch(fetchNewsFailure('Admin yangiliklarini yuklashda xatolik.'))
	}
}

// 📄 Get single news by ID
export const fetchSingleNews =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(fetchNewsStart())
			const news = await NewsService.getById(id)
			dispatch(fetchNewsSuccess([news])) // bitta element bo‘lsa ham massivga o‘rash
		} catch (error) {
			dispatch(fetchNewsFailure('Yangilikni olishda xatolik yuz berdi.'))
		}
	}

// ➕ Create news
export const createNews =
	(data: CreateNewsDto) => async (dispatch: AppDispatch) => {
		try {
			dispatch(createNewsStart())
			const created = await NewsService.create(data)
			dispatch(createNewsSuccess(created))
			dispatch(fetchAdminNews()) // ro'yxatni yangilash
		} catch (error) {
			dispatch(createNewsFailure('Yangilik yaratishda xatolik yuz berdi.'))
		}
	}

// ✏️ Update news
export const updateNews =
	(id: number, data: CreateNewsDto) => async (dispatch: AppDispatch) => {
		try {
			dispatch(updateNewsStart())
			const updated = await NewsService.update(id, data)
			dispatch(updateNewsSuccess(updated))
			dispatch(fetchAdminNews())
		} catch (error) {
			dispatch(updateNewsFailure('Yangilikni yangilashda xatolik yuz berdi.'))
		}
	}

// 🗑 Delete news
export const deleteNews = (id: number) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteNewsStart())
		await NewsService.delete(id)
		dispatch(deleteNewsSuccess(id))
		dispatch(fetchAdminNews())
	} catch (error) {
		dispatch(deleteNewsFailure('Yangilikni o‘chirishda xatolik yuz berdi.'))
	}
}
