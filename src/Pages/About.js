import parse from 'html-react-parser';

import { Container, Row, Col, Card } from "react-bootstrap"

const About = () => {
	const sectionInfo = [{
		heading: "Our Italian Roots", description: `
	In the heart of Chicago, where the winds from Lake Michigan carry tales of dreams and opportunities, there was a little Italian restaurant with a big story. Little Lemon, as it came to be known, was more than just a place to savor the rich flavors of Italy; it was a testament to the resilience and love of a couple who turned their immigrant dreams into a thriving reality.
<br>
<br>
Antonio and Isabella, a young couple from a small village in Italy, arrived in Chicago with nothing but their passion for authentic Italian cuisine and an unwavering determination to build a better life. The bustling streets, towering skyscrapers, and the promise of the American dream greeted them as they embarked on a journey filled with hope.
<br>
<br>
Their first years in Chicago were a struggle. Antonio worked odd jobs, while Isabella took on cleaning and babysitting gigs. The dream of opening a restaurant seemed distant, but their shared vision fueled their perseverance. Late nights were spent refining recipes, and spare moments were dedicated to envisioning the warm ambiance of their future establishment.
<br>
<br>
One day, after years of saving every hard-earned dollar, Antonio and Isabella stumbled upon a small, humble space. With a little imagination, they saw more than just four walls; they saw the heart of Little Lemon. The name was a nod to their roots — the citrus groves of Italy and the fresh, vibrant flavors they intended to bring to their new community.
<br>
<br>
The couple poured their love into every detail of the restaurant. Isabella adorned the walls with family photos and snapshots of the Italian countryside, creating an atmosphere that felt like home. Antonio, with his culinary prowess inherited from generations past, crafted a menu that celebrated the diversity of Italian cuisine, from the rolling hills of Tuscany to the bustling streets of Naples.
<br>
<br>
Word spread quickly through the neighborhood about the charming Italian couple who had turned a simple space into a culinary haven. The aroma of garlic and tomatoes wafting through the air became a beacon for food enthusiasts, drawing them into the warm embrace of Little Lemon.
<br>
<br>
As the restaurant flourished, so did the couple's connection with the community. Little Lemon became more than a place to enjoy a delicious meal; it became a gathering spot for celebrations, a refuge for comforting conversations, and a symbol of triumph over adversity.
<br>
<br>
Antonio and Isabella's story resonated with the people of Chicago — a story of humble beginnings, hard work, and the transformative power of love. Little Lemon was not just a restaurant; it was a living testament to the American dream, a dream brought to life by the hands and hearts of two immigrants who found a home in a city of endless possibilities.
<br>
<br>
And so, the aroma of garlic and tomatoes continued to fill the air around Little Lemon, not just as a tantalizing invitation to savor delectable dishes but as a reminder that dreams, no matter how humble, can grow into something extraordinary. Little Lemon, with its warm ambiance and flavorful offerings, stood as a beacon of inspiration, inviting all who entered to savor not only the taste of Italy but the sweet fruits of perseverance and love.
	`}]

	return (
		<div className="text-center">
			<Container>
				<Row>
					<Col
						lg={12}
						className="p-2 d-flex flex-wrap"
					>
						{
							sectionInfo.map((val, i) => {
								return (

									<Card className="border-1 shadow d-flex flex-column p-2 bg-light lead">
										{/* <Card.Img
												variant="top"
												src={val.imageURL}
											/> */}
										<Card.Body>
											<Card.Title className='display-3'>{val.heading}</Card.Title>
											<Card.Text>
												{parse(val.description)}
											</Card.Text>
										</Card.Body>
									</Card>
								)
							})
						}
					</Col>

				</Row>
			</Container>
		</div>
	)
}

export default About
