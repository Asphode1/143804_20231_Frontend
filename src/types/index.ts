import { DeviceType } from './enums'

export interface Device {
	id: string
	name: string
	type: DeviceType
}

export interface House {
	id: string
	name: string
	devices: Device[]
}

export interface User {
	id: string
	username: string
	password: string
	device_tokens: string[]
	house: House[]
}
