import type { AppDispatch } from '../store'
import {
	fetchNewsStart,
	fetchNewsSuccess,
	fetchNewsFailure,
	createNewsStart,
	createNewsSuccess,
	createNewsFailure,
	deleteNewsStart,
	deleteNewsSuccess,
	deleteNewsFailure,
} from '../slices/newsSlice'
import NewsService, { type CreateNewsDto } from '../../services/NewsService'

//  Get news for admin panel
export const fetchAdminNews = () => async (dispatch: AppDispatch) => {
	dispatch(fetchNewsStart())
	try {
		const news = await NewsService.getAdmin()
		dispatch(fetchNewsSuccess(news))
	} catch (error) {
		dispatch(fetchNewsFailure('Admin yangiliklarini yuklashda xatolik.'))
	}
}

//  Create news
export const createNews =
	(data: CreateNewsDto) => async (dispatch: AppDispatch) => {
		dispatch(createNewsStart())
		try {
			const created = await NewsService.create(data)
			dispatch(createNewsSuccess(created))
			dispatch(fetchAdminNews()) // ro'yxatni qayta yuklash
		} catch (error) {
			dispatch(createNewsFailure('Yangilik yaratishda xatolik yuz berdi.'))
		}
	}

//  Delete news
export const deleteNews = (id: number) => async (dispatch: AppDispatch) => {
	dispatch(deleteNewsStart())
	try {
		await NewsService.delete(id)
		dispatch(deleteNewsSuccess(id))
		dispatch(fetchAdminNews())
	} catch (error) {
		dispatch(deleteNewsFailure('Yangilikni o‘chirishda xatolik yuz berdi.'))
	}
}
