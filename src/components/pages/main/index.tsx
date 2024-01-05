import { useEffect, useState } from 'react'
import Metrics from './metrics'
import { Device } from '../../../types'
import { DeviceType } from '../../../types/enums'
import LED from './led'
import Fire from './fire'
import useHouse from '../../../hooks/useHouse'
import { useLocation } from 'react-router-dom'

export default function Main() {
	const [devices, setDevices] = useState<Device[]>([])

	const { house } = useHouse()
	const location = useLocation()

	useEffect(() => {
		if (house && location.pathname === '/') {
			setDevices(house.devices)
		}
	}, [house, location])
	return (
		<>
			<Metrics devices={devices.filter((device) => device.type === DeviceType.SENSOR)} />
			<LED leds={devices.filter((device) => device.type === DeviceType.LED)} />
			<Fire fires={devices.filter((device) => device.type === DeviceType.FIRE)} />
		</>
	)
}
