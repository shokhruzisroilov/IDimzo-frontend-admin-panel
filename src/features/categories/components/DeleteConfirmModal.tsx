import { X } from 'lucide-react'

interface Props {
	isOpen: boolean
	title: string
	description: string
	onConfirm: () => void
	onCancel: () => void
}

const DeleteConfirmModal = ({
	isOpen,
	title,
	description,
	onConfirm,
	onCancel,
}: Props) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-xl p-6 w-[90%] max-w-md relative'>
				<button
					onClick={onCancel}
					className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
				>
					<X size={20} />
				</button>
				<h2 className='text-xl font-bold text-red-600 text-center mb-2'>
					{title}
				</h2>
				<p className='text-center text-gray-700 font-medium mb-6'>
					{description}
				</p>
				<div className='flex justify-center gap-4'>
					<button
						onClick={onConfirm}
						className='bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700'
					>
						Ha
					</button>
					<button
						onClick={onCancel}
						className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'
					>
						Yo‘q
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteConfirmModal
