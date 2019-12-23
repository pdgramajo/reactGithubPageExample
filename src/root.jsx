import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


import PrivateLayout from "./layouts/Private";
import PublicLayout from "./layouts/Public";

class Root extends Component {
    render() {
        return (
            <Switch>
                <Route path="/private" render={props => <PrivateLayout {...props} />} />
                <Route path="/public" render={props => <PublicLayout {...props} />} />
                <Redirect from="/" to="/private/index" />
            </Switch>
        )
    }
}

// const mapStateToProps = state => ({
//     user: state.user.userLogged,
//     isLogged: state.user.isLogged,
//     error: state.error,
// });

// const mapDispatchToProps = ({
//     user: { loginAsync },
// }) => ({
//     actions: {
//         loginAsync,
//     }
// });
export default Root;
