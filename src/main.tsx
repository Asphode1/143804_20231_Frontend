import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import HouseContextProvider from './context/house-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HouseContextProvider>
			<App />
		</HouseContextProvider>
	</React.StrictMode>,
)

