import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <Col xs={12} md={9} className="mt-4 offset-md-3 mainPage">
      <Row className="mb-3">
        <Col xs={9} lg={11} className="mainLinks d-none d-md-flex">
          <Link className="text-decoration-none text-muted" to="/trendings">
            TRENDING
          </Link>
          <Link className="text-decoration-none text-muted" to="/podcast">
            PODCAST
          </Link>
          <Link className="text-decoration-none text-muted" to="/moodsAndGenres">
            MOODS AND GENRES
          </Link>
          <Link className="text-decoration-none text-muted" to="/newReleases">
            NEW RELEASES
          </Link>
          <Link className="text-decoration-none text-muted" to="/discover">
            DISCOVER
          </Link>
        </Col>
      </Row>
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
export default HomeComponent;
