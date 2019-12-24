import React, { Component } from 'react';
import { Col, Jumbotron, Container, Row } from 'reactstrap';

class PageNotFound extends Component {

  render() {

    return (
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
            <Row>
              <Col className="text-center">
                <Jumbotron>
                  <h1 className="display-3">Error</h1>
                  <p className="lead">
                    This is not the page you\'re looking for...
                    </p>
                </Jumbotron>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default PageNotFound;