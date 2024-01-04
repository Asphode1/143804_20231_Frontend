import { Link } from 'react-router-dom'
import { FaHouse, FaMicrochip } from 'react-icons/fa6'

export default function Sidebar() {
	return (
		<div className="w-full">
			<div className="my-2 w-full px-2">
				<Link
					to="/"
					className="p-4 w-full flex rounded-lg items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
				>
					<FaHouse className="text-3xl" />
				</Link>
			</div>
			<div className="my-2 w-full px-2">
				<Link
					to="/devices"
					className="p-4 flex w-full items-center justify-center rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
				>
					<FaMicrochip className="text-3xl" />
				</Link>
			</div>
		</div>
	)
}
