import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/IoT/',
	server: {
		proxy: {
			'/api': {
				target: 'https://11fb-42-118-3-234.ngrok-free.app',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})

