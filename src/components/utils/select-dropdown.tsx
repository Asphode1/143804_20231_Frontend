import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export default function SelectionDropdown({
	value,
	values,
	setValue,
}: {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	value: any
	values: (typeof value)[]
	setValue: Dispatch<SetStateAction<typeof value>>
}) {
	const optRef = useRef<HTMLDivElement>(null)
	const [expand, setExpand] = useState(false)
	const [search, setSearch] = useState<string>(value ? (typeof value !== 'string' ? value.name : value) : '')

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (optRef.current && !optRef.current.contains(e.target as Node)) {
				setExpand(false)
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [optRef])

	return value ? (
		<div ref={optRef} className="relative w-[40rem] rounded-md bg-gray-50">
			<input
				className="block w-full rounded-md border outline-none border-black bg-inherit p-2 text-base cursor-pointer"
				type="text"
				onFocus={() => setExpand(true)}
				value={search}
				required={true}
				readOnly
				onChange={(e) => setSearch(e.target.value)}
			/>
			{expand ? (
				<div className="absolute top-[calc(100%-0.5rem)] z-10 max-h-40 w-full overflow-y-scroll rounded-b-md border border-t-0 border-neutral-900 bg-inherit pt-2 scrollbar-hide">
					<ul>
						{values.map((e) => (
							<li
								className="inline-block w-full cursor-pointer border-b border-neutral-900 bg-gray-50 p-2 first:border-t last:rounded-b-md last:border-b-0 hover:bg-gray-200 "
								key={e}
								onClick={() => {
									setExpand(false)
									console.log(e)
									setValue(e)
									setSearch(e && typeof e !== 'string' ? e.name : e)
								}}
							>
								{e}
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	) : null
}
