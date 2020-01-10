import React from 'react';
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container, Row } from 'reactstrap';

// core components
import PublicNavbar from '../components/Navbars/PublicNavbar';
import PublicFooter from '../components/Footers/PublicFooter';
import PageNotFound from '../pages/public/PageNotFound';

import routes from '../routes';
const publicRoutes = routes.filter(route => route.type === 'public');
class Public extends React.Component {
  componentDidMount() {
    document.body.classList.add('bg-default');
  }
  componentWillUnmount() {
    document.body.classList.remove('bg-default');
  }
  getRoutes = routes => {
    return routes.map((route, key) => {
      if (route.layout === '/public') {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className='main-content'>
          <PublicNavbar />
          <div className='header bg-gradient-info py-7 py-lg-8'>
            <div className='separator separator-bottom separator-skew zindex-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='none'
                version='1.1'
                viewBox='0 0 2560 100'
                x='0'
                y='0'
              >
                <polygon
                  className='fill-default'
                  points='2560 0 2560 100 0 100'
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className='mt--8 pb-5'>
            <Row className='justify-content-center'>
              <Switch>
                {this.getRoutes(publicRoutes)}
                <Route component={PageNotFound} />
              </Switch>
            </Row>
          </Container>
        </div>
        <PublicFooter />
      </>
    );
  }
}

export default Public;
