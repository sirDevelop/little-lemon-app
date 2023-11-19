import { faEnvelope, faKey, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect } from "react"
import {
	Form,
	Col,
	InputGroup,
	Row,
	Tab,
	Tabs,
	Button,
	Modal,
	Table,
} from "react-bootstrap"
import { useGlobals } from "../Components/useGlobals"
import { useState } from "react"
import Swal from "sweetalert2"

const User = () => {
	const {
		authApi,
		user,
		setUser,
		loggedIn,
		loadingLogin,
		openLogin,
		formData,
	} = useGlobals()
	const [orderHistoryData, setOrderHistoryData] = useState([])
	const [reservationHistoryData, setReservationHistoryData] = useState([])
	useEffect(() => {
		if (loggedIn) {
			authApi.get("/menuOptions/orderHistory").then((response) => {
				setOrderHistoryData(response.data.orders)
			})
			authApi.get("/reservation/reservationHistory").then((response) => {
				setReservationHistoryData(response.data.reservations)
			})
		}
	}, [loggedIn])

	useEffect(() => {
		if (loadingLogin === false && loggedIn === false && !formData.type)
			openLogin()
	}, [loadingLogin, loggedIn, formData])

	const [show, setShow] = useState(false)
	const [changePassword, setChangePassword] = useState(false)

	const [selectedDetails, setSelectedDetails] = useState([])
	const cartDetails = (cart) => {
		setSelectedDetails(JSON.parse(cart))
		setShow(true)
	}
	const [editFormData, setEditFormData] = useState({})
	const editProfile = (e) => {
		e.preventDefault()
		if (
			editFormData.firstName &&
			editFormData.lastName &&
			editFormData.email &&
			editFormData.firstName.length &&
			editFormData.lastName.length &&
			editFormData.email.length
		) {
			Swal.fire({
				title: "Updating your infromation...",
				// html: "",
				allowOutsideClick: () => !Swal.isLoading(),
				timerProgressBar: true,
				willClose: (e) => {
					if (!Swal.isLoading()) {
						e.preventDefault()
						return false
					}
				},

				didOpen: () => {
					Swal.showLoading()
					authApi
						.post("/users/editProfile", {
							editFormData,
							changePassword,
						})
						.then((response) => {
							setUser(response)
							Swal.fire({
								title: "Your Information has been updated!",
								icon: "success",
							})
						})
						.catch((e) => {
							switch (e.response.status) {
								case 401:
									Swal.fire({
										title: "User with this email already exists!",
										icon: "danger",
									})
									break

								default:
									break
							}
						})
				},
			})
		}
	}
	return (
		<div
			className={`${
				!loggedIn ? "hide" : ""
			} shadow p-2 border border-1 rounded text-center`}
		>
			{loggedIn && user.data ? (
				<Tabs
					defaultActiveKey="profile"
					id="uncontrolled-tab-example"
					className="mb-3"
				>
					<Tab eventKey="profile" title="Profile">
						<Form onSubmit={editProfile}>
							<Row className="mb-3 text-center">
								<InputGroup as={Col} sm={6} className="mb-3">
									<InputGroup.Text className="shadow">
										<FontAwesomeIcon icon={faUserAlt} />
									</InputGroup.Text>
									<Form.Control
										onChange={(e) =>
											setEditFormData({
												...editFormData,
												firstName: e.target.value,
											})
										}
										className="text-center shadow"
										name="name"
										type="string"
										// value={user.data.firstname}
										placeholder={user.data.firstname}
										required
									/>
								</InputGroup>
								<InputGroup as={Col} sm={6} className="mb-3">
									<InputGroup.Text className="shadow">
										<FontAwesomeIcon icon={faUserAlt} />
									</InputGroup.Text>
									<Form.Control
										onChange={(e) =>
											setEditFormData({
												...editFormData,
												lastName: e.target.value,
											})
										}
										className="text-center shadow"
										name="lastname"
										type="string"
										// value={user.data.lastname}
										placeholder={user.data.lastname}
										required
									/>
								</InputGroup>
								<InputGroup as={Col} sm={6} className="mb-3">
									<InputGroup.Text className="shadow">
										<FontAwesomeIcon icon={faEnvelope} />
									</InputGroup.Text>
									<Form.Control
										className="text-center shadow"
										onChange={(e) =>
											setEditFormData({
												...editFormData,
												email: e.target.value,
											})
										}
										name="email"
										type="text"
										// value={user.data.email}
										placeholder={user.data.email}
										required
									/>
								</InputGroup>
								<Col sm={12} className="text-center">
									<InputGroup className="d-block mx-auto">
										<Form.Check
											className="change-password"
											type={"checkbox"}
											label={`Change password?`}
											checked={changePassword}
											onChange={() =>
												setChangePassword(
													!changePassword
												)
											}
										/>
									</InputGroup>
								</Col>
								{changePassword ? (
									<InputGroup
										as={Col}
										sm={6}
										className="mb-3"
									>
										<InputGroup.Text className="shadow">
											<FontAwesomeIcon icon={faKey} />
										</InputGroup.Text>
										<Form.Control
											className="text-center shadow"
											onChange={(e) =>
												setEditFormData({
													...editFormData,
													password: e.target.value,
												})
											}
											name="password"
											type="password"
											placeholder="Password"
											required
										/>

										{/* <Button type="button" class="btn btn-primary">Change Password</Button> */}
									</InputGroup>
								) : (
									<></>
								)}
								<Col sm={2} className="mx-auto">
									<Button type="submit" class="btn btn-info">
										Update Information
									</Button>
								</Col>
							</Row>
						</Form>
					</Tab>
					<Tab
						eventKey="orders"
						title="Orders"
						className="text-center"
					>
						<Table borderless responsive>
							<thead>
								<tr>
									<td>Name</td>
									<td>Phone Number</td>
									<td>Date</td>
									<td>Details</td>
								</tr>
							</thead>
							<tbody class="table-body">
								{orderHistoryData && orderHistoryData.length ? (
									orderHistoryData.map((order, index) => {
										const date = new Date(order.createdAt)
										return (
											<tr key={index}>
												<td>{order.name}</td>
												<td>{order.phoneNumber}</td>
												<td>
													{date.toLocaleDateString(
														"en-us",
														{
															year: "numeric",
															month: "short",
															day: "numeric",
															hour: "numeric",
															minute: "numeric",
															hour12: true,
														}
													)}
												</td>
												<td>
													<Button
														variant="primary"
														onClick={() =>
															cartDetails(
																order.cart
															)
														}
													>
														Show Details
													</Button>
												</td>
											</tr>
										)
									})
								) : (
									<tr>
										<td colSpan={4}>No Data</td>
									</tr>
								)}
							</tbody>
						</Table>

						<Modal show={show} onHide={() => setShow(false)}>
							<Modal.Header closeButton>
								<Modal.Title>Order Details</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Table borderless responsive>
									<thead>
										<tr>
											<td>Item Name</td>
											<td>Quanity</td>
											<td>Price</td>
										</tr>
									</thead>
									<tbody class="table-body">
										{selectedDetails.map(
											(detail, index) => {
												return (
													<tr key={index}>
														<td>{detail.title}</td>
														<td>
															{detail.quantity}
														</td>
														<td>{detail.price}</td>
													</tr>
												)
											}
										)}
									</tbody>
								</Table>
							</Modal.Body>
							<Modal.Footer>
								<Button
									variant="primary"
									onClick={() => setShow(false)}
								>
									Close
								</Button>
							</Modal.Footer>
						</Modal>
					</Tab>
					<Tab eventKey="reservations" title="Reservations">
						<Table borderless responsive>
							<thead>
								<tr>
									<td>Reservation ID</td>
									<td>Name</td>
									<td>Phone Number</td>
									<td>Party Size</td>
									<td>Date</td>
								</tr>
							</thead>
							<tbody class="table-body">
								{reservationHistoryData &&
								reservationHistoryData.length ? (
									reservationHistoryData.map(
										(reservation, index) => {
											const date = new Date(
												reservation.reservationTime
											)
											return (
												<tr key={index}>
													<td>
														{reservation.reservationNumber.substring(
															0,
															8
														)}
													</td>
													<td>{reservation.name}</td>
													<td>{reservation.phone}</td>
													<td>
														{reservation.partySize}
													</td>
													<td>
														{date.toLocaleDateString(
															"en-us",
															{
																year: "numeric",
																month: "short",
																day: "numeric",
																hour: "numeric",
																minute: "numeric",
																hour12: true,
															}
														)}
													</td>
												</tr>
											)
										}
									)
								) : (
									<tr>
										<td colSpan={5}>No Data</td>
									</tr>
								)}
							</tbody>
						</Table>
					</Tab>
				</Tabs>
			) : (
				<></>
			)}
		</div>
	)
}

export default User
