import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useDispatch, useSelector } from "react-redux";

const FavouriteSongsComponent = () => {
  const favouritesSongs = useSelector((state) => state.data.favouriteSongs);
  const dispatch = useDispatch();

  const removeSongToFavourites = (song) => {
    console.log(song.title + " rimossa dai preferiti");
    dispatch({
      type: "REMOVE_FAVOURITES_SONG",
      payload: song,
    });
    console.log(favouritesSongs);
  };

  const selectSong = (song) => {
    dispatch({
      type: "SELECT_SONG",
      payload: song,
    });
  };

  return (
    <Col md={8} className="p-5">
      <Row>
        <Col md={10} className="mb-5" id="trackList">
          {favouritesSongs.map((song, i) => {
            return (
              <div
                className="py-3 trackHover"
                key={song.id + String(i)}
                onClick={() => {
                  selectSong(song);
                }}
              >
                <span className="card-title trackHover px-3" style={{ color: "white" }}>
                  <i className="fas fa-heart" style={{ color: "green" }} onClick={() => removeSongToFavourites(i)} />{" "}
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
  );
};
export default FavouriteSongsComponent;
