import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CirclePlus, Minus, Pencil, Plus } from 'lucide-react'
import CreateCategoryModal from './CreateCategoryModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import type { RootState, AppDispatch } from '../../../redux/store'
import {
	deleteCategory,
	fetchCategories,
} from '../../../redux/actions/categoryActions'
import type { Category } from '../../../services/CategoryService'

const Categories = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { categories, isLoading, error } = useSelector(
		(state: RootState) => state.category
	)

	const [openModal, setOpenModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null
	)
	const [editingCategory, setEditingCategory] = useState<Category | null>(null)
	const [selectedParentId, setSelectedParentId] = useState<number | null>(null)

	useEffect(() => {
		dispatch(fetchCategories())
	}, [dispatch])

	const handleAddClick = () => {
		setEditingCategory(null)
		setOpenModal(true)
	}

	const handleAddChildClick = (parentId: number) => {
		setSelectedParentId(parentId)
		setEditingCategory(null)
		setOpenModal(true)
	}

	const handleEditClick = (category: Category) => {
		setEditingCategory(category)
		setOpenModal(true)
	}

	const handleDeleteClick = (id: number) => {
		setSelectedCategoryId(id)
		setShowDeleteModal(true)
	}

	const confirmDelete = () => {
		if (selectedCategoryId) {
			dispatch(deleteCategory(selectedCategoryId))
		}
		setShowDeleteModal(false)
		setSelectedCategoryId(null)
	}

	const toggleModal = () => {
		setOpenModal(false)
		setEditingCategory(null)
	}

	const renderCategories = (data: Category[], level = 0) => {
		return data.map(cat => (
			<div key={cat.id} style={{ marginLeft: level * 20 }}>
				<div className='flex gap-2 items-center my-2'>
					<Plus
						onClick={() => handleAddChildClick(cat.id)}
						className='text-blue-500 border-2 border-blue-500 cursor-pointer'
					/>
					<span>{cat.nameUz}</span>
					<Minus
						className='text-red-500 border-2 border-red-500 cursor-pointer'
						onClick={() => handleDeleteClick(cat.id)}
					/>
					<Pencil
						onClick={() => handleEditClick(cat)}
						className='text-blue-500 border-2 border-blue-500 cursor-pointer'
					/>
				</div>
				{cat.children && renderCategories(cat.children, level + 1)}
			</div>
		))
	}

	return (
		<>
			<h1 className='text-3xl mb-5 font-bold'>Kategoriya</h1>
			<div className='w-full h-[80vh] bg-white rounded-xl p-5'>
				<div className='w-full h-full border-2 border-blue-500 relative p-5 overflow-auto'>
					{isLoading ? (
						<div className='flex items-center justify-center h-full'>
							<div className='flex items-center gap-3 text-blue-600 animate-pulse'>
								<svg
									className='w-6 h-6 animate-spin'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'
									></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8v8H4z'
									></path>
								</svg>
								<span className='text-lg font-medium'>Yuklanmoqda...</span>
							</div>
						</div>
					) : error ? (
						<div className='flex items-center justify-center h-full'>
							<div className='text-center bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-lg'>
								<p className='font-semibold text-lg mb-1'>Xatolik yuz berdi</p>
								<p>{error}</p>
							</div>
						</div>
					) : (
						renderCategories(categories)
					)}

					<div className='absolute bottom-2 left-2'>
						<button
							onClick={handleAddClick}
							className='flex items-center gap-2 bg-mainColor text-white rounded-lg p-3'
						>
							<CirclePlus /> <span>Yangi kategoriya qo’shish</span>
						</button>
					</div>
				</div>
			</div>

			<CreateCategoryModal
				isOpen={openModal}
				onClose={toggleModal}
				editingCategory={editingCategory}
				parentId={selectedParentId}
			/>

			<DeleteConfirmModal
				isOpen={showDeleteModal}
				title='O‘chirish'
				description='Bu kategoriyani o‘chirishni xohlaysizmi?'
				onConfirm={confirmDelete}
				onCancel={() => setShowDeleteModal(false)}
			/>
		</>
	)
}

export default Categories
