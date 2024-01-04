import { FaPlus } from 'react-icons/fa6'
import DeviceTable from './device-table'
import { useEffect, useState } from 'react'
import NewDevice from './new-device'
import { House } from '../../../types'
import axios from '../../../shared/axios'
import Select from 'react-dropdown-select'

export default function Devices() {
	const [open, setOpen] = useState<boolean>(false)
	const [reload, setReload] = useState<boolean>(false)
	const [house, setHouse] = useState<House[]>([])
	const [selected, setSelected] = useState<House | undefined>(undefined)

	useEffect(() => {
		axios
			.get('/api/house/get')
			.then((res) => res.data)
			.then((res) => {
				setHouse(res)
				setSelected(res[0])
			})
	}, [reload])

	return (
		<>
			<div className="flex">
				<h1 className="ml-2 text-3xl font-bold">All Devices</h1>
				<div className="ml-auto flex items-center">
					<div className="mr-4">
						{selected ? (
							<Select
								labelField="name"
								valueField="name"
								options={house}
								onChange={(values) => setSelected(values[0])}
								values={[selected]}
							/>
						) : null}
					</div>
					<button
						onClick={() => setOpen(true)}
						className="px-4 flex items-center justify-center py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
					>
						<FaPlus className="fill-white mr-4 inline-block" />
						<span className="text-white text-xl">New Device</span>
					</button>
				</div>
			</div>
			<div className="mt-4">
				<DeviceTable house={selected} forceReload={setReload} />
			</div>
			<NewDevice open={open} setOpen={setOpen} forceReload={setReload} />
		</>
	)
}
