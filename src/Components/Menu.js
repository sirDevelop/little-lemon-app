import React, {useEffect,useState} from 'react'
import {Container, Row, Col} from "react-bootstrap"
import LoadingIcons from 'react-loading-icons'
import { Bars } from 'react-loading-icons'

import axios from "axios"

const Menu = () => {
	const axiosApi = axios.create({ baseURL: "http://localhost:9000/api/" })
	let isLoaded = false
	const [menuOptions, setMenuOptions] = useState([])
	useEffect(() => {
	  if(!isLoaded){
		axiosApi.get("/menuOptions/getMenuOptions").then((response)=>{
			console.log(response.data.getAllMenuOptions);
			setMenuOptions[response.data.getAllMenuOptions]
		})
	  }
	}, [isLoaded])
	const orderOnline = (id) => {
		axiosApi.post("/menuOptions/orderOnline", {id}).then((response)=>{
            //we make a post request, data is id of what they ordered
            //findOne from id - and get the title here
            
			alert(response.data.message)
			// response.data.message // your order succuessfully placed
		})
	}
	
  return (
	<div className="text-center">
            <LoadingIcons.Bars />
			<Bars />
            
			<Container>
				<Row>
					{
						isLoaded && menuOptions.length?
						menuOptions.map((val,i) => {
							<Col key={i} sm={4}>
								<img width="200px" src={val.imageURL} />
								<h4>{val.title}</h4>
								<p>{val.description}</p>
								<button onClick={orderOnline(val._id)}>Order</button>
							</Col>
						}):
						<>
							<Col sm={4}>
								<img width="200px" src="./images/loading.gif" />
								<h4>Loading...</h4>
								<button disabled>Loading</button>
							</Col>
							<Col sm={4}>
								<img width="200px" src="./images/loading.gif" />
								<h4>Loading...</h4>
								<button disabled>Loading</button>
							</Col>
							<Col sm={4}>
								<img width="200px" src="./images/loading.gif" />
								<h4>Loading...</h4>
								<button disabled>Loading</button>
							</Col>
						</>
					}
				</Row>
			</Container>
		</div>
  )
}

export default Menu