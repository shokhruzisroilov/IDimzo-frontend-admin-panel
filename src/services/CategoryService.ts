import API from './API'

export interface Category {
	id: number
	nameUz: string
	nameUzCyrl: string
	nameKaa: string
	nameRu: string
	nameEn: string
	parentId: number | null
	children: Category[] | null
}

export interface CreateCategoryDto {
	nameUz: string
	nameUzCyrl: string
	nameKaa: string
	nameRu: string
	nameEn: string
	parentId: number | null
}

const CategoryService = {
	async getAll(): Promise<Category[]> {
		const res = await API.get('/categories')
		return res.data
	},

	async create(data: CreateCategoryDto): Promise<Category> {
		const res = await API.post('/categories', data)
		return res.data
	},

	async update(id: number, data: CreateCategoryDto): Promise<Category> {
		const res = await API.put(`/categories/${id}`, data)
		return res.data
	},

	async delete(id: number): Promise<void> {
		await API.delete(`/categories/${id}`)
	},
}

export default CategoryService
