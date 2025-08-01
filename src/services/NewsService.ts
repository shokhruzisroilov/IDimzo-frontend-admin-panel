import API from './API'

// Full news object model
export interface News {
	id: number
	title: {
		uz: string
		uzCyrl: string
		kaa: string
		ru: string
		en: string
	}
	mediaUrl: string
	mediaType: string
	externalLink: string
	publishDate: string
	expiryDate: string
	viewed: boolean
	active: boolean
}

// DTO for creating a new news entry
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

// News CRUD service
const NewsService = {
	// Fetch news for admin panel
	async getAdmin(): Promise<News[]> {
		const res = await API.get('/news/admin')
		return res.data
	},

	// Create a new news entry
	async create(data: CreateNewsDto): Promise<News> {
		const res = await API.post('/news', data)
		return res.data
	},

	// Delete a news entry by ID
	async delete(id: number): Promise<void> {
		await API.delete(`/news/${id}`)
	},
}

export default NewsService
