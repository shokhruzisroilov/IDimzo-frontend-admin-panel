import API from './API'

// Yangiliklar interfeysi (to‘liq obyekt)
export interface News {
	id: number
	titleUz: string
	titleUzCyrl: string
	titleKaa: string
	titleRu: string
	titleEn: string
	mediaUrl: string
	mediaType: 'WEBP' | 'PNG' | 'JPG' | 'JPEG' | 'MP4' | 'WEBM' | 'MOV'
	externalLink: string
	publishDate: string
	expiryDate: string
	viewed: boolean
	active: boolean
}

// Yangilik yaratish/yangi ma’lumot yuborish uchun interfeys
export interface CreateNewsDto {
	titleUz: string
	titleUzCyrl: string
	titleKaa: string
	titleRu: string
	titleEn: string
	mediaUrl: string
	externalLink: string
	publishDate: string
	expiryDate: string
}

// CRUD xizmatlari
const NewsService = {
	// Barcha yangiliklarni olish
	async getAll(): Promise<News[]> {
		const res = await API.get('/news')
		return res.data
	},

	// Admin panel uchun yangiliklar
	async getAdmin(): Promise<News[]> {
		const res = await API.get('/news/admin')
		return res.data
	},

	// ID bo‘yicha yangilikni olish
	async getById(id: number): Promise<News> {
		const res = await API.get(`/news/${id}`)
		return res.data
	},

	// Yangilik qo‘shish
	async create(data: CreateNewsDto): Promise<News> {
		const res = await API.post('/news', data)
		return res.data
	},

	// Yangilikni yangilash
	async update(id: number, data: CreateNewsDto): Promise<News> {
		const res = await API.put(`/news/${id}`, data)
		return res.data
	},

	// Yangilikni o‘chirish
	async delete(id: number): Promise<void> {
		await API.delete(`/news/${id}`)
	},
}

export default NewsService
