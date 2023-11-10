import { Link } from "react-router-dom";

function Nav(props) {
    return (
        <div className="nav align-items-center">
            <div className="logo ms-auto">
                <img width="250px" src="./images/logo1.jpg"></img>
            </div>
            <ul className="me-auto">
                <li className="mx-2">
                    <Link to="/">Home</Link>
                </li>
                <li className="mx-2">
                    <a>About</a>
                </li>
                <li className="mx-2">
                    <Link to="/menu">Menu</Link>
                </li>
                <li className="mx-2">
                    <Link to="/reservation">Reservations</Link>
                </li>
                <li className="mx-2">
                    <a>Order Online</a>
                </li>
                <li className="mx-2">
                    <a>Login</a>
                </li>
            </ul>
        </div>
    );
}

export default Nav;