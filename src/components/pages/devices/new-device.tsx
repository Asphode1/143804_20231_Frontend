import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import Selection from '../../utils/select-add'
import { IoClose } from 'react-icons/io5'
import { createPortal } from 'react-dom'
import { DeviceType } from '../../../types/enums'
import SelectionDropdown from '../../utils/select-dropdown'
import axios from '../../../shared/axios'
import toast from 'react-hot-toast'

export default function NewDevice({
	open,
	setOpen,
	forceReload,
}: {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	forceReload: Dispatch<SetStateAction<boolean>>
}) {
	const [string, setString] = useState<string>('')
	const [type, setType] = useState<DeviceType>(DeviceType.SENSOR)
	const [id, setId] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [err, setErr] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const addDevice = async (e: MouseEvent) => {
		e.preventDefault()
		if (!name.length || !string.length) {
			setErr('Please fill all the fields')
			return
		}
		setLoading(true)
		const promise = () =>
			axios
				.post('/api/devices/create', { houseid: string, type, id, name })
				.then(() => {
					setOpen(false)
				})
				.finally(() => {
					setLoading(false)
					forceReload((prev) => !prev)
				})

		toast.promise(
			promise(),
			{ loading: 'Adding...', success: 'Added successfully', error: 'Add failed' },
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
					<div className="bg-gray-50 rounded-xl p-12 relative">
						<div
							className="absolute p-1 rounded-full top-4 right-4 hover:bg-gray-200 transition-colors cursor-pointer"
							onClick={() => setOpen(false)}
						>
							<IoClose />
						</div>
						<div>
							<h1 className="text-center font-bold text-3xl">New Device</h1>
						</div>
						<div className="mt-2">
							<p className="mb-2">
								Select House <span className="text-red-500">*</span>
							</p>
							<Selection onFocus={() => setErr('')} string={string} path="/api/house" setString={setString} />
						</div>
						<div className="mt-4">
							<p className="mb-2">Device Type</p>
							<SelectionDropdown value={type} values={Object.values(DeviceType)} setValue={setType} />
						</div>
						<div className="mt-4">
							<p className="mb-2">
								Device Name <span className="text-red-500">*</span>
							</p>
							<input
								className="block w-full rounded-md border outline-none border-black bg-inherit p-2 text-base"
								type="text"
								value={name}
								onFocus={() => setErr('')}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<p className="mb-2">ID (leave blank for auto id)</p>
							<input
								className="block w-full rounded-md border outline-none border-black bg-inherit p-2 text-base"
								type="text"
								value={id}
								onChange={(e) => setId(e.target.value)}
							/>
						</div>
						{err.length ? (
							<div>
								<p className="text-center text-red-500 text-md">{err}</p>
							</div>
						) : null}
						<div className="mt-4">
							<button
								disabled={loading}
								onClick={addDevice}
								className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors py-4 text-white text-lg"
							>
								Add
							</button>
						</div>
					</div>
				</div>,
				document.body,
		  )
		: null
}
