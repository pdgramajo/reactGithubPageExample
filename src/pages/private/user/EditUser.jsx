import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Spinner } from 'reactstrap';
import UserForm from '../../../components/user/UserForm';
import Header from '../../../components/Headers/Header'


class EditUser extends Component {
    state = {
        isLoading: true
    }

    async componentDidMount() {
        const { actions: { getUserByIdAsync, getAllRolesForSelectAsync }, match: { params: { id } } } = this.props;
        getUserByIdAsync(id).then(() => {
            this.setState({ isLoading: false })
        });
        getAllRolesForSelectAsync();
    }

    updateUser = async data => {
        const { actions: { updateUserAsync, addFileAsync, deleteFileAsync }, match: { params: { id } }, history } = this.props;

        if (data.oldFileUrl !== '') {
            await deleteFileAsync(data.oldFileUrl);
        }

        let filepath = '';

        if (data.file !== '') {
            let fileResponse = await addFileAsync(data.file);
            filepath = fileResponse.relativePath;
        }

        let userData = {
            phoneNumber: data.phoneNumber,
            avatarUrl: filepath,
            rolName: data.roleName
        }

        updateUserAsync({ userId: id, user: userData })
            .then(() => {
                history.push('/private/users')
            })
            .catch(error => this.setState({ showError: true, error: error.message }));
    }

    render() {
        const { model: { userFound, roles }, actions } = this.props;
        const { isLoading } = this.state;
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className='mt--7' fluid>
                    <Row>
                        <Col className='order-xl-1' xl='12'>
                            {isLoading ?
                                <Spinner color='primary' /> :
                                <UserForm roles={roles} user={userFound} actions={actions} isEditing btnSave={this.updateUser} />
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

EditUser.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

const mapStateToProps = state => {
    return {
        model: {
            userFound: state.user.userFound,
            userLogged: state.user.userLogged,
            roles: state.role.allRolesForSelect
        }
    }
};

const mapDispatchToProps = ({
    role: { getAllRolesForSelectAsync },
    file: { addFileAsync, deleteFileAsync },
    user: { updateUserAsync, getUserByIdAsync },
}) => ({
    actions: {
        getUserByIdAsync,
        updateUserAsync,
        getAllRolesForSelectAsync,
        addFileAsync,
        deleteFileAsync
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);