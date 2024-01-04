import { Device } from '../../../types'
import SingleFire from './single-fire'

export default function Fire({ fires }: { fires: Device[] }) {
	return (
		<div className="mt-8">
			<div className="flex items-center">
				<h1 className="font-bold text-4xl mb-4">Fire Detector</h1>
			</div>
			<div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
				{fires.map((fire) => (
					<SingleFire key={fire.id} device={fire} />
				))}
				{fires.length === 0 ? <h1 className="text-xl">No registered Fire Detectors</h1> : null}
			</div>
		</div>
	)
}
