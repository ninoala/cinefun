import { useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from '../assets/logo.png'

const Header = () => {
    //useLocation hook for pathname in the bootsrap navbar
    const { pathname } = useLocation();

  return (
    <header className="header">
      <Navbar bg="black" variant="dark" expand="md">
        <Container className="header__nav">
          <Navbar.Brand href="/">
              <img className="header__logo" src={Logo} alt="Website logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" active={pathname === "/"} className='header__link'>HOME</Nav.Link>
              <Nav.Link href="/about" active={pathname === "/about"} className='header__link'>ABOUT</Nav.Link>
              <Nav.Link href="/favorites" active={pathname === "/favorites"} className='header__link'>FAVOURITES</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header