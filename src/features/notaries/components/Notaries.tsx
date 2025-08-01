import { Plus, Search, Trash } from 'lucide-react'
import { useState } from 'react'
import DeleteModal from '../../../components/common/DeleteModal'
import CreateNotaries from './CreateNotaries'

// Notarius ma'lumotlari uchun interface
interface Notary {
	id: number
	name: string
	phone: string
	region: string
	district: string
	status: 'active' | 'inactive'
}

// Viloyat va tumanlar uchun type
type Districts = {
	[key: string]: string[]
}

const Notaries = () => {
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
	const [createNotariesModal, setCreateNotariesModal] = useState<boolean>(false)
	const [title, setTitle] = useState<string>("Azizbek Adizov Azim o'g'li")
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [selectedRegion, setSelectedRegion] = useState<string>('')
	const [selectedDistrict, setSelectedDistrict] = useState<string>('')
	// const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

	const toggleDeleteModal = (name?: string) => {
		if (name) setTitle(name)
		setOpenDeleteModal(!openDeleteModal)
	}

	const toggleCreateModal = () => {
		setCreateNotariesModal(!createNotariesModal)
	}

	// Notariuslar ro'yxati
	const notaries: Notary[] = [
		{
			id: 1,
			name: "Azizbek Adizov Azim o'g'li",
			phone: '+998 77 404 40 40',
			region: 'Toshkent',
			district: "Mirzo Ulug'bek",
			status: 'active',
		},
		{
			id: 2,
			name: 'Dilfuza Yusupova Karimovna',
			phone: '+998 90 123 45 67',
			region: 'Samarqand',
			district: 'Samarqand shahar',
			status: 'active',
		},
		{
			id: 3,
			name: "Shoxrux Bahodirov Rustam o'g'li",
			phone: '+998 93 456 78 90',
			region: 'Andijon',
			district: 'Andijon shahar',
			status: 'inactive',
		},
	]

	// Viloyatlar ro'yxati
	const regions: string[] = [
		'Toshkent',
		'Samarqand',
		'Andijon',
		"Farg'ona",
		'Namangan',
	]

	// Tumanlar ro'yxati (viloyat bo'yicha)
	const districts: Districts = {
		Toshkent: ["Mirzo Ulug'bek", 'Yunusobod', 'Chilonzor'],
		Samarqand: ['Samarqand shahar', 'Oqdaryo', "Pastdarg'om"],
		Andijon: ['Andijon shahar', 'Asaka', 'Baliqchi'],
		"Farg'ona": ["Farg'ona shahar", "Qo'qon", "Marg'ilon"],
		Namangan: ['Namangan shahar', 'Chortoq', 'Pop'],
	}

	// Filtrlangan notariuslar
	const filteredNotaries = notaries.filter(notary => {
		const matchesSearch = notary.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
		const matchesRegion = selectedRegion
			? notary.region === selectedRegion
			: true
		const matchesDistrict = selectedDistrict
			? notary.district === selectedDistrict
			: true

		return matchesSearch && matchesRegion && matchesDistrict
	})

	return (
		<div className='p-6 min-h-[87vh] '>
			{/* Sarlavha va qo'shish tugmasi */}
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
				<h1 className='text-2xl font-bold text-gray-800 mb-4 md:mb-0'>
					Notariuslar
				</h1>
				<button
					onClick={toggleCreateModal}
					className='bg-mainColor hover:bg-indigo-700 transition-colors flex items-center gap-2 py-2.5 px-6 rounded-lg text-white shadow-md'
				>
					<Plus className='w-5 h-5' />
					<span className='font-medium'>Qo'shish</span>
				</button>
			</div>

			{/* Qidiruv va filtrlar */}
			<div className='bg-white p-4 rounded-xl shadow-sm mb-6'>
				<div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center'>
					<div className='md:col-span-2'>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
							<input
								type='text'
								placeholder='Notarius nomi'
								className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					<select
						className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
						value={selectedRegion}
						onChange={e => {
							setSelectedRegion(e.target.value)
							setSelectedDistrict('')
						}}
					>
						<option value=''>Barcha viloyatlar</option>
						{regions.map(region => (
							<option key={region} value={region}>
								{region}
							</option>
						))}
					</select>

					<select
						className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
						value={selectedDistrict}
						onChange={e => setSelectedDistrict(e.target.value)}
						disabled={!selectedRegion}
					>
						<option value=''>Barcha tumanlar</option>
						{selectedRegion &&
							districts[selectedRegion]?.map(district => (
								<option key={district} value={district}>
									{district}
								</option>
							))}
					</select>

					<button
						className='flex justify-center items-center px-4 py-2 gap-2 text-white rounded-lg bg-mainColor hover:bg-indigo-700 transition-colors'
						onClick={() => {
							setSearchTerm('')
							setSelectedRegion('')
							setSelectedDistrict('')
						}}
					>
						<span className='font-medium'>Tozalash</span>
					</button>
				</div>
			</div>

			{/* Notariuslar ro'yxati */}
			<div className='space-y-4'>
				{filteredNotaries.length > 0 ? (
					filteredNotaries.map(notary => (
						<div
							key={notary.id}
							className='flex flex-col md:flex-row items-start md:items-center border border-gray-200 px-6 py-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow'
						>
							<div className='w-full md:w-[40%] mb-3 md:mb-0'>
								<h2 className='font-bold text-gray-800'>{notary.name}</h2>
								<p className='text-sm text-gray-500 mt-1'>
									{notary.region}, {notary.district}
								</p>
							</div>
							<div className='w-full md:w-[20%] mb-3 md:mb-0'>
								<h2 className='text-gray-700'>{notary.phone}</h2>
							</div>
							<div className='ml-auto flex space-x-2'>
								<button
									onClick={() => toggleDeleteModal(notary.name)}
									className='flex items-center gap-2 py-2 px-4 rounded-xl text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors'
								>
									<Trash className='w-4 h-4' />
									<span className='font-medium'>O'chirish</span>
								</button>
							</div>
						</div>
					))
				) : (
					<div className='text-center py-10'>
						<p className='text-gray-500'>Notariuslar topilmadi</p>
					</div>
				)}
			</div>

			{/* Modallar */}
			<DeleteModal
				isOpen={openDeleteModal}
				onClose={toggleDeleteModal}
				title={title}
			/>

			<CreateNotaries
				isOpen={createNotariesModal}
				onClose={toggleCreateModal}
			/>
		</div>
	)
}

export default Notaries
