import axios from '../../shared/axios'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import useDebounce from '../../hooks/useDebounce'
import { IoClose } from 'react-icons/io5'
import { House } from '../../types'

export default function Selection({
	string,
	path,
	setString,
	onFocus,
}: {
	string: string
	path: string
	setString: Dispatch<SetStateAction<string>>
	onFocus?: () => void
}) {
	const optRef = useRef<HTMLDivElement>(null)
	const [expand, setExpand] = useState(false)
	const [data, setData] = useState<House[]>([])
	const [search, setSearch] = useState<string>('')

	const handleAddNew = (e: React.MouseEvent) => {
		e.preventDefault()
		const addNewPromise = async () => axios.post(`${path}/create`, { name: search })
		if (search.length === 0) {
			toast.error('Nhập đủ thông tin')
		} else
			toast.promise(
				addNewPromise(),
				{ loading: 'Adding...', success: 'Added successfully', error: 'Add failed' },
				{
					style: {
						minWidth: '200px',
					},
				},
			)
		setString(search)
		setExpand(false)
	}

	const searchDebounced = useDebounce(search, 100)

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (optRef.current && !optRef.current.contains(e.target as Node)) {
				setExpand(false)
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [optRef])

	useEffect(() => {
		if (searchDebounced.length) {
			axios
				.get(`${path}/search?q=${searchDebounced}`)
				.then((res) => res.data)
				.then((res) => setData(res))
		} else
			axios
				.get(`${path}/get`)
				.then((res) => res.data)
				.then((res) => setData(res))
	}, [searchDebounced, path])

	return (
		<div ref={optRef} className="relative w-[40rem] rounded-md bg-gray-50">
			<input
				className="block w-full rounded-md border outline-none border-black bg-inherit p-2 text-base"
				type="text"
				onFocus={() => {
					setExpand(true)
					onFocus
				}}
				value={search}
				required={true}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{searchDebounced.length !== 0 ? (
				<div
					onClick={() => {
						setSearch('')
						setString('')
					}}
					className="absolute top-1/2 right-2 translate-y-[-50%] cursor-pointer rounded-full bg-gray-50 hover:bg-gray-200"
				>
					<IoClose className="text-base" />
				</div>
			) : null}
			{expand && string !== undefined ? (
				<div className="absolute top-[calc(100%-0.5rem)] z-10 max-h-40 w-full overflow-y-scroll rounded-b-md border border-t-0 border-neutral-900 bg-inherit pt-2 scrollbar-hide">
					<ul>
						{data.map((e) => (
							<li
								className="inline-block w-full cursor-pointer border-b border-neutral-900 bg-gray-50 p-2 first:border-t last:rounded-b-md last:border-b-0 hover:bg-gray-200 "
								key={e.name}
								onClick={() => {
									setExpand(false)
									setString(e.name)
									setSearch(e.name)
								}}
							>
								{e.name}
							</li>
						))}
						{data.length === 0 ? (
							<li
								onClick={handleAddNew}
								className="inline-block w-full cursor-pointer p-2 first:border-t first:border-neutral-500/60 last:rounded-b-md hover:bg-gray-200"
							>
								+ Add new...
							</li>
						) : null}
					</ul>
				</div>
			) : null}
		</div>
	)
}
