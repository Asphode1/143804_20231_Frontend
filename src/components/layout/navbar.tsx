import axios from '../../shared/axios'
import { useEffect, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { House } from '../../types'
import useHouse from '../../hooks/useHouse'
import Select from 'react-dropdown-select'

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const [houses, setHouses] = useState<House[]>([])
	const navigate = useNavigate()
	const { house, setHouse } = useHouse()

	const logout = async (e: React.MouseEvent) => {
		e.preventDefault()
		await axios.post('/api/auth/logout').then(() => {
			navigate('/login')
		})
	}

	useEffect(() => {
		axios
			.get('/api/house/get')
			.then((res) => res.data)
			.then((res) => setHouses(res))
	}, [])
	return (
		<div className="h-[5vh] w-screen">
			<div className="flex justify-between items-center h-full">
				<div className="flex-1"></div>
				<div className="flex flex-[9] pl-8 items-center h-full cursor-pointer">
					<div>
						{house ? (
							<Select
								values={[house]}
								options={houses}
								labelField="name"
								valueField="name"
								onChange={(values) => setHouse(values[0])}
							/>
						) : null}
					</div>
					<div className="ml-auto relative flex items-center" onClick={() => setOpen((open) => !open)}>
						<div className="mr-4">Welcome, {Cookies.get('user')}</div>
						<div className="mr-8">
							<FaCaretDown />
						</div>
						{open ? (
							<div className="absolute top-[100%] border rounded-md border-neutral-600 left-0 w-[90%] bg-gray-200">
								<div>
									<button onClick={logout} className="p-2 text-center w-full">
										Logout
									</button>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}
