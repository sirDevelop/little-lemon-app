import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Button, Form } from "react-bootstrap"
import axios from "axios"

const Reservation = () => {
	const axiosApi = axios.create({ baseURL: "http://localhost:9000/api/" })
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [reservationDate, setReservationDate] = useState("")
	const [reservationTime, setReservationTime] = useState("Choose...")
	const [timeOptions, setTimeOptions] = useState([])
	const [partySize, setPartySize] = useState("")
	const [partySizeAvailable, setPartySizeAvailable] = useState("")

	useEffect(() => {
		if (reservationDate.length) {
			setTimeOptions([{ title: "Loading ...", value: "Choose..." }])
			axiosApi
				.post(`reservation/getTime`, {
					reservationDate,
					partySize: partySize > 0 ? partySize : 1,
				})
				.then((response) => {
					console.log(response)
					setTimeOptions([{ title: "Please choose time", value: "Choose..." }, ...response.data.times])
				})
		} else {
			setTimeOptions([
				{ title: "Please choose date", value: "Choose..." },
			])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reservationDate])
	useEffect(() => {
		if (reservationTime && timeOptions.length) {
			const timeOption = timeOptions.filter(
				(val) => val.value.toString() === reservationTime.toString()
			)
			if (timeOption.length) {
				setPartySizeAvailable(
					`(${timeOption[0].partySize ? timeOption[0].partySize : 0
					} available)`
				)
				if (
					partySize >
					timeOptions.filter(
						(val) =>
							val.value.toString() === reservationTime.toString()
					)[0].partySize
				)
					setPartySize(
						timeOptions.filter(
							(val) =>
								val.value.toString() ===
								reservationTime.toString()
						)[0].partySize
					)
			} else {
				setPartySize("")
			}
		}
	}, [reservationTime, timeOptions, partySize])

	function submitForm(e) {
		e.preventDefault()
		// e.target refers to whatever the target the action happened on
		let {name, phone, reservationDate, reservationTime, partySize } = Object.fromEntries(new FormData(e.target))
		// console.log(name);	
		// console.log(phone);
		// console.log(reservationDate);
		// console.log(reservationTime); //looks like the reservation time is enough to build the date back up
		// console.log(new Date(Number(reservationTime)));
		// console.log(partySize);

		// By the way there is a bug here. 11/15 16:30 got booked for 56 people
		axiosApi
			.post(`reservation/createReservation`, {
				name, phone, partySize, reservationDate, reservationTime 
			})
			.then((response) => {
				console.log("response for create reservation", response)
				document.getElementById("reservationForm").reset(); //does not reset the form
				// document.getElementById("reservationForm").trigger('reset');
				alert("Succeeded!");
			}).catch(error => {
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
										value={name}
										onChange={(e) => {
											setName(e.target.value)
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
										value={phone}
										onChange={(e) => {
											setPhone(e.target.value)
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
										value={reservationDate}
										onChange={(e) => {
											setReservationDate(e.target.value)
										}}
										required
									/>
								</Form.Group>

								<Form.Group as={Col}>
									<Form.Label>Time</Form.Label>
									<Form.Select
										name={"reservationTime"}
										className="text-center"
										defaultValue={reservationTime}
										onChange={(e) =>
											setReservationTime(e.target.value)
										}
										required
									>
										{timeOptions.length ? (
											timeOptions.map((val, i) => {
												let disabledOption = false
												if (val.reservedNotice)
													val.reservedNotice.map(reserved => {
														console.log(val.defaultTitle + new Date(parseInt(reserved, 10)))
														// if(timeOptions.filter(tOptions => tOptions.defaultValue === reserved && tOptions.disabled===true).length){
														// 	disabledOption = true
														// }
													})
												return (
													<option
														key={i}
														value={val.value}
														disabled={val.disabled || disabledOption}
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
										min="1"
										onChange={(e) => {
											setPartySize(e.target.value)
										}}
										value={partySize}
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
