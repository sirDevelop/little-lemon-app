import React, { useEffect, useMemo, useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import axios from "axios"
import { BarLoader, BounceLoader } from "react-spinners"
import { Link } from "react-router-dom"
import { useCookies } from 'react-cookie';
import { useGlobals } from "./useGlobals"


const Menu = () => {
    const {cart, setCart, menuOptions, setMenuOptions} = useGlobals()
    const [cookies, setCookie, removeCookie] = useCookies(['cart']);
    
    useEffect(() => {
        if(cookies.cart.length > 0) {
            setCart(cookies.cart)
        }
      }, [])

    useEffect(() => {
        setCookie('cart', cart, { path: '/' });
    }, [cart]);

    return (
        <div className="text-center">
            <Container>
                <Row className="">
                    {menuOptions.length ? (
                        menuOptions.map((val, i) => {

                            return (
                                <Col
                                    key={i}
                                    sm={3}
                                    className="p-2 d-flex flex-wrap"
                                >
                                    <Card className="border-1 shadow d-flex flex-column p-2">
                                        <Card.Img
                                            variant="top"
                                            src={val.imageURL}

                                        />
                                        <Card.Body>
                                            <Card.Title>{val.title}</Card.Title>
                                            <Card.Text>
                                                {val.description}
                                            </Card.Text>
                                            <Button onClick={() => {
                                                // cart[{id: idOfMenuOption(HotDog), quantity: 1}]
                                                let currentOption = cart.filter(cart => cart.id === val._id)
                                                let quantity = currentOption.length ? currentOption[0].quantity + 1 : 1
                                                if (quantity === 1) {
                                                    setCart([
                                                        // ...cart chooses every cart item except the current id
                                                        ...cart,
                                                        { id: val._id, quantity, title: val.title, price: val.price }
                                                    ])
                                                } else {
                                                    setCart([
                                                        // chooses every cart item except the current id
                                                        ...cart.map(cartVal => {
                                                            if (cartVal.id === val._id)
                                                                return { id: val._id, quantity, title: val.title, price: val.price  }
                                                            else
                                                                return cartVal
                                                        })
                                                    ])
                                                }
                                            }} variant="primary">
                                                Add To Cart
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    ) : (
                        <>{
                            [0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                                return <Col
                                    key={i}
                                    sm={3}
                                    className="p-2 d-flex flex-wrap"
                                >
                                    <Card className="border-1 shadow d-flex flex-column p-2">
                                        <BounceLoader
                                            color="#cc0000"
                                            className="mx-auto"
                                        />
                                        <Card.Body>
                                            <Card.Text>
                                                <BarLoader
                                                    color="#cc0000"
                                                    className="mx-auto"
                                                />
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            })
                        }</>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default Menu