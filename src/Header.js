import companyLogo from './images/logo1.jpg';

function Header(props) {
    return (
    <h1>
        Hello, {props.name}
        <img src={companyLogo} alt="Little Lemon Logo"/>
    </h1>
    );
  }

export default Header;