import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopNavbar from "./TopNavbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AlbumComponent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const favouritesSongs = useSelector((state) => state.data.favouriteSongs);

  const [albumTracks, setAlbumTracks] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  let tracksArray = [];

  const addSongToFavourites = (song) => {
    dispatch({
      type: "ADD_FAVOURITES_SONG",
      payload: song,
    });
    console.log(song.title + " aggiunta ai preferiti");
    console.log(favouritesSongs);
  };

  const removeSongToFavourites = (song) => {
    dispatch({
      type: "REMOVE_FAVOURITES_SONG",
      payload: song,
    });
    console.log(song.title + " rimossa dai preferiti");
    console.log(favouritesSongs);
  };

  const selectSong = (song) => {
    dispatch({
      type: "SELECT_SONG",
      payload: song,
    });
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

      if (response.ok) {
        let album = await response.json(); // transforms the response into a JSON
        for (let i = 0; i < album.tracks.data.length; i++) {
          tracksArray.push(album.tracks.data[i]);
        }
        setAlbumData([tracksArray[0]]);
        setAlbumTracks(tracksArray);
        console.log(tracksArray[0]);
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
        <Col md={3} className="pt-5 text-center" id="img-container">
          {albumData.map((track) => {
            return (
              <span key={track.album.id}>
                <img src={track.album.cover} className="card-img img-fluid" alt="Album" />
                <div className="mt-4 text-center">
                  <p className="album-title">{track.album.title}</p>
                </div>
                <div className="text-center">
                  <p className="artist-name">{track.album.artist}</p>
                </div>
                <div className="mt-4 text-center">
                  <button id="btnPlay" className="btn btn-success" type="button">
                    Play
                  </button>
                </div>
              </span>
            );
          })}
        </Col>
        <Col md={8} className="p-5">
          <Row>
            <Col md={10} className="mb-5" id="trackList">
              {albumTracks.map((song, i) => {
                return (
                  <div
                    className="py-3 trackHover"
                    key={song.id}
                    onClick={() => {
                      selectSong(song);
                    }}
                  >
                    <span className="card-title trackHover px-3" style={{ color: "white" }}>
                      <i
                        className="fas fa-heart"
                        style={{ color: favouritesSongs.includes(song) ? "green" : "white" }}
                        onClick={() => {
                          favouritesSongs.includes(song) ? removeSongToFavourites(i) : addSongToFavourites(song);
                        }}
                      />{" "}
                      {song.title}
                    </span>
                    <small className="duration me-4" style={{ color: "white" }}>
                      {Math.floor(parseInt(song.duration) / 60)}:
                      {parseInt(song.duration) % 60 < 10
                        ? "0" + (parseInt(song.duration) % 60)
                        : parseInt(song.duration) % 60}
                    </small>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
export default AlbumComponent;
