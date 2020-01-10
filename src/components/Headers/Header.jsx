import React from 'react';
import { Container, Row } from 'reactstrap';

class Header extends React.Component {
  render() {
    return (
      <>
        <div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
          <Container fluid>
            <div className='header-body'>
              <Row>
                {this.props.children}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
