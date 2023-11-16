import Offcanvas from "react-bootstrap/Offcanvas"
import { useGlobals } from "./useGlobals"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import { Button, ButtonGroup, Card, Col } from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup"

const Cart = () => {
	const { cart, setCart, menuOptions, cartOpen, setCartOpen } = useGlobals()
	const [cookies, setCookie] = useCookies(["cart"])
	useEffect(() => {
		if (cookies.cart && cookies.cart.length > 0) {
			setCart(cookies.cart)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setCookie("cart", cart, { path: "/" })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart])
	const modifyCart = (index, type) => {
		setCart([
			...cart
				.filter(
					(valFilter, indexFilter) =>
						type === "add" ||
						(indexFilter === index && valFilter.quantity > 1) ||
						indexFilter !== index
				)
				.map((valFilter, indexFilter) => {
					if (indexFilter === index)
						return {
							...valFilter,
							quantity:
								type === "add"
									? valFilter.quantity + 1
									: valFilter.quantity - 1,
						}
					else return valFilter
				}),
		])
	}
	return (
		<Offcanvas
			show={cartOpen}
			onHide={() => setCartOpen(false)}
			placement="end"
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className="text-center">
				<ListGroup as="ol" key={1} className="text-start">
					{cart && cart.length ? (
						cart.map((val, index) => {
							let item = menuOptions.filter(
								(menuOption) => menuOption._id === val.id
							)
							if (item.length)
								return (
									<ListGroup.Item
										key={index}
										as="li"
										className="d-flex justify-content-between align-items-start"
									>
										<div className="ms-2 me-auto">
											<div className="fw-bold">
												{item[0].title}
											</div>
										</div>
										<div className="ms-2 text-end">
											<div className="fw-bold">
												<ButtonGroup>
													<Button
														variant="primary"
														onClick={() => {
															modifyCart(
																index,
																"remove"
															)
														}}
													>
														-
													</Button>
													<Button variant="outline-primary">
														{val.quantity}
													</Button>
													<Button
														variant="primary"
														onClick={() => {
															modifyCart(
																index,
																"add"
															)
														}}
													>
														+
													</Button>
												</ButtonGroup>
											</div>
										</div>
									</ListGroup.Item>
								)
							else return <></>
						})
					) : (
						<>
							{
								<Col key={1} sm={12} className="text-center">
									Wow, such empty. Please visit the Menu tab to add something...
									<Card.Img
										variant="top"
										src="./images/doge.png"
									/>
								</Col>
							}
						</>
					)}
				</ListGroup>
				{cart.length ? (
					<Link to="/checkout">
						<Button
							className="btn btn-success mt-2"
							onClick={() => setCartOpen(!cartOpen)}
						>
							Checkout
						</Button>
					</Link>
				) : (
					<></>
				)}
			</Offcanvas.Body>
		</Offcanvas>
	)
}

export default Cart
