import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartArrowDown, faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation } from "react-router-dom"
import { useGlobals } from "./useGlobals"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import { Badge } from "react-bootstrap"

const Navigation = () => {
	const pathName = useLocation().pathname
	const { cart, setCartOpen, loggedIn, openLogin } = useGlobals()
	return (
		<Navbar
			className="bg-body-tertiary mb-3 rounded-bottom-5"
			bg="dark"
			data-bs-theme="dark"
			expand={"md"}
		>
			<Container fluid>
				<Navbar.Brand href="#">
					<img width="250px" src="./images/logo1.jpg" alt="logo" />
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Offcanvas placement="end">
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>
							<img
								width="250px"
								src="./images/logo1.jpg"
								alt="logo"
							/>
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-start flex-grow-1 pe-3">
							<Nav.Link
								as={Link}
								to="/"
								className={`${
									pathName === "/" || pathName === ""
										? "active"
										: ""
								}`}
							>
								Home
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/about"
								className={`${
									pathName === "/about" ||
									pathName === "about"
										? "active"
										: ""
								}`}
							>
								About
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/menu"
								className={`${
									pathName === "/menu" || pathName === "menu"
										? "active"
										: ""
								}`}
							>
								Menu
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/reservation"
								className={`${
									pathName === "/reservation" ||
									pathName === "reservation"
										? "active"
										: ""
								}`}
							>
								Reservations
							</Nav.Link>
						</Nav>
						{!loggedIn ? <Button
							className="mx-2"
							onClick={openLogin}
							variant="outline-success"
						>
							<FontAwesomeIcon icon={faSignInAlt} />
						</Button>:<></>}
						<Button
							className="me-2"
							onClick={() => setCartOpen(true)}
							variant="outline-success"
						>
							<FontAwesomeIcon icon={faCartArrowDown} />
							{cart && cart.length ? (
								<>
									<Badge className="ms-2" pill bg="primary">
										{cart ? cart.length : 0}
									</Badge>
								</>
							) : (
								<></>
							)}
						</Button>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default Navigation
