import React from "react"
import ReactDOM from "react-dom/client"
import App from "./layouts/App/App"
import { GlobalProvider } from "./contexts/GlobalContext/GlobalContext"
import "./index.css"
import ToastProvider from "./contexts/ToastContext/ToastContext"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GlobalProvider>
			<ToastProvider>
				<App />
			</ToastProvider>
		</GlobalProvider>
	</React.StrictMode>
)
