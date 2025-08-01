import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import {
	loginStart,
	loginSuccess,
	loginFailure,
} from '../../redux/slices/authSlice'
import AuthService from '../../services/AuthService'

const LoginPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { isAuthenticated, isLoading, error } = useSelector(
		(state: RootState) => state.auth
	)

	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/', { replace: true })
		}
	}, [isAuthenticated])

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(loginStart())

		try {
			const res = await AuthService.login({
				phoneNumber: `+998${phone}`,
				password,
			})

			dispatch(loginSuccess(res))
			navigate('/')
		} catch (err) {
			dispatch(loginFailure('Telefon raqam yoki parol noto‘g‘ri!'))
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center'>
				<h2 className='text-2xl font-bold mb-2'>Salom</h2>
				<p className='text-gray-600 mb-6'>Xush kelibsiz</p>

				<form onSubmit={handleLogin} className='space-y-4'>
					<div className='flex items-center border rounded-md px-3 py-2'>
						<span className='text-gray-700 mr-2'>+998</span>
						<input
							type='text'
							placeholder='Telefon raqam'
							value={phone}
							onChange={e => setPhone(e.target.value)}
							className='w-full outline-none'
							required
						/>
					</div>

					<input
						type='password'
						placeholder='Parol'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='w-full border px-3 py-2 rounded-md outline-none'
						required
					/>

					{error && <p className='text-red-500 text-sm'>{error}</p>}

					<button
						type='submit'
						disabled={isLoading}
						className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition ${
							isLoading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
						{isLoading ? 'Kirish...' : 'Kirish'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginPage
