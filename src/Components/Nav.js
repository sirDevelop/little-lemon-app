import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { useRef, useState, useMemo, useEffect } from "react"
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { Col, Card } from "react-bootstrap"
import { useCookies } from 'react-cookie';

function Nav({ cart, setCart, menuOptions, setMenuOptions }) {
    const [cookies, setCookie, removeCookie] = useCookies(['cart']);
    const cartRef = useRef()
    const [cartOpen, setCartOpen] = useState()
    const axiosApi = useMemo(() => {
        return axios.create({ baseURL: "http://localhost:9000/api/" })
    }, [])

    useEffect(() => {
        if(cookies.cart && cookies.cart.length > 0) {
            setCart(cookies.cart)
        }
      }, [])

    useEffect(() => {
        setCookie('cart', cart, { path: '/' });
    }, [cart]);

    return (
        <div className="nav align-items-center">
            <div className="logo ms-auto">
                <img width="250px" src="./images/logo1.jpg"></img>
            </div>
            <ul>
                <li className="mx-2">
                    <Link to="/">Home</Link>
                </li>
                <li className="mx-2">
                    <Link to="/about">About</Link>
                </li>
                <li className="mx-2">
                    <Link to="/menu">Menu</Link>
                </li>
                <li className="mx-2">
                    <Link to="/reservation">Reservations</Link>
                </li>
                <li className="mx-2">
                    <a>Login</a>
                </li>
            </ul>
            <div className="cart-wrapper me-auto border border-2 p-2" onClick={(e) => {
                if (!e.target.classList.contains("cart") && e.target.nodeName !== "BUTTON") setCartOpen(!cartOpen)
            }}>
                
                <FontAwesomeIcon icon={faCartArrowDown} />
                <i className="cart-count">{cart ? cart.length: 0}</i>
                <div className={`cart border shadow p-3 bg-dark ${cartOpen ? "active" : ""}`}>
                    {
                        cart && cart.length ?
                            cart.map((val, index) => {
                                let item = menuOptions.filter(menuOption => menuOption._id === val.id)
                                if (item.length)
                                    return <>{item[0].title} <button onClick={() => {
                                        setCart([
                                            ...cart.filter(
                                                (valFilter, indexFilter) => (indexFilter ===
                                                    index && valFilter.quantity >
                                                    1) || indexFilter !==
                                                    index).map(
                                                        (
                                                            valFilter,
                                                            indexFilter
                                                        ) => {
                                                            if (
                                                                indexFilter ===
                                                                index
                                                            )
                                                                return {
                                                                    ...valFilter,
                                                                    quantity:
                                                                        valFilter.quantity -
                                                                        1,
                                                                }
                                                            else
                                                                return valFilter
                                                        }
                                                    ),
                                        ])
                                    }}>-</button>{val.quantity}<button onClick={() => {
                                        setCart([
                                            ...cart.map(
                                                (
                                                    valFilter,
                                                    indexFilter
                                                ) => {
                                                    if (
                                                        indexFilter ===
                                                        index
                                                    )
                                                        return {
                                                            ...valFilter,
                                                            quantity:
                                                                valFilter.quantity +
                                                                1,
                                                        }
                                                    else
                                                        return valFilter
                                                }
                                            ),
                                        ])
                                    }}>+</button><br /></>
                                else return <></>
                            }) :
                            <>{
                                <Col
                                    key={1}
                                    sm={6}
                                    className="p-2 d-flex flex-wrap"
                                >
                                    <Card className="border-1 shadow d-flex flex-column p-2">
                                        Wow, such empty
                                        <Card.Img
                                            variant="top"
                                            src="./images/doge.png"
                                        />
                                    </Card>
                                </Col>
                            }</>
                    }
                    {/* btn-primary */}
                    {/* btn-info */}
                    {/* btn-light */}
                    {/* btn-dark */}
                    {/* btn-warning */}
                    {/* btn-danger */}
                    {/* btn-success */}
                    {cart.length ? <Link to="/checkout"><button className="btn btn-success" onClick={() => setCartOpen(!cartOpen)}>Checkout</button></Link> : <></>}
                </div>
            </div>
        </div>
    );
}

export default Nav;