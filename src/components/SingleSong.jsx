import { useDispatch } from "react-redux";

const SingleSong = (props) => {
  console.log("prova");

  const dispatch = useDispatch();

  const selectSong = (song) => {
    dispatch({
      type: "SELECT_SONG",
      payload: song,
    });
  };
  return (
    <div
      className="py-3 trackHover"
      style={{ color: "white" }}
      onClick={() => {
        selectSong(props);
      }}
    >
      <p>{props.title}</p>
      <small className="duration">
        {Math.floor(
          parseInt(props.duration) / 60 // setting the duration minutes
        )}
        :
        {parseInt(props.duration) % 60 < 10
          ? "0" + (parseInt(props.duration) % 60) // checking che duration seconds, if they are less than 10 a 0 is prefixed
          : parseInt(props.duration) % 60}
      </small>
    </div>
  );
};
export default SingleSong;
