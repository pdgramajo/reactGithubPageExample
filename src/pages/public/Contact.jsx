import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Jumbotron, Button } from 'reactstrap';

export default class Contact extends Component {
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
                    <h1 className="display-3">Contact page!</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                </Jumbotron>
            </Col>
        );
    }
}

Contact.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};
