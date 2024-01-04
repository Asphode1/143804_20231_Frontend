import axios from 'axios'

const server = axios.create({
	baseURL: '/',
	timeout: 10000,
	withCredentials: true,
	headers: {
		'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
	},
})

export default server
