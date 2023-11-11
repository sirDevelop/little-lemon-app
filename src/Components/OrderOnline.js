import axios from "axios"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"

const OrderOnline = ({cart}) => {
	const nameRef = useRef()
	const phoneRef = useRef()
	const [orderOption, setOrderOption] = useState({})
	const [amount, setAmount] = useState(1)
	const axiosApi = useMemo(() => {
		return axios.create({ baseURL: "http://localhost:9000/api/" })
	}, [])

    console.log('cart', cart);
	const orderOnline = (e) => {
		e.preventDefault()
		nameRef.current.focus()
	}
	useEffect(() => {
		// getOrderById(id)
	}, [])

	return (
		<Container>
			<Form onSubmit={orderOnline} className="text-center">
				<Row>
					<Col sm={6}>
						<Form.Group className="mb-3">
							<Form.Label>Full Name</Form.Label>
							<Form.Control
								ref={nameRef}
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
								type="phone"
								placeholder="Phone Number"
							/>
						</Form.Group>
					</Col>
					<Col sm={6}>
						<Form.Group className="mb-3">
							<Form.Label>Price</Form.Label>
							<br />
							<Form.Text className="text-muted">
								
							</Form.Text>
						</Form.Group>
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
