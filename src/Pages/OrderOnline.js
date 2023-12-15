import axios from "axios"
import React, { useMemo, useRef, useState } from "react"
import { Form, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useCookies } from "react-cookie"
import { useGlobals } from "../Components/useGlobals"

const OrderOnline = () => {
	const { user, cart, setCart, authApi } = useGlobals()
	let totalPrice = 0.0
	const [cookies, setCookie, removeCookie] = useCookies(["cart"])

	// navigate to URL
	const navigate = useNavigate()
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")

	// ref does not cause component to re-render, only set state does
	// grab form element - equivalent to getElementById in JS
	const nameRef = useRef()
	const phoneRef = useRef()


	const orderOnline = (e) => {
		e.preventDefault()

		// make sure the name and phone fields are already rendered
		if (nameRef.current && phoneRef.current) {
			if (cart.length) {
				if (name.length && phone.length) {
					const swalWithBootstrapButtons = Swal.mixin({
						customClass: {
							confirmButton: "btn btn-success",
							cancelButton: "btn btn-danger",
						},
						buttonsStyling: false,
					})
					swalWithBootstrapButtons
						.fire({
							title: "Are you sure?",
							icon: "warning",
							showCancelButton: true,
							confirmButtonText: "Yes, place my order!",
							cancelButtonText: "No, cancel",
							reverseButtons: true,
						})
						.then((result) => {
							if (result.isConfirmed) {
								swalWithBootstrapButtons.fire({
									title: "Placing your order...",
									// html: "",
									allowOutsideClick: () =>
										!swalWithBootstrapButtons.isLoading(),
									timerProgressBar: true,
									willClose: (e) => {
										if (
											!swalWithBootstrapButtons.isLoading()
										) {
											e.preventDefault()
											return false
										}
									},

									didOpen: () => {
										swalWithBootstrapButtons.showLoading()
										authApi
											.post("/menuOptions/orderOnline", {
												cart,
												name,
												phone,
											})
											.then((response) => {
												if (response.status === 200) {
													swalWithBootstrapButtons.fire(
														{
															title: "Placed!",
															text: "Thank you for your order, " + response.data.name + "! It will be ready in 15-20 minutes.",
															icon: "success",
														}
													)

													// redirect to home page
													navigate("/")

													// clear the cart
													setCart([])
													removeCookie("cart", {
														path: "/",
													})
												} else {
													swalWithBootstrapButtons.fire(
														{
															title: "Something went wrong when placing your order!",
															text: "Please try again later or contact us.",
															icon: "danger",
														}
													)
												}
											})
											.catch((error) => {
												// TypeError: removeCookie is not a function
												// at main.7836805cb8448b095674.hot-update.js:110:23
												swalWithBootstrapButtons.fire({
													title: "Something went wrong when placing your order!",
													text: "Please try again later or contact us.",
													icon: "danger",
												})
											})
									},
								})
							} else if (
								result.dismiss === Swal.DismissReason.cancel
							) {
								swalWithBootstrapButtons.fire({
									title: "Order Cancelled",
									icon: "error",
								})
							}
						})
				} else {
					// focus on the other input element
					nameRef.current.value
						? phoneRef.current.focus()
						: nameRef.current.focus()
				}
			}
		}
	}

	return (
		<Container>
			<Row>
				<Col md={4} className="order-md-2 mb-4">
					<h4 className="d-flex justify-content-between align-items-center mb-3">
						<span className="text-muted">Your cart</span>
						<span className="badge badge-secondary badge-pill">
							3
						</span>
					</h4>
					<ul className="list-group mb-3">
						{cart.map((val, index) => {
							totalPrice += val.quantity * val.price
							return (
								<li className="list-group-item d-flex justify-content-between lh-condensed">
									<div key={index}>
										<h6 className="my-0">{val.title}</h6>
										<small className="text-muted">
											Quantity : {val.quantity}
										</small>
									</div>
									<span className="text-muted">
										${val.price}
									</span>
								</li>
							)
						})}
						<li className="list-group-item d-flex justify-content-between">
							<span>Total (USD)</span>
							<strong>
								${Math.round(totalPrice * 100) / 100}
							</strong>
						</li>
					</ul>
					<form
						className="card p-2"
						onSubmit={(e) => e.preventDefault()}
					>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Promo code"
							/>
							<div className="input-group-append">
								<button
									type="submit"
									className="btn btn-secondary"
								>
									Redeem
								</button>
							</div>
						</div>
					</form>
				</Col>
				<Col md={8} className="order-md-1">
					<h4 className="mb-3">Billing address</h4>
					<form
						className="needs-validation"
						noValidate=""
						onSubmit={orderOnline}
					>
						<div className="row">
							<div className="col-md-6 mb-3">
								<label htmlFor="firstName">Full name</label>
								<Form.Control
								// set the ref to this input element
									ref={nameRef}
									value={name}
									onChange={(e) => setName(e.target.value)}
									type="text"
									placeholder="Full Name"
									required
								/>
							</div>
							<div className="col-md-6 mb-3">
								<label htmlFor="lastName">Phone Number</label>
								<Form.Control
								// set the ref to this input element
									ref={phoneRef}
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									type="phone"
									placeholder="Phone Number"
									required
								/>
							</div>
						</div>
						<hr className="mb-4" />
						<button
							className="btn btn-primary btn-lg btn-block"
							type="submit"
						>
							Continue to checkout
						</button>
					</form>
				</Col>
			</Row>
		</Container>
	)
}

export default OrderOnline
