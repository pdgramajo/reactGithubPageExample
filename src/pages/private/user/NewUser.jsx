import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Container,
    Row,
    Col
  } from "reactstrap";
import UserForm from '../../../components/user/UserForm';
import Header from '../../../components/Headers/Header'


class NewUser extends Component {
    state = {

    }
    async componentDidMount() {
        const { actions: { getAllRolesForSelectAsync } } = this.props;
        getAllRolesForSelectAsync();
    }

    createUser = async data => {
        const { actions: { createUserAsync, addFileAsync }, history } = this.props;

        let filepath = '';
        if (data.file !== '') {

            let fileResponse = await addFileAsync(data.file);

            filepath = fileResponse.relativePath;
        }

        const dataToSave = {
            roleName: data.roleName,
            avatarUrl: filepath,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: data.password
        };

        createUserAsync(dataToSave)
            .then(() => {
                history.push('/private/users')
            })
            .catch(error => this.setState({ showError: true, error: error.message }));
    }

    render() {
        const { roles, actions } = this.props;
        return (
            <>
              <Header />
              {/* Page content */}
              <Container className="mt--7" fluid>
                <Row>
                 <Col className="order-xl-1" xl="12">
                  <UserForm roles={roles} actions={actions} btnSave={this.createUser} />
                  </Col>
                </Row>
              </Container>
            </>
          );
    }
}

NewUser.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

const mapStateToProps = state => {
    return {
        user: state.user.userFound,
        userLogged: state.user.userLogged,
        roles: state.role.allRolesForSelect
    }
};

const mapDispatchToProps = ({
    role: { getAllRolesForSelectAsync },
    file: { addFileAsync },
    user: { createUserAsync, getUserByIdAsync },
}) => ({
    actions: {
        getUserByIdAsync,
        createUserAsync,
        getAllRolesForSelectAsync,
        addFileAsync
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);