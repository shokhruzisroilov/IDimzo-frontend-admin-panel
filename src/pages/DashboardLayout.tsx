import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchCurrentUser } from '../redux/slices/userSlice'
import { AppSidebar } from '../components/app-sidebar'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '../components/ui/sidebar'
import Modal from '../components/ui/Modal'

export default function DashboardLayout() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useAppDispatch()
	const { user, loading } = useAppSelector(state => state.user)

	useEffect(() => {
		dispatch(fetchCurrentUser())
	}, [dispatch])

	// Avatar va user info
	const avatarUrl =
		user?.profilePhotoUrl ?? `https://i.pravatar.cc/40?u=${user?.id || 1}`
	const fullName = user ? `${user.firstName} ${user.lastName}` : ''
	const role = user?.role ?? ''

	// Skeleton component
	const Skeleton = () => (
		<div className='animate-pulse flex items-center space-x-4'>
			<div className='rounded-full bg-gray-300 h-10 w-10'></div>
			<div className='flex flex-col space-y-1'>
				<div className='h-3 bg-gray-300 rounded w-24'></div>
				<div className='h-2 bg-gray-200 rounded w-16'></div>
			</div>
		</div>
	)

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='flex justify-between h-16 items-center border-b px-4'>
					<SidebarTrigger className='-ml-1' />
					<div
						className='group flex items-center cursor-pointer transition rounded-md px-2 py-1 hover:bg-mainColor'
						onClick={() => setIsModalOpen(true)}
						role='button'
						tabIndex={0}
						onKeyDown={e => e.key === 'Enter' && setIsModalOpen(true)}
					>
						{loading ? (
							<Skeleton />
						) : (
							<>
								<div className='w-10 h-10 rounded-full mr-3 overflow-hidden'>
									<img
										className='w-full h-full object-cover'
										src={avatarUrl}
										alt='Avatar'
									/>
								</div>
								<div className='flex flex-col mr-3'>
									<span className='group-hover:text-white'>{fullName}</span>
									<span className='text-sm text-gray-500 group-hover:text-white'>
										{role}
									</span>
								</div>
							</>
						)}
					</div>
				</header>

				<div className='flex flex-1 flex-col gap-4 p-4 bg-slate-100'>
					<Outlet />
				</div>

				{isModalOpen && user && (
					<Modal
						onClose={() => setIsModalOpen(false)}
						user={{
							...user,
							profilePhotoUrl: user.profilePhotoUrl ?? undefined,
						}}
					/>
				)}
			</SidebarInset>
		</SidebarProvider>
	)
}
