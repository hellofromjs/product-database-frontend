import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import { Outlet } from "react-router-dom"

export default function RootLayout() {
	return (
		<>
			<Navbar />
			<div className="wrapper">
				<Outlet />
			</div>
			<Footer />
		</>
	)
}
