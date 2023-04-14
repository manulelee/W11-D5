import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const PlayerComponent = () => {
  return (
    <Container fluid className=" fixed-bottom bg-container pt-1">
      <Row>
        <Col lg={10} className="offset-lg-2">
          <Row>
            <Col xs={12} md={8} lg={6} className="offset-md-2 offset-lg-3 mt-1" id="playerControls">
              <Row className="iconsImg justify-content-center">
                <Col xs={1} className="col-sm-1">
                  <img src="/assets/playerbuttons/Shuffle.png" alt="shuffle" />
                </Col>
                <Col xs={1} className="col-sm-1">
                  <img src="/assets/playerbuttons/Previous.png" alt="previous" />
                </Col>
                <Col xs={1} className="col-sm-1">
                  <img src="/assets/playerbuttons/Play.png" alt="play" />
                </Col>
                <Col xs={1} className="col-sm-1">
                  <img src="/assets/playerbuttons/Next.png" alt="next" />
                </Col>
                <Col xs={1} className="col-sm-1">
                  <img src="/assets/playerbuttons/Repeat.png" alt="repeat" />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="row justify-content-center py-3" id="playBar">
            <div className="col-12 col-md-8 col-lg-6">
              <div id="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default PlayerComponent;
