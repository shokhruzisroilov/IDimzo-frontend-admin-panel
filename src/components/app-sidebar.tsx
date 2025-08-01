import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarRail,
} from '../components/ui/sidebar'
import SidebarIcon from './common/SidebarIcon'
import { FaCogs } from 'react-icons/fa'
import { FaBell } from 'react-icons/fa'
import { FaList } from 'react-icons/fa'
import { FaFileAlt } from 'react-icons/fa'
import { FaNewspaper } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { FaCalculator } from 'react-icons/fa'
import { FaBalanceScale } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { Power } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(logout())
		navigate('/login', { replace: true })
	}

	return (
		<Sidebar {...props} className='h-full'>
			<SidebarHeader>
				<SidebarIcon />
			</SidebarHeader>
			<SidebarContent className='flex flex-col justify-between h-full'>
				<SidebarGroup>
					<SidebarGroupContent>
						<ul className='space-y-1'>
							<li>
								<NavLink
									to='/'
									className={({ isActive }) =>
										`flex items-center justify-between px-3 py-4 rounded ${
											isActive
												? 'bg-[#007BFF] text-white'
												: 'hover:bg-[#007BFF] hover:text-white'
										} transition-colors duration-200`
									}
								>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<FaCogs className='mr-2 h-4 w-4' />
												Boshaqruv paneli
											</div>
											<FaChevronRight
												className={`h-3 w-3 ${
													isActive ? 'text-white' : 'text-gray-500'
												}`}
												style={{ color: 'inherit' }}
											/>
										</>
									)}
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/notification'
									className={({ isActive }) =>
										`flex items-center justify-between px-3 py-4 rounded ${
											isActive
												? 'bg-[#007BFF] text-white'
												: 'hover:bg-[#007BFF] hover:text-white'
										} transition-colors duration-200`
									}
								>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<FaBell className='mr-2 h-4 w-4' />
												Bildirishnoma
											</div>
											<FaChevronRight
												className={`h-3 w-3 ${
													isActive ? 'text-white' : 'text-gray-500'
												}`}
												style={{ color: 'inherit' }}
											/>
										</>
									)}
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/categories'
									className={({ isActive }) =>
										`flex items-center justify-between px-3 py-4 rounded ${
											isActive
												? 'bg-[#007BFF] text-white'
												: 'hover:bg-[#007BFF] hover:text-white'
										} transition-colors duration-200`
									}
								>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<FaList className='mr-2 h-4 w-4' />
												Kategoriya
											</div>
											<FaChevronRight
												className={`h-3 w-3 ${
													isActive ? 'text-white' : 'text-gray-500'
												}`}
												style={{ color: 'inherit' }}
											/>
										</>
									)}
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/documents'
									className={({ isActive }) =>
										`flex items-center justify-between px-3 py-4 rounded ${
											isActive
												? 'bg-[#007BFF] text-white'
												: 'hover:bg-[#007BFF] hover:text-white'
										} transition-colors duration-200`
									}
								>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<FaFileAlt className='mr-2 h-4 w-4' />
												Hujjatlar
											</div>
											<FaChevronRight
												className={`h-3 w-3 ${
													isActive ? 'text-white' : 'text-gray-500'
												}`}
												style={{ color: 'inherit' }}
											/>
										</>
									)}
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/news'
									className={({ isActive }) =>
										`flex items-center justify-between px-3 py-4 rounded ${
											isActive
												? 'bg-[#007BFF] text-white'
												: 'hover:bg-[#007BFF] hover:text-white'
										} transition-colors duration-200`
									}
								>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<FaNewspaper className='mr-2 h-4 w-4' />
												Yangiliklar
											</div>
											<FaChevronRight
												className={`h-3 w-3 ${
													isActive ? 'text-white' : 'text-gray-500'
												}`}
												style={{ color: 'inherit' }}
											/>
										</>
									)}
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/users'
									className={({ isActive }) =>
										`flex items-center justify-between px-3 py-4 rounded ${
											isActive
												? 'bg-[#007BFF] text-white'
												: 'hover:bg-[#007BFF] hover:text-white'
										} transition-colors duration-200`
									}
								>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<FaUsers className='mr-2 h-4 w-4' />
												Mijozlar
											</div>
											<FaChevronRight
												className={`h-3 w-3 ${
													isActive ? 'text-white' : 'text-gray-500'
												}`}
												style={{ color: 'inherit' }}
											/>
										</>
									)}
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/billing'
									className={({ isActive }) =>
										`flex items-center justify-between px-3 py-4 rounded ${
											isActive
												? 'bg-[#007BFF] text-white'
												: 'hover:bg-[#007BFF] hover:text-white'
										} transition-colors duration-200`
									}
								>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<FaCalculator className='mr-2 h-4 w-4' />
												Hisob kitob
											</div>
											<FaChevronRight
												className={`h-3 w-3 ${
													isActive ? 'text-white' : 'text-gray-500'
												}`}
												style={{ color: 'inherit' }}
											/>
										</>
									)}
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/notaries'
									className={({ isActive }) =>
										`flex items-center justify-between px-3 py-4 rounded ${
											isActive
												? 'bg-[#007BFF] text-white'
												: 'hover:bg-[#007BFF] hover:text-white'
										} transition-colors duration-200`
									}
								>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<FaBalanceScale className='mr-2 h-4 w-4' />
												Notariuslar
											</div>
											<FaChevronRight
												className={`h-3 w-3 ${
													isActive ? 'text-white' : 'text-gray-500'
												}`}
												style={{ color: 'inherit' }}
											/>
										</>
									)}
								</NavLink>
							</li>
						</ul>
					</SidebarGroupContent>
				</SidebarGroup>
				<div className='px-3 pb-4'>
					<hr className='bg-gray-300' />
					<button
						onClick={logoutHandler}
						className='flex items-center w-full justify-center gap-3 px-3 py-4 rounded hover:bg-red-500 hover:text-white transition-colors duration-200'
					>
						<Power className='h-4 w-4' />
						<span>Tizimdan chiqish</span>
					</button>
				</div>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
