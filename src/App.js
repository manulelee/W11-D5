import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeComponent from "./components/HomeComponent";
import NotFoundComponent from "./components/NotFoundComponent";
import NavbarComponent from "./components/NavbarComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PlayerComponent from "./components/PlayerComponent";
import AlbumComponent from "./components/AlbumComponent";
import ArtistComponent from "./components/ArtistComponent";
import FavouriteSongsComponent from "./components/FavouriteSongsComponent";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Container fluid>
          <Row>
            <NavbarComponent />
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/album/:id" element={<AlbumComponent />} />
              <Route path="/artist/:id" element={<ArtistComponent />} />
              <Route path="/favourites" element={<FavouriteSongsComponent />} />
              <Route path="/*" element={<NotFoundComponent />} />
            </Routes>
            <PlayerComponent />
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
