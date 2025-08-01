import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
	const token = localStorage.getItem('accessToken')

	// Agar token yo'q bo‘lsa → /login sahifasiga yo'naltiramiz
	return token ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute
