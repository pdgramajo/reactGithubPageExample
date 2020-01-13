import React from 'react';
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
// core components
import PrivateNavbar from '../components/Navbars/PrivateNavbar';
import PrivateFooter from '../components/Footers/PrivateFooter';
import Unauthorized from '../pages/public/Unauthorized';
import PageNotFound from '../pages/public/PageNotFound';
import Sidebar from '../components/Sidebar/Sidebar';

import routes from '../routes';
import Helpers from '../lib/Helpers';
const privateRoutes = routes.filter(route => route.type === 'private');

class Private extends React.Component {
  getRoutes = routes => {
    const { model: { user } } = this.props;
    return routes.map((route, key) => {
      if (route.layout === '/private') {
        return (Helpers.isAllowed(user, route.allowedRoles) ?
          <Route
            path={route.layout + route.path}
            exact
            component={route.component}
            key={key}
          />
          :
          <Route
            path={route.layout + route.path}
            exact
            component={Unauthorized}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getBrandText = () => {
    const currentRoute = routes.find(route => {
      if (this.props.location.pathname.includes(`${route.layout}${route.path}`)) {
        return true;
      }
      return false;
    })
    return currentRoute.name ?? 'Brand';
  };

  render() {
    const { model: { user }, actions: { logout } } = this.props;
    return (
      <>
        <Sidebar
          routes={routes}
          logoNavBrand={{
            innerLink: '/private/dashboard',
            imgSrc: require('../assets/img/brand/argon-react.png'),
            imgAlt: '...'
          }}
          logout={logout}
          user={user}
        />
        <div className='main-content' ref='mainContent'>
          <PrivateNavbar
            user={user}
            logout={logout}
            brandText={this.getBrandText()}
          />
          <Switch>
            {this.getRoutes(privateRoutes)}
            <Route component={PageNotFound} />
          </Switch>
          <Container fluid>
            <PrivateFooter />
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    model: {
      user: state.user.userLogged
    }
  }
};

const mapDispatchToProps = ({
  user: { logout },
}) => ({
  actions: {
    logout
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Private);
