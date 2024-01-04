import { useEffect, useState } from 'react'
import { Device } from '../../../types'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { FaFire } from 'react-icons/fa6'

export default function SingleFire({ device }: { device: Device }) {
	const [online, setOnline] = useState<boolean>(false)
	const [status, setStatus] = useState<string>('1')
	const [warn, setWarn] = useState<boolean>(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setOnline(false)
		}, 5000)

		return () => clearTimeout(timer)
	}, [status])

	const onClick = () => {
		setWarn(false)
		toast.dismiss()
	}

	useEffect(() => {
		if (!device) return
		const controller = new AbortController()
		const { signal } = controller
		const fetchData = async () => {
			await fetchEventSource(`/api/sensor/${device?.id}`, {
				method: 'GET',
				headers: {
					Accept: 'text/event-stream',
				},
				async onopen(res) {
					if (res.ok && res.status === 200) {
						console.log('Connection opened')
					} else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
						console.log('Client side error ', res)
					}
				},
				onmessage(event) {
					const data = event.data
					setStatus(data)
					if (data === '0' && !warn) {
						setWarn(true)
						toast.custom(
							<div onClick={onClick} className="p-4 rounded-lg bg-gray-50">
								<div>
									<p className="text-center">
										<span>Warning!&nbsp;</span>
										<FaFire className="ml-2 inline-block fill-red-500" />
									</p>
								</div>
								<div className="flex items-center">Fire deteted on device {device.name}!</div>
							</div>,
						)
					}
					setOnline(true)
				},
				onclose() {
					console.log('Connection closed by the server')
					setOnline(false)
				},
				onerror(err) {
					console.log('There was an error from server', err)
					setOnline(false)
				},
				signal,
			})
		}
		const user = Cookies.get('user')
		if (user && user.length) fetchData()
		return () => controller.abort()
	}, [device]) // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div className="bg-gray-200 p-4 rounded-lg">
			<div className="flex">
				<div>
					<h3 className="text-xl">Device: {device.name}</h3>
				</div>
				<div className="ml-auto">
					<div className="flex items-center justify-center mr-4">
						<div className={`inline-block mr-2 w-3 h-3 rounded-full ${online ? 'bg-green-600' : 'bg-red-600'}`}></div>
						<span>{online ? 'online' : 'offline'}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
