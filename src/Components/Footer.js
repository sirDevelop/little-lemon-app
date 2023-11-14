import { Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faTwitterSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	const socials = [
		{
			icon: faEnvelope,
			url: "mailto: littleLemonFakeEmail@gmail.com",
		},
		{
			icon: faFacebookSquare,
			url: "https://facebook.com/littleLemonFakeFacebook",
		},
		{
			icon: faTwitterSquare,
			url: "https://www.twitter.com/littleLemonFakeTwitter",
		},
		{
			icon: faInstagram,
			url: "https://www.instagram.com/littleLemonFakeInstagram",
		},
	];

	return (
		<footer
			className="bg-body-tertiary mt-auto rounded-top-5 text-white py-3"
			bg="dark"
			data-bs-theme="dark"
		>
			<Container>
				<Row>
					<Col lg={3}>
						<p> 
							<h3> 🍋 Little Lemon 🍋 </h3>
						</p>
						<p>
							A Taste of Italy in the Heart of Chicago
						</p>
					</Col>
					<Col lg={3}></Col>
					<Col lg={3}></Col>
					<Col lg={3}>
						{socials.map(social => {
								return (
									<a href={social.url} target="_blank" className="mx-3">
										<FontAwesomeIcon icon={social.icon} size="2x" />
									</a>
								)
							})
						}
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
