import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopNavbar from "./TopNavbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumComponent = () => {
  const params = useParams();
  const albumArt = (album) => {
    return `
            <img src="${album.cover}" class="card-img img-fluid" alt="Album" />
            <div class="mt-4 text-center">
                <p class="album-title">${album.title}</p>
            </div>
            <div class="text-center">
                <p class="artist-name">${album.artist.name}</p>
            </div>
            <div class="mt-4 text-center">
                <button id="btnPlay" class="btn btn-success" type="button">Play</button>
            </div>`;
  };

  const song = (track) => {
    return `
            <div class="py-3 trackHover">
                <a href="#" class="card-title trackHover px-3" style="color:white" >${track.title}</a>
                <small class="duration" style="color:white">${Math.floor(
                  parseInt(track.duration) / 60 // setting the duration minutes
                )}:${
      parseInt(track.duration) % 60 < 10
        ? "0" + (parseInt(track.duration) % 60) // checking che duration seconds, if they are less than 10 a 0 is prefixed
        : parseInt(track.duration) % 60
    }</small>
            </div>`;
  };

  const fetchAlbum = async () => {
    let albumId = params.id;

    let headers = new Headers({
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "c74a0a086emshf55ffb8dbdcb59ap17a486jsnb83bb4d3e387",
    });

    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId, {
        method: "GET",
        headers,
      });

      let imgContainer = document.querySelector("#img-container"); // gets a reference to the image container
      let trackList = document.querySelector("#trackList"); // gets a reference to the tracklist div

      if (response.ok) {
        let album = await response.json(); // transforms the response into a JSON
        imgContainer.innerHTML = albumArt(album); // creates the albumArt for the img-container
        for (let i = 0; i < album.tracks.data.length; i++) {
          let div = document.createElement("div");
          div.innerHTML += song(album.tracks.data[i]); // use "song" method to create the item
          trackList.appendChild(div); // add the item to the tracklist
        }
      } else {
        // something went wrong with the request --> i.e. headers missing, wrong HTTP Method
        document.querySelector("#img-container").innerHTML = "NOT OK" + (await response.text());
      }
    } catch (exception) {
      // ex.: Url is not correct, Internal Server Error
      document.querySelector("#img-container").innerHTML = exception;
    }
  };

  useEffect(() => {
    fetchAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Col xs={12} md={9} className="mt-4 offset-md-3 mainPage">
      <TopNavbar />
      <Row>
        <Col md={3} className="pt-5 text-center" id="img-container" />
        <Col md={8} className="p-5">
          <Row>
            <Col md={10} className="mb-5" id="trackList" />
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
export default AlbumComponent;
