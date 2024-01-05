import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { Device, House } from '../../../types'
import { createPortal } from 'react-dom'
import axios from '../../../shared/axios'
import toast from 'react-hot-toast'

export default function ConfirmDelete({
	device,
	open,
	setOpen,
	forceReload,
}: {
	device: Device | House | undefined
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	forceReload: Dispatch<SetStateAction<boolean>>
}) {
	const deleteDevice = async (e: MouseEvent) => {
		if (!device) return
		e.preventDefault()
		const path = 'type' in device ? 'devices' : 'house'
		const promise = () =>
			axios.delete(`/api/${path}/delete/${device.id}`).finally(() => {
				setOpen(false)
				forceReload((prev) => !prev)
			})
		toast.promise(
			promise(),
			{ loading: 'Deleting...', success: 'Deleted successfully', error: 'Delete failed' },
			{
				style: {
					minWidth: '200px',
				},
			},
		)
	}
	return open
		? createPortal(
				<div className="fixed inset-0 bg-black/15 flex items-center justify-center">
					<div className="bg-gray-50 rounded-xl p-6 w-[25rem]">
						<div>
							<h1 className="text-3xl font-bold text-center">Delete "{device?.name}"?</h1>
						</div>
						<div className="my-4">
							<p>
								You are about to delete this device. This action cannot be undone. Are you sure you want to delete this
								device?
							</p>
						</div>
						<div className="w-full flex gap-4">
							<button
								className="px-4 py-2 flex-1 rounded-lg text-lg bg-gray-200 hover:bg-gray-300"
								onClick={() => setOpen(false)}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 flex-1 rounded-lg text-white text-lg bg-blue-500 hover:bg-blue-600"
								onClick={deleteDevice}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>,
				document.body,
		  )
		: null
}
