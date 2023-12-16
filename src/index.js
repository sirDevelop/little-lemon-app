import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import GlobalsComponent from "./Components/useGlobals"
import { HashRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<HashRouter>
			<GlobalsComponent>
				<App />
			</GlobalsComponent>
		</HashRouter>
	</React.StrictMode>
)
