import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";

const NavbarComponent = () => {
  const dispatch = useDispatch();

  let headers = new Headers({
    // sets the headers
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
  });

  const addSearchResult = (songs) => {
    dispatch({
      type: "SEARCH_ALBUM",
      payload: songs,
    });
  };

  const search = async () => {
    let searchQuery = document.querySelector("#searchField").value; // gets the value from the search box

    if (searchQuery.length > 2) {
      //if there's a value in the search box => fetch the information from rapidapi & display the result
      document.querySelector("#searchResults").style.display = "block";

      try {
        let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + searchQuery, {
          method: "GET",
          headers,
        }); // gets the information

        if (response.ok) {
          let result = await response.json(); // transforms the response to json
          let songs = result.data; // gets the songs info
          addSearchResult(songs);
          console.log("RISULTATO RICERCA: ", songs);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      //else just hide the section!
      document.querySelector("#searchResults").style.display = "none";
    }
  };

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
            <Nav className=" flex-column mt-5">
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
              <Nav.Item>
                <InputGroup className="mt-3 w-75 ms-2">
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="searchField"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <Button
                      variant="secondary"
                      className="btn-outline btn-sm"
                      type="button"
                      id="button-addon1"
                      onClick={() => {
                        search();
                      }}
                    >
                      GO
                    </Button>
                  </div>
                </InputGroup>
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
