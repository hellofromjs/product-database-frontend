import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom"

import Home from "../Home/Home"

import ProductCreateUpdate from "../ProductCreateUpdate/ProductCreateUpdate"
import useAuth from "../../hooks/useAuth"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext"
import { profile } from "../../services/user"
import ProductInfo from "../ProductInfo/ProductInfo"
import Index from "../Index/Index"
import Login from "../Login/Login"
import Register from "../Register/Register"
import RootLayout from "../RootLayout/RootLayout"
import PrivateRoutes from "../../utilities/PrivateRoutes"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Index />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route element={<PrivateRoutes />}>
				<Route path="/home" element={<Home />} />
				<Route path="/products/add" element={<ProductCreateUpdate />} />
				<Route path="/products/update/:id" element={<ProductCreateUpdate />} />
				<Route path="/products/read/:id" element={<ProductInfo />} />
			</Route>
		</Route>
	),
	{ basename: "/" + import.meta.env.VITE_REPO_NAME }
)

function App() {
	const [token] = useAuth()
	const { user, setUserData } = useContext(GlobalContext)

	useEffect(() => {
		async function init() {
			if (token !== null && user.access_token === null) {
				const [response, error] = await profile(token)

				setUserData({
					id: response.id,
					name: response.name,
					email: response.email,
					access_token: token,
				})
			}
		}
		init()
	}, [])

	return <RouterProvider router={router} />
}

export default App
