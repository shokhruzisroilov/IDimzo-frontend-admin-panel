import { X } from 'lucide-react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	onDelete?: () => void
	title: string
}

const DeleteModal = ({ isOpen, onClose, onDelete, title }: ModalProps) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 max-w-xl w-full'>
				<div className='mb-4'>
					<div className='flex justify-end'>
						<button onClick={onClose} className='bg-slate-200 p-1 rounded-xl'>
							<X />
						</button>
					</div>
					<p className='text-2xl text-center mb-6'>
						Haqiqatdan ham <span className='font-bold'>“{title}“</span>{' '}
						bildirishnomasini o‘chirishni xohlaysizmi?
					</p>
				</div>
				<div className='flex justify-center gap-5'>
					<button
						className='bg-red-500 text-white w-32 h-10 rounded-lg'
						onClick={onDelete}
					>
						Ha
					</button>
					<button
						className='bg-mainColor text-white w-32 h-10 rounded-lg'
						onClick={onClose}
					>
						Yo‘q
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
