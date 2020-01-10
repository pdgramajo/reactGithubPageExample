import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PrivateLayout from './layouts/Private';
import PublicLayout from './layouts/Public';
import Loading from './components/common/Loading';

class Root extends Component {

    getRoutesComponents() {
        const { model: { user } } = this.props;
        if (user) {
            return (
                <Switch>
                    <Route path='/private' render={props => <PrivateLayout {...props} />} />
                    <Route path='/public' render={props => <PublicLayout {...props} />} />
                    <Redirect from='/' to='/private/dashboard' />
                </Switch>
            )
        }
        return (
            <Switch>
                <Route path='/public' render={props => <PublicLayout {...props} />} />
                <Redirect from='/' to='/public/about' />
            </Switch>
        )
    }

    render() {
        const { model: { isLoading } } = this.props;
        return (
            <>
                {isLoading && <Loading />}
                {this.getRoutesComponents()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        model: {
            user: state.user.userLogged,
            isLoading: state.loader.loading
        }
    }
};

const mapDispatchToProps = ({
    user: { loginAsync },
}) => ({
    actions: {
        loginAsync,
    }
});
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Root),
);
