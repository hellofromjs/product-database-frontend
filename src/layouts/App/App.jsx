import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom"

import Home, { loader as productsLoader } from "../Home/Home"

import ProductCreateUpdate, {
	loader as createUpdateProductLoader,
} from "../ProductCreateUpdate/ProductCreateUpdate"
import useAuth from "../../hooks/useAuth"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext"
import { profile } from "../../api/user"
import ProductInfo, {
	loader as productInfoLoader,
} from "../ProductInfo/ProductInfo"
import Index from "../Index/Index"
import Login from "../Login/Login"
import Register from "../Register/Register"
import RootLayout from "../RootLayout/RootLayout"

const router = ({ access_token }) =>
	createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<RootLayout />}>
				<Route index element={<Index />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/home"
					element={<Home />}
					loader={() => productsLoader(access_token)}
				/>
				<Route
					path="/products/add"
					element={<ProductCreateUpdate />}
					loader={() => createUpdateProductLoader(access_token)}
				/>
				<Route
					path="/products/update/:id"
					element={<ProductCreateUpdate />}
					loader={() => createUpdateProductLoader(access_token)}
				/>
				<Route
					path="/products/read/:id"
					element={<ProductInfo />}
					loader={() => productInfoLoader(access_token)}
				/>
			</Route>
		),
		{ basename: '/' + import.meta.env.VITE_REPO_NAME }
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

	return <RouterProvider router={router({ access_token: token })} />
}

export default App
