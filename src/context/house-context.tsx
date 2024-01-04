import { createContext, useState } from 'react'
import { House } from '../types'

interface HouseContextProps {
	house: House | undefined
	setHouse: React.Dispatch<React.SetStateAction<House | undefined>>
}

export const HouseContext = createContext<HouseContextProps | null>(null)

export default function HouseContextProvider({ children }: { children: React.ReactNode }) {
	const [house, setHouse] = useState<House | undefined>(undefined)

	return <HouseContext.Provider value={{ house, setHouse }}>{children}</HouseContext.Provider>
}
