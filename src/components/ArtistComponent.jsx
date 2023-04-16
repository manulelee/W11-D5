import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopNavbar from "./TopNavbar";

const ArtistComponent = () => {
  const params = useParams();

  const [albumData, setAlbumData] = useState([]);
  let artistAlbumArray = [];

  const fetchArtist = async () => {
    let artistId = params.id;

    let headers = new Headers({
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "222902beabmshb95a65b737cead6p1f3ac9jsn23ced94c0d20",
    });

    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId, {
        method: "GET",
        headers,
      });

      if (response.ok) {
        let artist = await response.json();

        // displaying the playButton
        let playButton = document.querySelector("#playButton");
        playButton.classList.remove("d-none");
        playButton.classList.add("d-inline");

        // displaying the followButton
        let followButton = document.querySelector("#followButton");
        followButton.classList.remove("d-none");
        followButton.classList.add("d-inline");

        // setting the artist name
        let titleMain = document.querySelector(".titleMain");
        titleMain.innerHTML = artist.name;

        // setting the followers section
        let followers = document.querySelector("#followers");
        followers.innerText = artist.nb_fan + " followers";

        let tracksResponse = await fetch(
          // await the fetch of the artist songs
          "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + artist.name,
          {
            method: "GET",
            headers,
          }
        );

        if (tracksResponse.ok) {
          let tracklist = await tracksResponse.json();
          for (let i = 0; i < tracklist.data.length; i++) {
            artistAlbumArray.push(tracklist.data[i]);
          }
          setAlbumData(artistAlbumArray);
        }
      } else {
        // something went wrong with the request --> i.e. headers missing, wrong HTTP Method
        document.querySelector("#apiLoaded").innerHTML = "NOT OK" + (await response.text());
      }
    } catch (exception) {
      // ex.: Url is not correct, Internal Server Error
      document.querySelector("#apiLoaded").innerHTML = exception;
    }
  };

  useEffect(() => {
    fetchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col xs={12} md={9} className="mt-4 offset-md-3 mainPage">
      <TopNavbar />
      <Row className="row">
        <Col xs={12} md={10} className="mt-5">
          <h2 className="titleMain"> </h2>
          <div id="followers" />
          <div className="d-flex justify-content-center" id="button-container">
            <Button variant="success" className="me-2 mainButton d-none" id="playButton">
              PLAY
            </Button>
            <Button variant="dark" className="btn-outline-light mainButton d-none" id="followButton">
              FOLLOW
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={10} className="offset-1 p-0">
          <div className="mt-4 d-flex justify-content-start">
            <h2 className="text-white font-weight-bold">Tracks</h2>
          </div>
          <div className="pt-5 mb-5">
            <Row id="apiLoaded">
              {albumData.map((album) => {
                return (
                  <div className="col-sm-auto col-md-auto text-center mb-5">
                    <Link to={"/album/" + album.album.id} className="text-decoration-none">
                      <img src={album.album.cover_big} className="card-img img-fluid" alt="Album" />
                      <div className="mt-4 text-center">
                        <p className="album-title">
                          {album.title.length < 16 ? album.title : album.title.substring(0, 16) + "..."}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="artist-name">{album.artist.name}</p>
                      </div>
                      <div className="mt-4 text-center"></div>
                    </Link>
                  </div>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </Col>
  );
};
export default ArtistComponent;
