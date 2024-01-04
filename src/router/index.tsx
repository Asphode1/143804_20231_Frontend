import { RouteObject, createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout'
import Main from '../components/pages/main'
import Devices from '../components/pages/devices'
import Login from '../components/pages/auth/login'
import Signup from '../components/pages/auth/signup'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Main />,
			},
			{
				path: '/devices',
				element: <Devices />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
]

const router = createBrowserRouter(routes)

export default router
