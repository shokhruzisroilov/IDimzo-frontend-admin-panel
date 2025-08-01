import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	createCategory,
	updateCategory,
} from '../../../redux/actions/categoryActions'
import type { AppDispatch } from '../../../redux/store'
import type {
	CreateCategoryDto,
	Category,
} from '../../../services/CategoryService'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	editingCategory?: Category | null
	parentId?: number | null
}

const fields = [
	{ name: 'nameUz', label: "O'zbekcha" },
	{ name: 'nameUzCyrl', label: 'Ўзбекча' },
	{ name: 'nameRu', label: 'Русский' },
	{ name: 'nameEn', label: 'English' },
	{ name: 'nameKaa', label: 'Qaraqalpaqsha' },
] as const

const CreateCategoryModal = ({
	isOpen,
	onClose,
	editingCategory,
	parentId,
}: ModalProps) => {
	const dispatch = useDispatch<AppDispatch>()

	const [form, setForm] = useState<CreateCategoryDto>({
		nameUz: '',
		nameUzCyrl: '',
		nameRu: '',
		nameEn: '',
		nameKaa: '',
		parentId: null,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleClose = () => {
		setForm({
			nameUz: '',
			nameUzCyrl: '',
			nameRu: '',
			nameEn: '',
			nameKaa: '',
			parentId: null,
		})
		onClose()
	}

	useEffect(() => {
		if (editingCategory) {
			setForm({
				nameUz: editingCategory.nameUz,
				nameUzCyrl: editingCategory.nameUzCyrl,
				nameRu: editingCategory.nameRu,
				nameEn: editingCategory.nameEn,
				nameKaa: editingCategory.nameKaa,
				parentId: editingCategory.parentId,
			})
		} else {
			setForm({
				nameUz: '',
				nameUzCyrl: '',
				nameRu: '',
				nameEn: '',
				nameKaa: '',
				parentId: parentId ?? null,
			})
		}
	}, [editingCategory, parentId])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (editingCategory) {
			dispatch(updateCategory(editingCategory.id, form))
		} else {
			dispatch(createCategory(form))
		}
		handleClose() // formni tozalash + modalni yopish
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-md'>
				<div className='p-6'>
					<div className='flex justify-between items-center mb-6'>
						<h1 className='text-2xl font-bold text-gray-800'>
							{editingCategory
								? 'Kategoriyani tahrirlash'
								: 'Kategoriya yaratish'}
						</h1>
						<button
							onClick={handleClose}
							className='text-gray-500 hover:text-gray-700'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>

					<form onSubmit={handleSubmit}>
						<div className='space-y-4 mb-6'>
							{fields.map(({ name, label }) => (
								<div key={name}>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										{label}
									</label>
									<input
										type='text'
										name={name}
										value={form[name]}
										onChange={handleChange}
										className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
										required
									/>
								</div>
							))}
						</div>

						<div className='flex justify-center space-x-3'>
							<button
								type='submit'
								className='px-4 w-[150px] py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
							>
								{editingCategory ? 'Tahrirlash' : 'Saqlash'}
							</button>
							<button
								type='button'
								onClick={handleClose}
								className='px-4 w-[150px] py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
							>
								Bekor qilish
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateCategoryModal
