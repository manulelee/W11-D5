import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
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
  );
};

export default TopNavbar;
