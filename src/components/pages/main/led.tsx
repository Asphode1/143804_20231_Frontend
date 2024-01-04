import { Device } from '../../../types'
import SingleLED from './single-led'

export default function LED({ leds }: { leds: Device[] }) {
	return (
		<div className="mt-8">
			<div className="flex items-center">
				<h1 className="font-bold text-4xl mb-4">LED</h1>
			</div>
			<div>
				{leds.map((led) => (
					<SingleLED key={led.id} device={led} />
				))}
				{leds.length === 0 ? <h1 className="text-xl">No registered LEDs</h1> : null}
			</div>
		</div>
	)
}
