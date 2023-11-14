import Navigation from "./Components/Navigation"
import Reservation from "./Pages/Reservation"
import Menu from "./Components/Menu"
import About from "./Pages/About"
import Home from "./Pages/Home"
import Footer from "./Components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import OrderOnline from "./Pages/OrderOnline"
import Cart from "./Components/Cart"
import { Container } from "react-bootstrap"

function App() {
	return (
		<div className="d-flex flex-column min-vh-100">
			<Navigation />
			<Container className="my-5">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/menu" element={<Menu />} />
					<Route path="/checkout" element={<OrderOnline />} />
					<Route path="/reservation" element={<Reservation />} />
				</Routes>
			</Container>
			<Cart />
			<Footer />
		</div>
	)
}

export default App
