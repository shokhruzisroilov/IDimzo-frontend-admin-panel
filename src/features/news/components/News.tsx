import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import DeleteModal from '../../../components/common/DeleteModal'
import type { AppDispatch, RootState } from '../../../redux/store'
import { deleteNews, fetchAdminNews } from '../../../redux/actions/newsActions'
import NewsSkeleton from './NewsSkeleton'
import ErrorAlert from './ErrorAlert'

export interface MultilangText {
	uz?: string
	uzCyrl?: string
	en?: string
	ru?: string
	kaa?: string
}

export interface News {
	id: number
	title: MultilangText
	mediaUrl: string
	mediaType: string
	publishDate: string
	expiryDate: string
	externalLink: string
	viewed: boolean
	active: boolean
}

const NewsPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [selectedNews, setSelectedNews] = useState<News | null>(null)

	const {
		news: newsList,
		isLoading,
		error,
	} = useSelector((state: RootState) => state.news)

	useEffect(() => {
		dispatch(fetchAdminNews())
	}, [dispatch])

	const openModal = (news: News) => {
		setSelectedNews(news)
		setOpenDeleteModal(true)
	}

	const closeModal = () => {
		setSelectedNews(null)
		setOpenDeleteModal(false)
	}

	const handleDelete = () => {
		if (selectedNews) {
			dispatch(deleteNews(selectedNews.id))
		}
		closeModal()
	}

	return (
		<div className='p-5'>
			{/* Header */}
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
				<h1 className='text-2xl font-bold text-gray-800'>Yangiliklar</h1>
				<button
					onClick={() => navigate('/news/create-news')}
					className='bg-mainColor hover:bg-indigo-700 transition-colors flex items-center gap-2 py-2.5 px-6 rounded-lg text-white shadow-md'
				>
					<Plus className='w-5 h-5' />
					<span className='font-medium'>Qo‘shish</span>
				</button>
			</div>

			{/* Content */}
			{isLoading ? (
				<NewsSkeleton />
			) : error ? (
				<ErrorAlert message={error} />
			) : (
				<div className='space-y-5'>
					{newsList.length === 0 ? (
						<p className='text-gray-500'>Hozircha yangilik mavjud emas.</p>
					) : (
						newsList.map((item, index) => (
							<div
								key={item.id}
								className='flex flex-col md:flex-row md:items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white gap-4'
							>
								<div className='font-medium text-gray-700 w-full md:w-[5%]'>
									{index + 1}.
								</div>

								<div className='w-full md:w-[15%]'>
									<h2 className='text-sm font-semibold text-gray-600'>Xabar</h2>
									<p className='text-gray-500 text-sm truncate'>
										{item.title.uz || '—'}
									</p>
								</div>

								<div className='w-full md:w-[30%]'>
									<div className='mt-2 w-full md:w-[200px] h-[120px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center'>
										{item.mediaUrl ? (
											<img
												src={item.mediaUrl}
												alt={item.title.uz || 'news image'}
												className='w-full h-full object-cover'
											/>
										) : (
											<span className='text-sm text-gray-400'>
												Rasm mavjud emas
											</span>
										)}
									</div>
								</div>

								<div className='w-full md:w-[20%]'>
									<h2 className='text-sm font-semibold text-gray-600'>
										Chiqish sanasi
									</h2>
									<p className='text-gray-500 text-sm'>
										{item.publishDate?.split('T')[0] || '—'}
									</p>
								</div>

								<div className='w-full md:w-[20%]'>
									<h2 className='text-sm font-semibold text-gray-600'>
										Tugash sanasi
									</h2>
									<p className='text-gray-500 text-sm'>
										{item.expiryDate?.split('T')[0] || '—'}
									</p>
								</div>

								<div className='md:ml-auto'>
									<button
										onClick={() => openModal(item)}
										className='group flex items-center gap-2 px-4 py-2 border border-red-500 rounded-lg hover:bg-red-500 transition-colors'
									>
										<span className='text-red-500 group-hover:text-white font-semibold'>
											O‘chirish
										</span>
										<Trash className='w-5 h-5 text-red-500 group-hover:text-white' />
									</button>
								</div>
							</div>
						))
					)}
				</div>
			)}

			{/* Delete Modal */}
			<DeleteModal
				isOpen={openDeleteModal}
				onClose={closeModal}
				title={selectedNews?.title.uz || 'Yangilik'}
				onDelete={handleDelete}
			/>
		</div>
	)
}

export default NewsPage
