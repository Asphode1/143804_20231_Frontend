import { useContext } from 'react'
import { HouseContext } from '../context/house-context'

export default function useHouse() {
	const { house, setHouse } = useContext(HouseContext)!

	return { house, setHouse }
}
