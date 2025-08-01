import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './pages/DashboardLayout'
import NotificationPage from './pages/NotificationPage'
import CategoriesPage from './pages/CategoriesPage'
import DocumentsPage from './pages/DocumentsPage'
import NewsPage from './pages/NewsPage'
import Users from './pages/Users'
import BillingPage from './pages/BillingPage'
import NotariesPage from './pages/NotariesPage'
import HomePage from './pages/HomePage'
import CreateNotification from './features/notifications/components/CreateNotification'
import UniqueUser from './features/users/components/UniqueUser'
import CreateNews from './features/news/components/CreateNews'
import CreateDocuments from './features/documents/components/CreateDocuments'
import AddSection from './features/documents/components/AddSection'
import LoginPage from './pages/auth/Login'
import PrivateRoute from './PrivateRoute'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<LoginPage />} />

				<Route path='/' element={<PrivateRoute />}>
					<Route element={<DashboardLayout />}>
						<Route index element={<HomePage />} />
						<Route path='notification' element={<NotificationPage />} />
						<Route
							path='notification/create-notification'
							element={<CreateNotification />}
						/>
						<Route path='categories' element={<CategoriesPage />} />
						<Route path='documents' element={<DocumentsPage />} />
						<Route path='documents/create' element={<CreateDocuments />} />
						<Route path='news' element={<NewsPage />} />
						<Route path='news/create-news' element={<CreateNews />} />
						<Route path='users' element={<Users />} />
						<Route path='users/:id' element={<UniqueUser />} />
						<Route path='billing' element={<BillingPage />} />
						<Route path='notaries' element={<NotariesPage />} />
					</Route>

					<Route path='documents/create/:id' element={<AddSection />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
