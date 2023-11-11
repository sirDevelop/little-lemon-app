import {useState,useMemo,useEffect} from "react"
import Header from "./Header"
import Nav from "./Components/Nav"
import Reservation from "./Components/Reservation"
import Menu from "./Components/Menu"
import About from "./Components/About"
import Home from "./Components/Home"
import Footer from "./Components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import OrderOnline from "./Components/OrderOnline"
import axios from "axios"

function App() {
  const [cart, setCart] = useState([])
  const axiosApi = useMemo(() => {
		return axios.create({ baseURL: "http://localhost:9000/api/" })
	}, [])

	const [menuOptions, setMenuOptions] = useState([])

	useEffect(() => {
			axiosApi
				.get("/menuOptions/getMenuOptions")
				.then((response) => {
					setMenuOptions(response.data.getAllMenuOptions)
				})
	},[])

	return (
		<>
			<BrowserRouter>
				<Nav cart={cart} setCart={setCart} menuOptions={menuOptions} setMenuOptions={setMenuOptions} />
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/menu" element={<Menu menuOptions={menuOptions} setMenuOptions={setMenuOptions} cart={cart} setCart={setCart} />} />
					<Route path="/checkout" element={<OrderOnline cart={cart} />} />
					<Route path="/reservation" element={<Reservation />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
