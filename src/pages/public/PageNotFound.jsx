import React, { Component } from 'react';
import { Col, Jumbotron } from 'reactstrap';

class PageNotFound extends Component {
  state = {

  }
  async componentDidMount() {
    // const { getUserByIdAsync, getAllRolesAsync, userLogged } = this.props;
    // getUserByIdAsync(userLogged.userId);
    // getAllRolesAsync();
  }


  render() {

    return (
      <Col lg="5" md="7">
        <Jumbotron>
          <h1 className="display-3">Error</h1>
          <p className="lead">
            This is not the page you\'re looking for...
                    </p>
          <hr className="my-2" />
        </Jumbotron>
      </Col>
    );
  }
}

export default PageNotFound;