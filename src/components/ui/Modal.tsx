import { useRef, useState, useEffect } from 'react'
import { EyeOff, LockKeyhole, Mail, User, X } from 'lucide-react'

interface UserType {
	firstName?: string
	lastName?: string
	email?: string
	phoneNumber?: string
	profilePhotoUrl?: string
}

interface ModalProps {
	onClose: () => void
	user?: UserType
}

const Modal = ({ onClose, user }: ModalProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [imageSrc, setImageSrc] = useState(
		user?.profilePhotoUrl ?? 'https://i.pravatar.cc/40?u=1'
	)
	const [fullName, setFullName] = useState(
		`${user?.firstName ?? ''} ${user?.lastName ?? ''}`
	)
	const [phone, setPhone] = useState(user?.phoneNumber ?? '')

	useEffect(() => {
		if (user?.profilePhotoUrl) {
			setImageSrc(user.profilePhotoUrl)
		}
		setFullName(`${user?.firstName ?? ''} ${user?.lastName ?? ''}`)
		setPhone(user?.phoneNumber ?? '')
	}, [user])

	const handleImageClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setImageSrc(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 w-full max-w-lg'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-bold'>
						Admin ma'lumotlarni o'zgartirish
					</h2>
					<button
						onClick={onClose}
						className='text-2xl bg-gray-300 w-8 h-8 rounded-full flex justify-center items-center'
					>
						<X />
					</button>
				</div>

				{/* Profil rasmi */}
				<div className='flex justify-center mb-16'>
					<div className='relative w-24 h-24'>
						<img
							src={imageSrc}
							alt='Profile'
							className='w-full h-full object-cover rounded-full border cursor-pointer'
							onClick={handleImageClick}
						/>
						<div
							className='absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer'
							onClick={handleImageClick}
						></div>
						<input
							ref={fileInputRef}
							type='file'
							accept='image/*'
							className='hidden'
							onChange={handleFileChange}
						/>
					</div>
				</div>

				{/* Foydalanuvchi formasi */}
				<form className='space-y-4'>
					{/* Ism Familiya */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Ism Familiya (ixtiyoriy)
						</label>
						<div className='relative'>
							<input
								type='text'
								value={fullName}
								onChange={e => setFullName(e.target.value)}
								className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<User className='w-5 h-5' />
							</div>
						</div>
					</div>

					{/* Telefon raqam */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Telefon raqam
						</label>
						<div className='relative'>
							<input
								type='tel'
								value={phone}
								onChange={e => setPhone(e.target.value)}
								className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<Mail className='w-5 h-5' />
							</div>
						</div>
					</div>

					{/* Parol maydonlarini vaqtincha shunchaki ko‘rsatamiz */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Amaldagi parol (Majburiy)
						</label>
						<div className='relative'>
							<input
								type='password'
								id='current-password'
								className='w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<LockKeyhole className='w-5 h-5' />
							</div>
							<button
								type='button'
								className='absolute inset-y-0 right-0 pr-3 flex items-center'
							>
								<EyeOff className='w-4 h-4' />
							</button>
						</div>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Yangi parol (ixtiyoriy)
						</label>
						<div className='relative'>
							<input
								type='password'
								id='new-password'
								placeholder='Yangi parolni kiriting!'
								className='w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<LockKeyhole className='w-5 h-5' />
							</div>
							<button
								type='button'
								className='absolute inset-y-0 right-0 pr-3 flex items-center'
							>
								<EyeOff className='w-4 h-4' />
							</button>
						</div>
					</div>

					<div className='pt-2'>
						<button
							type='submit'
							className='w-full bg-mainColor hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition'
						>
							Saqlash
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Modal
