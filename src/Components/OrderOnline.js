import axios from "axios"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const OrderOnline = ({ cart, menuOptions }) => {
    let totalPrice = 0.0
	const navigate = useNavigate()
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const nameRef = useRef()
	const phoneRef = useRef()
	const axiosApi = useMemo(() => {
		return axios.create({ baseURL: "http://localhost:9000/api/" })
	}, [])
	const orderOnline = (e) => {
		e.preventDefault()
		if (nameRef.current && phoneRef.current) {
			if (cart.length) {
				if (name.length && phone.length) {
					axiosApi.post("/menuOptions/orderOnline", {
						cart,
						name,
						phone,
					})
				} else {
					nameRef.current.value
						? phoneRef.current.focus()
						: nameRef.current.focus()
				}
			} else {
				// alert("your cart is empty")
				// navigate("/menu")
			}
		}
	}

	return (
		<Container>
			<Form onSubmit={orderOnline} className="text-center">
				<Row>
					<Col sm={6}>
						<Form.Group className="mb-3">
							<Form.Label>Full Name</Form.Label>
							<Form.Control
								ref={nameRef}
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
								placeholder="Full Name"
							/>
						</Form.Group>
					</Col>
					<Col sm={6}>
						<Form.Group className="mb-3">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								ref={phoneRef}
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								type="phone"
								placeholder="Phone Number"
							/>
						</Form.Group>
					</Col>
					<Col sm={12}>
						<table className="mx-auto border border-2 shadow">
							<tr>
								<td className="p-2 border">Dish Name</td>
								<td className="p-2 border">Quantity</td>
								<td className="p-2 border">Price</td>
							</tr>
							{cart.map((val,index)=> {
                                // store inside cookies
                                // universal-cookies
                                totalPrice += val.price
								return <tr key={index}>
									<td>{val.title}</td>
									<td>{val.quantity}</td>
									<td>${val.price}</td>
								</tr>
							})}
							<tr>
								<td className="p-2 border">Total Price</td>
								<td></td>
								<td className="p-2 border">${totalPrice}</td>
							</tr>
							
						</table>
					</Col>
				</Row>

				<Button variant="primary" type="submit">
					Order
				</Button>
			</Form>
		</Container>
	)
}

export default OrderOnline
