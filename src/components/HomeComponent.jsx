import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TopNavbar from "./TopNavbar";
import FetchedAlbum from "./FetchedAlbum";
import { useSelector } from "react-redux";

const HomeComponent = () => {
  let rockArtists = ["queen", "u2", "thepolice", "eagles", "thedoors", "oasis", "thewho", "bonjovi"];
  let popArtists = ["maroon5", "coldplay", "onerepublic", "jamesblunt", "katyperry", "arianagrande"];
  let hipHopArtists = ["eminem", "salmo", "thaSup", "drake", "kanyewest"];

  const [rockAlbum, setRockAlbum] = useState([]);
  const [popAlbum, setPopAlbum] = useState([]);
  const [hipHopAlbum, setHipHopAlbum] = useState([]);

  const searchResult = useSelector((state) => state.data.search);
  let rockFetchedAlbum = [];
  let popFetchedAlbum = [];
  let hipHopFetchedAlbum = [];

  let headers = new Headers({
    // sets the headers
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
  });

  const handleArtist = async (artistName, setGenreState, genreFetchedArray) => {
    // artistName = "eminem", "metallica", etc...
    // domQuerySelector = "#rockSection" etc...
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + artistName, {
        method: "GET",
        headers,
      }); // gets the information
      if (response.ok) {
        let result = await response.json(); // transforms the response to json
        let songInfo = result.data[0];
        genreFetchedArray.push(songInfo);
        setGenreState(genreFetchedArray);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    let rockRandomArtists = [];
    let popRandomArtists = [];
    let hipHopRandomArtists = [];

    //document.querySelector("#searchField").value = ""; // empties search field on page load

    while (rockRandomArtists.length < 4) {
      // pushes elements inside the array until it has 4 strings
      let artist = rockArtists[Math.floor(Math.random() * rockArtists.length)]; // select an element from the array with an index between 0 and 7
      if (!rockRandomArtists.includes(artist)) {
        // checks if the artist is not already present in the array
        rockRandomArtists.push(artist); // pushes the artist in the array
      }
    }
    //console.log(rockRandomArtists);

    while (popRandomArtists.length < 4) {
      let artist = popArtists[Math.floor(Math.random() * popArtists.length)];
      if (!popRandomArtists.includes(artist)) {
        popRandomArtists.push(artist);
      }
    }
    //console.log(popRandomArtists);

    while (hipHopRandomArtists.length < 4) {
      let artist = hipHopArtists[Math.floor(Math.random() * hipHopArtists.length)];
      if (!hipHopRandomArtists.includes(artist)) {
        hipHopRandomArtists.push(artist);
      }
    }
    //console.log(hipHopRandomArtists);

    for (let l = 0; l < hipHopRandomArtists.length; l++)
      await handleArtist(hipHopRandomArtists[l], setHipHopAlbum, hipHopFetchedAlbum);
    //console.log(hipHopFetchedAlbum);
    for (let j = 0; j < rockRandomArtists.length; j++)
      await handleArtist(rockRandomArtists[j], setRockAlbum, rockFetchedAlbum);
    //console.log(rockFetchedAlbum);
    for (let k = 0; k < popRandomArtists.length; k++)
      await handleArtist(popRandomArtists[k], setPopAlbum, popFetchedAlbum);
    //console.log(popFetchedAlbum);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {});

  return (
    <Col xs={12} md={9} className="mt-4 offset-md-3 mainPage">
      <TopNavbar></TopNavbar>
      <Row>
        <Col xs={10}>
          <div id="searchResults" style={{ display: "none" }}>
            <h2>Search Results</h2>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
              {searchResult &&
                searchResult.map((song) => {
                  return <FetchedAlbum songInfo={song} key={song.id} />;
                })}
            </Row>
          </div>
        </Col>
        <Row>
          <Col xs={10}>
            <div id="hiphop">
              <h2>HipHop</h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                {hipHopAlbum.map((album) => {
                  return <FetchedAlbum songInfo={album} key={album.id} />;
                })}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <div id="rock">
              <h2>Rock Classics</h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                {rockAlbum.map((album) => {
                  return <FetchedAlbum songInfo={album} key={album.id} />;
                })}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <div id="pop">
              <h2>Pop Culture</h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                {popAlbum.map((album) => {
                  return <FetchedAlbum songInfo={album} key={album.id} />;
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Row>
    </Col>
  );
};
export default HomeComponent;
