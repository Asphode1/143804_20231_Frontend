import { createContext, useEffect, useState } from 'react'
import { House } from '../types'
import axios from '../shared/axios'
import Cookies from 'js-cookie'

interface HouseContextProps {
	house: House | undefined
	setHouse: React.Dispatch<React.SetStateAction<House | undefined>>
}

export const HouseContext = createContext<HouseContextProps | null>(null)

export default function HouseContextProvider({ children }: { children: React.ReactNode }) {
	const [house, setHouse] = useState<House | undefined>(undefined)

	useEffect(() => {
		if (Cookies.get('user'))
			axios
				.get('/api/house/get')
				.then((res) => res.data)
				.then((res) => setHouse(res[0]))
	}, [])

	return <HouseContext.Provider value={{ house, setHouse }}>{children}</HouseContext.Provider>
}
