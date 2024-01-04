import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from './sidebar'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Toaster } from 'react-hot-toast'
import useHouse from '../../hooks/useHouse'
import axios from '../../shared/axios'

export default function Layout() {
	const navigate = useNavigate()
	const { setHouse } = useHouse()
	useEffect(() => {
		if (Cookies.get('user') === undefined || Cookies.get('user') === '') {
			navigate('/login')
		} else {
			axios
				.get('/api/house/get')
				.then((res) => res.data)
				.then((res) => setHouse(res[0]))
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<main className="h-screen bg-gray-100">
			<div className="h-[10vh] min-h-12 w-screen flex justify-end items-center border-b border-gray-400">
				<Navbar />
			</div>
			<div className="flex h-[90vh]">
				<div className="flex-1 w-[6vh] min-w-20 border-r flex items-center flex-col border-gray-400">
					<Sidebar />
				</div>
				<div className="flex-[9] p-8 overflow-y-auto">
					<Outlet />
				</div>
			</div>
			<Toaster />
		</main>
	)
}
