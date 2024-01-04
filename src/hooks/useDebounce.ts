import { useEffect, useState } from 'react'

export default function useDebounce(val: string, timeout: number) {
	const [str, setStr] = useState(val)

	useEffect(() => {
		const debounce = setTimeout(() => {
			setStr(val)
		}, timeout)
		return () => clearTimeout(debounce)
	}, [val, timeout])

	return str
}
