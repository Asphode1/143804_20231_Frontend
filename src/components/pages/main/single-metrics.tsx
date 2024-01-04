import { useEffect, useState } from 'react'
import { Device } from '../../../types'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { FaDroplet, FaTemperatureEmpty } from 'react-icons/fa6'
import Cookies from 'js-cookie'

export default function SingleMetrics({ device }: { device: Device }) {
	const [temp, setTemp] = useState<string>('')
	const [humi, setHumi] = useState<string>('')
	const [online, setOnline] = useState<boolean>(false)

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
					const data = event.data.split(',')
					setTemp(data[0])
					setHumi(data[1])
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
	}, [device])

	useEffect(() => {
		const timer = setTimeout(() => {
			setOnline(false)
		}, 5000)

		return () => clearTimeout(timer)
	}, [temp, humi])

	return (
		<div className="bg-gray-200 p-4 rounded-lg">
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
			<div className="flex gap-4 flex-col lg:flex-row">
				<div className="flex-1 p-4 rounded-lg bg-gray-50 shadow-sm cursor-pointer">
					<div>
						<p className="text-2xl flex items-center">
							<FaTemperatureEmpty className="inline-block mr-4" />
							<span>Temperature: {temp}°C</span>
						</p>
					</div>
				</div>
				<div className="flex-1 p-4 rounded-lg bg-gray-50 shadow-sm cursor-pointer">
					<div>
						<p className="text-2xl flex items-center">
							<FaDroplet className="inline-block mr-4" />
							<span> Humidity: {humi}%</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
