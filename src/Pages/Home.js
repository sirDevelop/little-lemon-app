import { Container, Row, Col, Card } from "react-bootstrap"
import classNames from "classnames";

const Home = () => {
	const sectionInfo = [
		{
			heading: "🍋 Welcome to Little Lemon: A Slice of Italy in the Heart of Chicago 🍋",
			description: `Discover the soul of Italy right here in the Windy City at
		Little Lemon, your passport to an authentic Italian culinary experience.
		Nestled in the vibrant streets of Chicago, our
		restaurant brings the warmth of Italian hospitality and the zest
		of Mediterranean flavors to your table.`},
		{
			heading: "🇮🇹 Chicago's Own Little Italy 🇮🇹",
			description: `At Little Lemon, we're more than just an Italian restaurant;
		we're a culinary haven that captures the essence of Italy's
		diverse regions. From the bustling streets of Naples to the
		rolling hills of Tuscany, our menu reflects the rich tapestry of
		Italian cuisine. Indulge in classics like handmade pasta and
		wood-fired pizzas, all crafted with the finest locally sourced
		ingredients.`}
		,
		{
			heading: "🍅 Seasonal Sensations, Year-Round Delights 🍅",
			description: `Our commitment to freshness is unwavering. Little Lemon proudly
		embraces the seasons, offering a menu that evolves with the
		bounty of local markets. Taste the difference as our chefs
		transform the best ingredients Chicago has to offer into dishes
		that pay homage to the time-honored traditions of Italian
		cooking.`}
		,
		{
			heading: "🌆 Cityscape Ambiance with Italian Charm 🌆",
			description: `Escape the urban hustle and step into the warm embrace of Little
		Lemon. Our Chicago location exudes the charm of a classic
		Italian trattoria while embracing the modern energy of the city.
		Whether you're seeking a romantic evening, a family feast, or a
		spot to celebrate with friends, our welcoming atmosphere sets
		the stage for an unforgettable dining experience.`}
		,
		{
			heading: "🍷 Discover Italian Excellence, Glass by Glass 🍷",
			description: `Pair your meal with selections from our thoughtfully curated
		wine list, featuring both Italian gems and local favorites.
		Allow our knowledgeable staff to guide you through the perfect
		pairing, enhancing your dining adventure with each sip.`},
		{
			heading: "🎉 Host Your Event with Little Lemon Charm 🎉",
			description: `Celebrate your special moments with us! Little Lemon offers
		private event spaces and catering services, ensuring your
		gatherings are filled with the same culinary expertise and warm
		hospitality that define our restaurant.`}
		,
		{
			heading: "🍋 Reserve Your Table at Little Lemon: Where Chicago Meets Italy 🍋",
			description: `Join us at Little Lemon, the Italian gem in Chicago's culinary
		landscape. Whether you're a local seeking a taste of Italy or a
		visitor looking for an authentic experience, our doors are open,
		and our table is set for you. Reserve your table today and let
		Little Lemon be your go-to destination for the finest Italian
		dining in Chicago! 🌇✨`}
	]

	return (
		<div>
			<div className="text-center">
				<Container>
					{
						sectionInfo.map((val, i) => {
							return (
								<Row className="">
									<Col
										lg={12}
										className="p-2 d-flex flex-wrap"
									>
										<Card className={classNames("border-1", "shadow", "d-flex", "flex-column", "p-2", {
											"bg-info": (i % 2 == 0),
											"bg-warning": (i % 2 == 1),
										})}>
											{/* <Card.Img
												variant="top"
												src={val.imageURL}
											/> */}
											<Card.Body>
												<Card.Title>{val.heading}</Card.Title>
												<Card.Text>
													{val.description}
												</Card.Text>
											</Card.Body>
										</Card>

									</Col>

								</Row>
							)
						})
					}

				</Container>
			</div>
		</div>
	)
}

export default Home
