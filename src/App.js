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
  

	return (
		<>
			<BrowserRouter>
				<Nav />
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/menu" element={<Menu />} />
					<Route path="/checkout" element={<OrderOnline />} />
					<Route path="/reservation" element={<Reservation />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
