import axios from "axios"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie';
import { useGlobals } from "./useGlobals"


const OrderOnline = () => {
	const {cart, setCart, menuOptions} = useGlobals()
	let totalPrice = 0.0;
	const [cookies, setCookie, removeCookie] = useCookies(['cart']);
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

					const swalWithBootstrapButtons = Swal.mixin({
						customClass: {
							confirmButton: "btn btn-success",
							cancelButton: "btn btn-danger"
						},
						buttonsStyling: false
					});
					swalWithBootstrapButtons.fire({
						title: "Are you sure?",
						icon: "warning",
						showCancelButton: true,
						confirmButtonText: "Yes, place my order!",
						cancelButtonText: "No, cancel",
						reverseButtons: true
					}).then((result) => {
						if (result.isConfirmed) {
							swalWithBootstrapButtons.fire({
								title: "Placing your order...",
								// html: "",
								allowOutsideClick: () => !swalWithBootstrapButtons.isLoading(),
								timerProgressBar: true,
								willClose: (e) => {
										if(!swalWithBootstrapButtons.isLoading()) {
											e.preventDefault()
											return false
										}
								},

								didOpen: () =>{
									swalWithBootstrapButtons.showLoading()
									axiosApi.post("/menuOptions/orderOnline", {
										cart,
										name,
										phone,
									}).then((response) => {
										if(response.status === 200){
											swalWithBootstrapButtons.fire({
												title: "Placed!",
												text: "Thank you for your order! It will be ready in 15-20 minutes.",
												icon: "success"
											});

											// redirect to home page
											navigate('/');

											// clear the cart
											setCart([])
											removeCookie('cart', { path: '/' })
										}else{
											swalWithBootstrapButtons.fire({
												title: "Something went wrong!",
												text: "Please try again later or contact us.",
												icon: "danger"
											});
										}	
									}).catch(() => {
										swalWithBootstrapButtons.fire({
											title: "Something went wrong!",
											text: "Please try again later or contact us.",
											icon: "danger"
										});
									})
								}
							})
						} else if (
							result.dismiss === Swal.DismissReason.cancel
						) {
							swalWithBootstrapButtons.fire({
								title: "Order Cancelled",
								icon: "error"
							});
						}
					});
				} else {
					// what does this mean?
					// useContext, useRef
					// does nameRef and phoneRef correspond to those input fields? If so, how?
					// can we talk about useRef hook? And also custom hooks and how/why they are used...
					nameRef.current.value
						? phoneRef.current.focus()
						: nameRef.current.focus()
				}
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
								required
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
								required
							/>
						</Form.Group>
					</Col>

					{cart.length ?
						(

							<Col sm={12}>
								<table className="mx-auto border border-2 shadow">
									<tr>
										<td className="p-2 border">Dish Name</td>
										<td className="p-2 border">Quantity</td>
										<td className="p-2 border">Price</td>
									</tr>
									{cart.map((val, index) => {
										totalPrice += val.quantity * val.price
										return <tr key={index}>
											<td>{val.title}</td>
											<td>{val.quantity}</td>
											<td>${val.price}</td>
										</tr>
									})}
									<tr>
										<td className="p-2 border">Total Price</td>
										<td></td>
										<td className="p-2 border">${Math.round(totalPrice * 100) / 100}</td>
									</tr>
								</table>

							</Col>
						) : (<>
							Please Add Some Items to Your Cart First
						</>)
					}
				</Row>
				<Button variant="primary" type="submit">
					Order
				</Button>
			</Form>
		</Container>
	)
}

export default OrderOnline
