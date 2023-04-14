import { Col } from "react-bootstrap";

const NotFoundComponent = () => {
  return (
    <Col xs={12} md={9} className="text-light mt-5">
      <h2 className="text-center mt-5">404</h2>
      <p className="text-center">Page not found</p>
    </Col>
  );
};
export default NotFoundComponent;
