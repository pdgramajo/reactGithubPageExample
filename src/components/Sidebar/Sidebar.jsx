import React from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
// nodejs library to set properties for components
import { PropTypes } from 'prop-types';
// reactstrap components
import {
  Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown,
  DropdownToggle, Form, Input, InputGroupAddon,
  InputGroupText, InputGroup, Media, NavbarBrand,
  Navbar, NavItem, NavLink, Nav,
  Container, Row, Col
} from 'reactstrap';
import Helpers from '../../lib/Helpers';

class Sidebar extends React.Component {
  state = {
    collapseOpen: false
  };

  prevLogout() {
    const { logout } = this.props;
    logout()
  }

  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  getAllowedNavRoutes = () => {
    const { user, routes } = this.props;
    const privateRoutes = routes.filter(route => route.type === 'private');
    const allowedNavRoutes = privateRoutes.filter(route => Helpers.isAllowed(user, route.allowedRoles))
    return this.createLinks(allowedNavRoutes);
  }

  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((route, key) => {
      return route.showInNavBar ? (
        <NavItem key={key}>
          <NavLink
            to={route.layout + route.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName='active'
          >
            <i className={route.icon} />
            {route.name}
          </NavLink>
        </NavItem>
      ) : '';
    });
  };
  render() {
    const { logoNavBrand, routes, user } = this.props;
    let navbarBrandProps;
    if (logoNavBrand && logoNavBrand.innerLink) {
      navbarBrandProps = {
        to: logoNavBrand.innerLink,
        tag: Link
      };
    } else if (logoNavBrand && logoNavBrand.outterLink) {
      navbarBrandProps = {
        href: logoNavBrand.outterLink,
        target: '_blank'
      };
    }
    return (
      <Navbar
        className='navbar-vertical fixed-left navbar-light bg-white'
        expand='md'
        id='sidenav-main'
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className='navbar-toggler'
            type='button'
            onClick={this.toggleCollapse}
          >
            <span className='navbar-toggler-icon' />
          </button>
          {/* Brand */}
          {logoNavBrand ? (
            <NavbarBrand className='pt-0' {...navbarBrandProps}>
              <img
                alt={logoNavBrand.imgAlt}
                className='navbar-brand-img'
                src={logoNavBrand.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className='align-items-center d-md-none'>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className='align-items-center'>
                  <span className='avatar avatar-sm rounded-circle'>
                    <img
                      alt='...'
                      src={Helpers.getImageUrl(user.avatarURL)}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-arrow' right>
                <DropdownItem className='noti-title' header tag='div'>
                  <h6 className='text-overflow m-0'>Welcome!</h6>
                </DropdownItem>
                <DropdownItem to='/private/user-profile' tag={Link}>
                  <i className='ni ni-single-02' />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to='/private/user-profile' tag={Link}>
                  <i className='ni ni-settings-gear-65' />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to='/private/user-profile' tag={Link}>
                  <i className='ni ni-calendar-grid-58' />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to='/private/user-profile' tag={Link}>
                  <i className='ni ni-support-16' />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href='#pablo' onClick={e => { e.preventDefault(); this.prevLogout() }}>
                  <i className='ni ni-user-run' />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className='navbar-collapse-header d-md-none'>
              <Row>
                {logoNavBrand ? (
                  <Col className='collapse-brand' xs='6'>
                    {logoNavBrand.innerLink ? (
                      <Link to={logoNavBrand.innerLink}>
                        <img alt={logoNavBrand.imgAlt} src={logoNavBrand.imgSrc} />
                      </Link>
                    ) : (
                        <a href={logoNavBrand.outterLink}>
                          <img alt={logoNavBrand.imgAlt} src={logoNavBrand.imgSrc} />
                        </a>
                      )}
                  </Col>
                ) : null}
                <Col className='collapse-close' xs='6'>
                  <button
                    className='navbar-toggler'
                    type='button'
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className='mt-4 mb-3 d-md-none'>
              <InputGroup className='input-group-rounded input-group-merge'>
                <Input
                  aria-label='Search'
                  className='form-control-rounded form-control-prepended'
                  placeholder='Search'
                  type='search'
                />
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <span className='fa fa-search' />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Navigation */}
            <Nav navbar>{this.getAllowedNavRoutes()}</Nav>
            {/* Divider */}
            <hr className='my-3' />
            {/* Heading */}
            <h6 className='navbar-heading text-muted'>Public pages</h6>
            {/* Navigation */}
            <Nav className='mb-md-3' navbar>
              {this.createLinks(routes.filter(route => route.type === 'public'))}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logout: PropTypes.func,
  logoNavBrand: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to='...'>...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href='...'>...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};


export default Sidebar;
