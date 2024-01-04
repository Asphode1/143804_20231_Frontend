import { Device } from '../../../types'
import SingleMetrics from './single-metrics'

export default function Metrics({ devices }: { devices: Device[] }) {
	return (
		<div>
			<div className="flex items-center">
				<h1 className="font-bold text-4xl mb-4">Sensor</h1>
			</div>
			<div>
				{devices.map((device) => (
					<SingleMetrics key={device.id} device={device} />
				))}
				{devices.length === 0 ? <h1 className="text-xl">No registered sensors</h1> : null}
			</div>
		</div>
	)
}
