import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import routes from '../../routes';
const publicRoutes = routes.filter(route => route.type === 'public');

class PublicNavbar extends React.Component {

  getNavBarItems() {
    return publicRoutes.map(route => (
      <NavItem  key={route.path}>
        <NavLink className="nav-link-icon" to={route.layout + route.path} tag={Link}>
          <i className={route.icon} />
          <span className="nav-link-inner--text">{route.name}</span>
        </NavLink>
      </NavItem>
    ))
  };

  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <img alt="..." src={require("../../assets/img/brand/argon-react-white.png")} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("../../assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                {this.getNavBarItems()}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default PublicNavbar;
