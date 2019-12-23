import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Unauthorized = () => (
  <Container fluid className="view h-50 d-flex flex-column justify-content-center">
    <Row>
      <Col xs={{ offset: 1, size: 10 }} sm={{ offset: 3, size: 6 }} className="text-center">
        <h1>Unauthorized</h1>
        <img className="w-100" src="https://i.giphy.com/media/njYrp176NQsHS/giphy.gif" alt="" />
        <br />
        <br />
        <h2>{'You don\'t have permission to view this page.'}</h2>
      </Col>
    </Row>
  </Container>
);

export default Unauthorized;
