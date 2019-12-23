import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import PrivateNavbar from "../components/Navbars/PrivateNavbar";
import PrivateFooter from "../components/Footers/PrivateFooter";
import Sidebar from "../components/Sidebar/Sidebar";

import routes from "../routes";
const privateRoutes = routes.filter(route => route.type === 'private');
class Private extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((route, key) => {
      if (route.layout === "/private") {
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
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={privateRoutes}
          logo={{
            innerLink: "/private/index",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <PrivateNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(privateRoutes)}</Switch>
          <Container fluid>
            <PrivateFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Private;
