import { useEffect, useState } from 'react'
import { Device } from '../../../types'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { LEDStatus } from '../../../types/enums'
import Cookies from 'js-cookie'
import Select from 'react-dropdown-select'
import { FaLightbulb } from 'react-icons/fa6'
import axios from '../../../shared/axios'

const btnoptions = [
	{
		label: 'ON',
		value: LEDStatus.ON,
	},
	{
		label: 'OFF',
		value: LEDStatus.OFF,
	},
	{
		label: 'RED',
		value: LEDStatus.RED,
	},
	{
		label: 'GREEN',
		value: LEDStatus.GREEN,
	},
	{
		label: 'BLUE',
		value: LEDStatus.BLUE,
	},
]

export default function SingleLED({ device }: { device: Device }) {
	const [status, setStatus] = useState<LEDStatus>(LEDStatus.OFF)
	const [online, setOnline] = useState<boolean>(false)
	const [loading, setIsLoading] = useState<boolean>(false)

	const setLedStatus = async (status: LEDStatus) => {
		setStatus(status)
		setIsLoading(true)
		await axios
			.post('/api/mqtt/publish', {
				topic: `led/${device?.id}`,
				message: status,
			})
			.finally(() => setIsLoading(false))
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setOnline(false)
		}, 5000)

		return () => clearTimeout(timer)
	}, [status])

	useEffect(() => {
		if (!device) return
		const fetchData = async () => {
			await fetchEventSource(`/api/sensor/${device?.id}`, {
				method: 'GET',
				headers: {
					Accept: 'text/event-stream',
					'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
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
					if (!loading) setStatus(data as LEDStatus)
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
			})
		}
		const user = Cookies.get('user')
		if (user && user.length) fetchData()
	}, [device]) // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div className="bg-gray-200 p-4 rounded-lg mb-4">
			<div className="flex mb-4">
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
			<div className="flex">
				<div className="w-full bg-gray-50 shadow-sm rounded-lg p-4 flex items-center">
					<p className="text-2xl flex items-center">
						<FaLightbulb className="mr-4" />
						<span>LED status</span>
					</p>
					<div className="ml-auto">
						<Select options={btnoptions} onChange={(value) => setLedStatus(value[0].value)} values={[btnoptions[0]]} />
					</div>
				</div>
			</div>
		</div>
	)
}
