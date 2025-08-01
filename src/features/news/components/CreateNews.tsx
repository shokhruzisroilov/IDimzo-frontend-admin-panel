// importlar va type'lar o‘zgarmaydi
import { CirclePlus, X } from 'lucide-react'
import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'
import { createNews } from '../../../redux/actions/newsActions'
import { uploadFile } from '../../../services/uploadService'
import { useAppDispatch } from '../../../redux/store'

type LanguageCode = 'uz' | 'uzc' | 'kaa' | 'ru' | 'en'

interface NewsFormDataItem {
	title: string
	url: string
	media: {
		file: File | null
		previewUrl: string
	}
}

const languages = [
	{ code: 'uz', label: "O'zbekcha", field: 'titleUz' },
	{ code: 'uzc', label: 'Ўзбекча', field: 'titleUzCyrl' },
	{ code: 'kaa', label: 'Qaraqalpaqcha', field: 'titleKaa' },
	{ code: 'ru', label: 'Русский', field: 'titleRu' },
	{ code: 'en', label: 'English', field: 'titleEn' },
] as const

const CreateNews = () => {
	const dispatch = useAppDispatch()

	const [formData, setFormData] = useState<
		Record<LanguageCode, NewsFormDataItem>
	>(() =>
		languages.reduce((acc, lang) => {
			acc[lang.code] = {
				title: '',
				url: '',
				media: { file: null, previewUrl: '' },
			}
			return acc
		}, {} as Record<LanguageCode, NewsFormDataItem>)
	)

	const [publishDate, setPublishDate] = useState('')
	const [expiryDate, setExpiryDate] = useState('')
	const [externalLink, setExternalLink] = useState('')
	const [errors, setErrors] = useState<Record<string, string>>({})

	const fileInputRefs = {
		uz: useRef<HTMLInputElement>(null),
		uzc: useRef<HTMLInputElement>(null),
		kaa: useRef<HTMLInputElement>(null),
		ru: useRef<HTMLInputElement>(null),
		en: useRef<HTMLInputElement>(null),
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		langCode: LanguageCode,
		field: 'title' | 'url'
	) => {
		setFormData(prev => ({
			...prev,
			[langCode]: {
				...prev[langCode],
				[field]: e.target.value,
			},
		}))
	}

	const handleFileChange = async (
		e: ChangeEvent<HTMLInputElement>,
		langCode: LanguageCode
	) => {
		const file = e.target.files?.[0]
		if (!file) return

		const localPreviewUrl = URL.createObjectURL(file)

		setFormData(prev => ({
			...prev,
			[langCode]: {
				...prev[langCode],
				media: {
					file,
					previewUrl: localPreviewUrl,
				},
			},
		}))

		try {
			const uploadedUrl = await uploadFile(file)
			setFormData(prev => ({
				...prev,
				[langCode]: {
					...prev[langCode],
					media: {
						file,
						previewUrl: uploadedUrl,
					},
				},
			}))
		} catch (error) {
			console.error('Yuklashda xatolik:', error)
		}
	}

	const handleRemoveFile = (langCode: LanguageCode) => {
		setFormData(prev => ({
			...prev,
			[langCode]: {
				...prev[langCode],
				media: { file: null, previewUrl: '' },
			},
		}))
		const ref = fileInputRefs[langCode].current
		if (ref) ref.value = ''
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const newErrors: Record<string, string> = {}

		if (!formData.uz.title.trim()) {
			newErrors['titleUZ'] = "O'zbekcha sarlavha kiritilishi shart."
		}
		if (!formData.uz.media.previewUrl) {
			newErrors['mediaUZ'] = "O'zbekcha rasm yoki video yuklash shart."
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})

		const dto: any = {
			publishDate: new Date(publishDate).toISOString(),
			expiryDate: new Date(expiryDate).toISOString(),
			mediaUrl: formData.uz.media.previewUrl,
			externalLink,
		}

		languages.forEach(lang => {
			dto[lang.field] = formData[lang.code].title
		})

		dispatch(createNews(dto))
	}

	return (
		<div className='w-full p-4 sm:p-6 bg-white'>
			<h1 className='text-xl sm:text-2xl font-bold mb-6'>
				Yangi yangilik qo'shish
			</h1>

			<form onSubmit={handleSubmit}>
				{/* Sanalar */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
					<div>
						<label className='block mb-2 font-medium'>Publish Date</label>
						<input
							type='datetime-local'
							value={publishDate}
							onChange={e => setPublishDate(e.target.value)}
							required
							className='w-full px-4 py-2 border border-gray-300 rounded'
						/>
					</div>
					<div>
						<label className='block mb-2 font-medium'>Expiry Date</label>
						<input
							type='datetime-local'
							value={expiryDate}
							onChange={e => setExpiryDate(e.target.value)}
							required
							className='w-full px-4 py-2 border border-gray-300 rounded'
						/>
					</div>
				</div>

				{/* Til bo‘yicha inputlar */}
				{languages.map(lang => (
					<div
						key={lang.code}
						className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'
					>
						{/* Sarlavha */}
						<div>
							<label className='mb-2 font-medium block'>{lang.label}</label>
							<input
								type='text'
								value={formData[lang.code].title}
								onChange={e => handleInputChange(e, lang.code, 'title')}
								placeholder='Sarlavha'
								className={`w-full px-4 py-2 border rounded ${
									errors[`title${lang.code.toUpperCase()}`]
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								required={lang.code === 'uz'}
							/>
							{errors[`title${lang.code.toUpperCase()}`] && (
								<p className='text-red-500 text-sm mt-1'>
									{errors[`title${lang.code.toUpperCase()}`]}
								</p>
							)}
						</div>

						{/* Media */}
						<div>
							<label className='mb-2 font-medium block'>Media fayl</label>
							<input
								type='file'
								ref={fileInputRefs[lang.code]}
								onChange={e => handleFileChange(e, lang.code)}
								accept='.webp,.png,.jpg,.jpeg,.mp4,.webm,.mov'
								className='hidden'
							/>
							<button
								type='button'
								onClick={() => fileInputRefs[lang.code].current?.click()}
								className='w-[100px] h-[100px] bg-gray-200 rounded-lg border-dotted border-2 flex items-center justify-center relative overflow-hidden'
							>
								{formData[lang.code].media.previewUrl ? (
									<div className='relative w-full h-full'>
										{formData[lang.code].media.file?.type.startsWith(
											'image/'
										) ? (
											<img
												src={formData[lang.code].media.previewUrl}
												alt='Preview'
												className='w-full h-full object-cover'
											/>
										) : (
											<video
												src={formData[lang.code].media.previewUrl}
												className='w-full h-full object-cover'
											/>
										)}
										<button
											type='button'
											onClick={e => {
												e.stopPropagation()
												handleRemoveFile(lang.code)
											}}
											className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
										>
											<X className='w-3 h-3' />
										</button>
									</div>
								) : (
									<CirclePlus className='w-6 h-6 text-gray-500' />
								)}
							</button>
							{errors[`media${lang.code.toUpperCase()}`] && (
								<p className='text-red-500 text-sm mt-1'>
									{errors[`media${lang.code.toUpperCase()}`]}
								</p>
							)}
						</div>

						{/* External Link */}
						<div>
							<label className='mb-2 font-medium block'>External Link</label>
							<input
								type='text'
								value={externalLink}
								onChange={e => setExternalLink(e.target.value)}
								placeholder='Rasm yoki video URL'
								className='w-full px-4 py-2 border border-gray-300 rounded'
							/>
						</div>
					</div>
				))}

				<div className='flex justify-end mt-8'>
					<button
						type='submit'
						className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
					>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateNews
