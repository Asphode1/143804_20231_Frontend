import { useEffect, useState } from 'react'
import Metrics from './metrics'
import { Device, House } from '../../../types'
import { DeviceType } from '../../../types/enums'
import LED from './led'
import Fire from './fire'
import useHouse from '../../../hooks/useHouse'
import { useLocation } from 'react-router-dom'
import axios from '../../../shared/axios'

export default function Main() {
	const [devices, setDevices] = useState<Device[]>([])

	const { house, setHouse } = useHouse()
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === '/') {
			axios
				.get('/api/house/get')
				.then((res) => res.data as House[])
				.then((res) => setHouse((house) => res.find((h) => h.id === house?.id) ?? house))
		}
	}, [location]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (house) {
			setDevices(house.devices)
		}
	}, [house])
	return (
		<>
			<Metrics devices={devices.filter((device) => device.type === DeviceType.SENSOR)} />
			<LED leds={devices.filter((device) => device.type === DeviceType.LED)} />
			<Fire fires={devices.filter((device) => device.type === DeviceType.FIRE)} />
		</>
	)
}
