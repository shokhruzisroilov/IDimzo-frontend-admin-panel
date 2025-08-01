import { CirclePlus, X } from 'lucide-react'
import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'

type LanguageCode = 'uz' | 'uzc' | 'kaa' | 'ru' | 'en'

interface NewsFormData {
	[key: string]: {
		title: string
		url: string
		media: {
			file: File | null
			previewUrl: string
		}
	}
}

const CreateNews = () => {
	const [formData, setFormData] = useState<NewsFormData>({
		uz: { title: '', url: '', media: { file: null, previewUrl: '' } },
		uzc: { title: '', url: '', media: { file: null, previewUrl: '' } },
		kaa: { title: '', url: '', media: { file: null, previewUrl: '' } },
		ru: { title: '', url: '', media: { file: null, previewUrl: '' } },
		en: { title: '', url: '', media: { file: null, previewUrl: '' } },
	})

	const fileInputRefs: Record<
		LanguageCode,
		React.RefObject<HTMLInputElement>
	> = {
		uz: useRef(null),
		uzc: useRef(null),
		kaa: useRef(null),
		ru: useRef(null),
		en: useRef(null),
	}

	const languages: { code: LanguageCode; label: string }[] = [
		{ code: 'uz', label: "O'zbekcha" },
		{ code: 'uzc', label: 'Ўзбекча' },
		{ code: 'kaa', label: 'Qaraqalpaqcha' },
		{ code: 'ru', label: 'Русский' },
		{ code: 'en', label: 'English' },
	]

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

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
		langCode: LanguageCode
	) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setFormData(prev => ({
				...prev,
				[langCode]: {
					...prev[langCode],
					media: {
						file,
						previewUrl: URL.createObjectURL(file),
					},
				},
			}))
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
		if (fileInputRefs[langCode].current) {
			fileInputRefs[langCode].current!.value = ''
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}

	return (
		<div className='w-full p-6 bg-white'>
			<h1 className='text-2xl font-bold mb-6'>Yangi yangilik qo'shish</h1>

			<form onSubmit={handleSubmit}>
				{languages.map(lang => (
					<div key={lang.code} className='flex justify-between mb-6'>
						{/* Title */}
						<div className='w-[30%]'>
							<p className='mb-2 font-medium'>{lang.label}</p>
							<input
								type='text'
								value={formData[lang.code].title}
								onChange={e => handleInputChange(e, lang.code, 'title')}
								placeholder='Nomi'
								className='w-full px-4 py-2 border border-gray-300 rounded'
								required={lang.code === 'uz'}
							/>
						</div>

						{/* File */}
						<div className='w-[30%]'>
							<p className='mb-2 font-medium'>
								375x816 (WEBP, PNG, JPG, MP4, WEBM, MOV)(Max 40s) (10MB)*
							</p>
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
						</div>

						{/* URL */}
						<div className='w-[30%]'>
							<p className='mb-2 font-medium'>URL manzil (Ixtiyoriy)</p>
							<input
								type='text'
								value={formData[lang.code].url}
								onChange={e => handleInputChange(e, lang.code, 'url')}
								placeholder='Url'
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
						Saqlash
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateNews
