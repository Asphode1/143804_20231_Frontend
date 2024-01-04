import axios from '../../../shared/axios'
import { MouseEvent, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
	const formRef = useRef<HTMLFormElement>(null)
	const [loading, setLoading] = useState(false)
	const [err, setErr] = useState('')
	const navigate = useNavigate()

	const onSubmit = async (e: MouseEvent) => {
		e.preventDefault()
		const { current } = formRef
		if (!current) return
		setLoading(true)
		const formData = new FormData(current)
		await axios
			.post('/api/auth/login', formData)
			.then(() => navigate('/'))
			.catch((err) => {
				setErr(err.response.data)
			})
			.finally(() => setLoading(false))
	}

	return (
		<>
			<div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
				<div className="w-[20rem] h-[25rem] p-8 rounded-lg bg-gray-300">
					<h1 className="text-center font-bold mt-2 text-xl">Login</h1>
					<div className="mt-8">
						<form ref={formRef}>
							<div>
								<input
									className="w-full px-4 mb-8 py-2 rounded-md"
									type="text"
									name="username"
									placeholder="username"
								/>
							</div>
							<div>
								<input
									className="w-full px-4 mb-2 py-2 rounded-md"
									type="password"
									name="password"
									placeholder="password"
								/>
							</div>
							<div className="flex">
								<Link to="/signup" className="ml-auto text-center text-blue-600 hover:underline">
									Signup
								</Link>
							</div>
							<div>
								<p className="text-red-600 text-center">&nbsp;{err}&nbsp;</p>
							</div>
							<div>
								<button
									onClick={onSubmit}
									disabled={loading}
									className="py-2 w-full h-12 rounded-lg hover:bg-[#0887c2] bg-[#30B0EB] transition-colors font-semibold text-white"
								>
									{loading ? (
										<svg className="animate-spin origin-center h-6 w-6 m-auto" viewBox="25 25 50 50">
											<circle
												className="animate-dash"
												strokeDasharray={'150,200'}
												strokeDashoffset={-10}
												strokeLinecap="round"
												cx="50"
												cy="50"
												r="20"
												fill="none"
												stroke="#fff"
												strokeWidth="6"
											/>
										</svg>
									) : (
										'Login'
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
