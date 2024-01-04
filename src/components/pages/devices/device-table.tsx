import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Device, House } from '../../../types'
import ConfirmDelete from './confirm-del'
import { FaTrash } from 'react-icons/fa6'

export default function DeviceTable({
	house,
	forceReload,
}: {
	house: House | undefined
	forceReload: Dispatch<SetStateAction<boolean>>
}) {
	const [device, setDevice] = useState<Device | House>()
	const [openDelete, setOpenDelete] = useState<boolean>(false)
	useEffect(() => {
		if (openDelete) forceReload((prev) => !prev)
	}, [openDelete]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="w-full">
			<div className="w-full border border-gray-300 rounded-lg max-h-[60vh] overflow-auto">
				<table className="table-auto w-full border-collapse">
					<thead className="sticky top-0 w-full bg-white border-b">
						<tr className="sticky top-0">
							<th className="px-4 py-2 sticky top-0 w-8">ID</th>
							<th className="px-4 py-2 sticky top-0">House</th>
							<th className="px-4 py-2 sticky top-0">Name</th>
							<th className="px-4 py-2 sticky top-0">Type</th>
							<th className="px-4 py-2 sticky top-0 w-8"></th>
						</tr>
					</thead>
					<tbody className="">
						{house
							? house.devices.map((device) => (
									<tr key={device.id} className="hover:bg-gray-100 w-full cursor-pointer transition-colors">
										<td className="border text-center border-gray-300 px-4 py-2">
											<span className="truncate max-w-8 inline-block">{device.id}</span>
										</td>
										<td className="border border-gray-300 px-4 py-2">{house.name}</td>
										<td className="border border-gray-300 px-4 py-2">{device.name}</td>
										<td className="border border-gray-300 px-4 py-2">{device.type}</td>
										<td
											onClick={() => {
												console.log('click')
												setOpenDelete(true)
												setDevice(device)
											}}
											className="border border-gray-300 hover:bg-gray-200 px-4 py-2 text-center"
										>
											<div className="cursor-pointer">
												<FaTrash />
											</div>
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</table>
			</div>
			<div className="flex mt-4">
				<div className="ml-auto">
					<button
						onClick={() => {
							setDevice(house)
							setOpenDelete(true)
						}}
						className="px-4 text-xl flex items-center text-white justify-center py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
					>
						<FaTrash clasName="fill-white" />
						<span className="ml-4">Delete House</span>
					</button>
				</div>
			</div>
			<ConfirmDelete device={device} open={openDelete} setOpen={setOpenDelete} />
		</div>
	)
}
