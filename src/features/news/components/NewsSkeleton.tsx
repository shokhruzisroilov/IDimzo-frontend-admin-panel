const NewsSkeleton = () => {
	return (
		<div className='space-y-4'>
			{Array.from({ length: 3 }).map((_, i) => (
				<div
					key={i}
					className='animate-pulse flex gap-4 items-center border p-4 rounded-xl bg-gray-50'
				>
					<div className='w-6 h-6 bg-gray-300 rounded' />
					<div className='w-40 h-4 bg-gray-300 rounded' />
					<div className='w-52 h-24 bg-gray-300 rounded' />
					<div className='w-28 h-4 bg-gray-300 rounded' />
					<div className='w-28 h-4 bg-gray-300 rounded' />
				</div>
			))}
		</div>
	)
}
export default NewsSkeleton
