import React from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
const Unauthorized = () => (
  <>
    <div
      className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style={{
        minHeight: "600px",
        backgroundImage:
          "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
        backgroundSize: "cover",
        backgroundPosition: "center top"
      }}
    >
      {/* Mask */}
      <span className="mask bg-gradient-default opacity-8" />
      {/* Header container */}
      <Container >
        <Card className="shadow border-0">
          <Row>
            <Col className="text-center">
              <h1>Unauthorized</h1>
              <img className="w-100" src="https://i.giphy.com/media/njYrp176NQsHS/giphy.gif" alt="" />
              <br />
              <br />
              <h2>{'You don\'t have permission to view this page.'}</h2>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  </>
);

export default Unauthorized;
