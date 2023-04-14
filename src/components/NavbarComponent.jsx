import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Col xs={2}>
      <Navbar
        className="navbar-expand-lg navbar-expand-md navbar-white bg-navbar fixed-left justify-content-between"
        id="sidebar"
      >
        <div className="nav-container">
          <Navbar.Brand>
            <img src="/assets/images/Spotify_Logo.png" alt="Spotify_Logo" width={131} height={40} />
          </Navbar.Brand>
          <Button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </Button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <Nav className=" flex-column">
              <Nav.Item>
                <Link className="nav-item nav-link" to="/">
                  <i className="fas fa-home fa-lg" />
                  &nbsp; Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-item nav-link" to="/favourites">
                  <i className="fas fa-book-open fa-lg" />
                  &nbsp; Your Library
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <div className="nav-btn">
          <button className="btn signup-btn" type="button">
            Sign Up
          </button>
          <button className="btn login-btn" type="button">
            Login
          </button>
          <Link to="/CookiePolicy">Cookie Policy</Link> |<Link to="/Privacy"> Privacy</Link>
        </div>
      </Navbar>
    </Col>
  );
};

export default NavbarComponent;
