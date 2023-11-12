import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Button, Form } from "react-bootstrap"
import axios from "axios"
import Swal from 'sweetalert2'

const Reservation = () => {
	const axiosApi = axios.create({ baseURL: "http://localhost:9000/api/" })
	const [timeOptions, setTimeOptions] = useState([])
	const [partySizeAvailable, setPartySizeAvailable] = useState("")
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		reservationDate: "",
		reservationTime: "Choose...",
		partySize: 0,
	})

	useEffect(() => {
		if (
			formData.reservationDate.length &&
			formData.reservationDate !== "Choose..."
		) {
			setTimeOptions([{ title: "Loading ...", value: "Choose..." }])
			axiosApi
				.post(`reservation/getTime`, {
					reservationDate: formData.reservationDate,
					partySize: formData.partySize > 0 ? formData.partySize : 1,
				})
				.then((response) => {
					console.log(response)
					setTimeOptions([
						{ title: "Please choose time", value: "Choose..." },
						...response.data.times,
					])
				})
		} else {
			setTimeOptions([
				{ title: "Please choose date", value: "Choose..." },
			])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formData.reservationDate])
	useEffect(() => {
		if (formData.reservationTime && timeOptions.length) {
			const timeOption = timeOptions.filter(
				(val) =>
					val.value.toString() === formData.reservationTime.toString()
			)
			if (timeOption.length) {
				setPartySizeAvailable(
					`(${timeOption[0].partySize
						? timeOption[0].partySize
						: 0
					} available)`
				)

				// if the party size entered is greater than the party size coming from the DB, then set the partysize to max possible
				if (
					formData.partySize >
					timeOptions.filter(
						(val) =>
							val.value.toString() ===
							formData.reservationTime.toString()
					)[0].partySize
				)
					setFormData({
						...formData,
						partySize: timeOptions.filter(
							(val) =>
								val.value.toString() ===
								formData.reservationTime.toString()
						)[0].partySize,
					})
			} else {
				setFormData({ ...formData, partySize: "" })
			}
		}
	}, [
		timeOptions,
		formData.reservationDate,
		formData.reservationTime,
		formData.partySize,
	])

	function submitForm(e) {
		e.preventDefault()
		// e.target refers to whatever the target the action happened on
		let { name, phone, reservationDate, reservationTime, partySize } =
			Object.fromEntries(new FormData(e.target))

		axiosApi
			.post(`reservation/createReservation`, {
				name,
				phone,
				partySize,
				reservationDate,
				reservationTime,
			})
			.then((response) => {
				// axiosApi
				// 	.post(`reservation/getPartySizes`, {
				// 		reservationTime
				// 	})
				// 	.then((response) => {
				// 		setPartySizeAvailable(`(${response.data.availablePartySize} available)`)
				// 	})
				// const timeOption = timeOptions.filter(
				// 	(val) => val.value.toString() === formData.reservationTime.toString()
				// )
				// setPartySizeAvailable(`${timeOption[0].partySize-formData.partySize ? timeOption[0].partySize-formData.partySize : 0
				// 		}`)
				

				Swal.fire({
					title: "Are you sure you want this reservation?",
					icon: "question",
					showCancelButton: true,
					confirmButtonColor: "#28a745",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes!"
				}).then((result) => {
					if (result.isConfirmed) {
						Swal.fire({
							title: 'Reservation Booked',
							text: 'You are confirmed! We plan to see you at ' + new Date(parseInt(reservationTime)).toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true }),
							icon: 'success',
							confirmButtonText: 'Cya Then'
						})

						setFormData({
							name: "",
							phone: "",
							reservationDate: "",
							reservationTime: "",
							partySize: "",
						})
						setPartySizeAvailable("")
					}
				});


			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div className="text-center">
			<Container>
				<Row>
					<Col>
						<Form id="reservationForm" onSubmit={submitForm}>
							<Row className="mb-3">
								<Form.Group as={Col}>
									<Form.Label>Name</Form.Label>
									<Form.Control
										className="text-center"
										name="name"
										type="string"
										value={formData.name}
										onChange={(e) => {
											// setName(e.target.value)
											setFormData({
												...formData,
												name: e.target.value,
											})
										}}
										required
									/>
								</Form.Group>

								<Form.Group as={Col}>
									<Form.Label>Phone Number</Form.Label>
									<Form.Control
										className="text-center"
										name="phone"
										type="number"
										value={formData.phone}
										onChange={(e) => {
											// setPhone(e.target.value)
											setFormData({
												...formData,
												phone: e.target.value,
											})
										}}
										required
									/>
								</Form.Group>
							</Row>

							<Row className="mb-3">
								<Form.Group as={Col}>
									<Form.Label>Date</Form.Label>
									<Form.Control
										className="text-center"
										name="date"
										type="date"
										value={formData.reservationDate}
										onChange={(e) => {
											// setReservationDate(e.target.value)
											setFormData({
												...formData,
												reservationDate: e.target.value,
											})
										}}
										required
									/>
								</Form.Group>

								<Form.Group as={Col}>
									<Form.Label>Time</Form.Label>
									<Form.Select
										name="reservationTime"
										className="text-center"
										defaultValue={formData.reservationTime}
										onChange={(e) =>
											// setReservationTime(e.target.value)
											setFormData({
												...formData,
												reservationTime: e.target.value,
											})
										}
										required
									>
										{timeOptions.length ? (
											timeOptions.map((val, i) => {
												let disabledOption = false
												if (val.reservedNotice)
													val.reservedNotice.map(
														(reserved) => {
															console.log(
																val.defaultTitle +
																new Date(
																	parseInt(
																		reserved,
																		10
																	)
																)
															)
															// if(timeOptions.filter(tOptions => tOptions.defaultValue === reserved && tOptions.disabled===true).length){
															// 	disabledOption = true
															// }
														}
													)
												return (
													<option
														key={i}
														value={val.value}
														disabled={
															val.disabled ||
															disabledOption
														}
													>
														{val.title}
													</option>
												)
											})
										) : (
											<option value={"Choose..."}>
												Please choose date
											</option>
										)}
									</Form.Select>
								</Form.Group>
							</Row>
							<Row className="mb-3">
								<Form.Group as={Col}>
									<Form.Label>
										Party Size {partySizeAvailable}
									</Form.Label>
									<Form.Control
										className="text-center"
										name="partySize"
										onChange={(e) => {
											if (e.target.value > 0)
												setFormData({
													...formData,
													partySize: e.target.value,
												})
											else
												setFormData({
													...formData,
													partySize: "",
												})
										}}
										value={formData.partySize}
										type="number"
										placeholder="Party Size"
										required
									/>
								</Form.Group>
							</Row>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

// Name, Contact info, Party size (number of guests), Date and time picker, some way to track already selected slots

export default Reservation
