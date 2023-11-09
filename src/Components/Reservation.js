import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Button, Form } from "react-bootstrap"
import axios from "axios"

const Reservation = () => {
	const axiosApi = axios.create({ baseURL: "http://localhost:9000/api/" })
	const [reservationDate, setReservationDate] = useState("")
	const [reservationTime, setReservationTime] = useState("Choose...")
	const [timeOptions, setTimeOptions] = useState([])
	const getTimeOptions = (starter, ender, gap) => {
		// getTimeOptions([H,M],[H,M],[H,M])
		// getTimeOptions([10,0],[19,0], [0,30])
		let options = []
		const start = new Date(
			`${reservationDate} ${starter[0]}:${starter[1]}:00`
		)
		const end = new Date(`${reservationDate} ${ender[0]}:${ender[1]}:00`)
		if (/* reservationDate */ 0) {
			options = [
				...options,
				<option key={-1} value={"Choose..."} disabled>
					Choose...
				</option>,
			]
			while (start <= end) {
				options = [
					...options,
					<option key={start.getTime()} value={start.getTime()}>
						{start.toLocaleString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
							timeZone:
								Intl.DateTimeFormat().resolvedOptions()
									.timeZone,
						})}
					</option>,
				]
				start.setHours(
					start.getHours() + gap[0],
					start.getMinutes() + gap[1]
				)
			}
		} else {
			options = [
				...options,
				<option key={-1} value={"Choose..."} disabled>
					Please select date
				</option>,
			]
		}
		return options
	}

	const [partySize, setPartySize] = useState(1)
	const [tables, setTables] = useState({
		small: { maxPartySize: 2, available: 4 },
		medium: { maxPartySize: 4, available: 4 },
		large: { maxPartySize: 6, available: 4 },
	})

	useEffect(() => {
		const available =
			tables.small.maxPartySize * tables.small.available +
			tables.medium.maxPartySize * tables.medium.available +
			tables.large.maxPartySize * tables.large.available
		if (partySize > available) {
			setPartySize(available)
		}
	}, [tables, partySize])
	// restaurant close at 7:30, last possible select time is 7:00 PM
	// 

	useEffect(() => {
		axiosApi
				.post(`reservation/check`, { reservationDate })
				.then((response) => {
					setTimeOptions(response.data.reservationTimes)
					// set
				})
	}, [reservationDate])

	function submitForm(e) {
		e.preventDefault()
		let form = e.target
		// e.target refers to whatever the target the action happened on
		let data = Object.fromEntries(new FormData(form))
		console.log(data)
	}

	return (
		<div className="text-center">
			<Container>
				<Row>
					<Col>
						<Form onSubmit={submitForm}>
							<Row className="mb-3">
								<Form.Group as={Col}>
									<Form.Label>Date</Form.Label>
									<Form.Control
										className="text-center"
										type="date"
										onChange={(e) => {
											setReservationDate(e.target.value)
										}}
										value={reservationDate}
									/>
								</Form.Group>

								<Form.Group as={Col}>
									<Form.Label>Time</Form.Label>
									<Form.Select
										className="text-center"
										defaultValue={reservationTime}
										onChange={(e) =>
											setReservationTime(e.target.value)
										}
									>
										{timeOptions.map((val) => {
											return <option>{val.hours + ":" + val.minutes}</option>
										})}
									</Form.Select>
								</Form.Group>
							</Row>
							<Row className="mb-3">
								<Form.Group as={Col}>
									<Form.Label>Party Size</Form.Label>
									<Form.Control
										className="text-center"
										onChange={(e) => {
											setPartySize(e.target.value)
										}}
										value={partySize}
										type="text"
										placeholder="Party Size"
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
