import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import {useRef,useState,useMemo} from "react"
import { faCartArrowDown, faMugHot } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"

function Nav({cart, setCart,menuOptions, setMenuOptions}) {
    const cartRef = useRef()
    const [cartOpen, setCartOpen] = useState()
    const axiosApi = useMemo(() => {
		return axios.create({ baseURL: "http://localhost:9000/api/" })
	}, [])


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
                {/* <li className="mx-2">
                    <a>Order Online</a>
                </li> */}
                <li className="mx-2">
                    <a>Login</a>
                </li>
            </ul>
            <div className="cart-wrapper me-auto border border-2 p-2" onClick={(e) => {
                if(!e.target.classList.contains("cart") && e.target.nodeName !== "BUTTON") setCartOpen(!cartOpen)
                }}>
                <FontAwesomeIcon icon={faCartArrowDown} />
                <i className="cart-count">{cart.length}</i>
                <div className={`cart border shadow p-3 bg-dark ${cartOpen? "active":""}`}>
                    {cart.map((val,index)=> {
                        let item = menuOptions.filter(menuOption => menuOption._id === val.id)
                        if(item.length)
                            return <>{item[0].title} <button onClick={() => {
                                setCart([
                                    // chooses every val item except the current id
                                    ...cart.filter(val=> val.quantity>1).map(val=> {
                                        if(val.id === item[0]._id)
                                            return {id: val.id, quantity: val.quantity === 0 ? 0:val.quantity-1}
                                        else
                                            return val
                                    })
                                ])
                            }}>-</button>{val.quantity}<button onClick={() => {
                                setCart([
                                    // chooses every val item except the current id
                                    ...cart.map(val=> {
                                        if(val.id === item[0]._id)
                                            return {id: val.id, quantity: val.quantity+1}
                                        else
                                            return val
                                    })
                                ])
                            }}>+</button><br/></>
                        else return <></>
                    })}
                    {/* btn-primary */}
                    {/* btn-info */}
                    {/* btn-light */}
                    {/* btn-dark */}
                    {/* btn-warning */}
                    {/* btn-danger */}
                    {/* btn-success */}
                    {cart.length ? <Link to="/checkout"><button className="btn btn-success" onClick={() => setCartOpen(!cartOpen)}>Checkout</button></Link>:<></>}
                    
                </div>
            </div>
        </div>
    );
}

export default Nav;