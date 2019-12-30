import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Table, Container, Row, Col,
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner,
    Badge, Card, CardHeader, CardFooter, DropdownMenu, CardBody,
    DropdownItem, UncontrolledDropdown, DropdownToggle, Media
} from 'reactstrap';

//import CustomTypes from '../../../../lib/custom-types';
// import { API } from '../../../../config';

import HasPermission from '../../../components/common/HasPermission';
import CPagination from '../../../components/common/CPagination';
import Helpers from '../../../lib/Helpers';
import Header from '../../../components/Headers/Header';


class UsersList extends Component {
    state = {
        modal: false,
        userToDelete: '',
        isLoading: false
    }
    async componentDidMount() {
        const {
            actions: { getAllUsersAsync, getUserByIdAsync },
            model: { userLogged }
        } = this.props;
        getUserByIdAsync(userLogged.userId);
        getAllUsersAsync();
    }

    setPage(page) {
        const {
            actions: { getAllUsersAsync },
        } = this.props;
        getAllUsersAsync(page);
    }
    toggle(user) {

        this.setState(prevState => ({
            modal: !prevState.modal,
            userToDelete: user ? user : '',
            isLoading: false
        }))
    }
    deleteUser() {
        const {
            actions: { getAllUsersAsync, deleteUserAsync },
        } = this.props;
        const { userToDelete } = this.state;

        this.setState({ isLoading: true });

        deleteUserAsync(userToDelete.id)
            .then(() => {
                getAllUsersAsync()
                    .then(() =>
                        this.toggle()
                    );
            })
    }
    render() {
        const { model: { paginatedUsers, userLogged, pagination } } = this.props;
        const { modal, userToDelete, isLoading } = this.state;
        return (
            <>
                <Header>
                    <Col xs="12">
                        <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                                <Row>
                                    <Col>
                                        <HasPermission user={userLogged} allowedRoles="Manager">
                                            <Link to="/users/new" className="btn btn-outline-info float-right">Create new User</Link>
                                        </HasPermission>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Header>
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Active Users</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedUsers &&
                                            paginatedUsers.map(user => {
                                                return (
                                                    < tr key={user.id}>
                                                        <th scope="row">
                                                            <Media className="align-items-center">
                                                                <a
                                                                    className="avatar rounded-circle mr-3"
                                                                    href="#pablo"
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    <img
                                                                        alt="..."
                                                                        src={Helpers.getImageUrl(user.avatarUrl)}
                                                                    />
                                                                </a>
                                                                <Media>
                                                                    <span className="mb-0 text-sm">
                                                                        {user.userName}
                                                                    </span>
                                                                </Media>
                                                            </Media>
                                                        </th>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <Badge color="" className="badge-dot mr-4">
                                                                <i className="bg-warning" />
                                                                {user.roles}
                                                            </Badge>
                                                        </td>
                                                        <td className="text-right">
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle
                                                                    className="btn-icon-only text-light"
                                                                    href="#pablo"
                                                                    role="button"
                                                                    size="sm"
                                                                    color=""
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </DropdownToggle>
                                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                                    <DropdownItem
                                                                        href="#pablo"
                                                                        onClick={e => e.preventDefault()}
                                                                    >
                                                                        Details
                                                                    </DropdownItem>
                                                                    <HasPermission user={userLogged} allowedRoles="Admin,Manager">
                                                                        <DropdownItem
                                                                            href="#pablo"
                                                                            onClick={e => e.preventDefault()}
                                                                        >
                                                                            Edit
                                                                    </DropdownItem>
                                                                    </HasPermission>
                                                                    <HasPermission user={userLogged} allowedRoles="Manager">
                                                                        <DropdownItem
                                                                            href="#pablo"
                                                                            onClick={e => { e.preventDefault(); this.toggle(user) }}
                                                                        >
                                                                            Delete
                                                                    </DropdownItem>
                                                                    </HasPermission>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }

                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <CPagination
                                            model={pagination}
                                            setPage={e => this.setPage(e)}
                                        />
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>

                    {/* <Row>
                        <Col xs="12">
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers &&
                                        allUsers.map(user => {
                                            return (
                                                <tr key={user.id}>
                                                    <td>
                                                        <AvatarThumbnail
                                                            name={user.userName}
                                                            imageURL={Helpers.getImageUrl(user.avatarUrl)}
                                                            height="31"
                                                            margin="0"
                                                        />
                                                    </td>
                                                    <td>{user.userName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.roles}</td>
                                                    <td>
                                                        <Link to={`/users/${user.id}/details`} className="btn btn-sm btn-outline-info">Details</Link> &nbsp;
                                                    <HasPermission user={userLogged} allowedRoles="Admin,Manager">
                                                            <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>&nbsp;&nbsp;
                                                        <HasPermission user={userLogged} allowedRoles="Manager">
                                                                {
                                                                    user.id !== userLogged.userId &&
                                                                    <Button onClick={() => this.toggle(user)} size="sm" outline color="danger">Delete </Button>
                                                                }
                                                            </HasPermission>
                                                        </HasPermission>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>
                        </Col>
                    </Row> */}
                    <Modal isOpen={modal} toggle={() => this.toggle()} backdrop={'static'}>
                        <ModalHeader toggle={() => this.toggle()}>Delete User</ModalHeader>
                        <ModalBody>
                            estas Seguro de querer eliminar el usuario: {userToDelete.userName}
                        </ModalBody>
                        <ModalFooter className="justify-content-between">
                            {isLoading ?
                                <Spinner color="primary" /> :
                                <>
                                    <Button outline color="danger" onClick={() => this.deleteUser()}>Yes</Button>
                                    <Button outline color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                                </>
                            }

                        </ModalFooter>
                    </Modal>
                </Container>
            </>
        );
    }
}

// UsersList.propTypes = {
//     userLogged: CustomTypes.userData,
//     getUserByIdAsync: PropTypes.func,
//     history: PropTypes.shape({
//         push: PropTypes.func,
//     }),
// };

const mapStateToProps = state => {
    return {
        model: state.user
    }
};

const mapDispatchToProps = ({
    user: { getAllUsersAsync, getUserByIdAsync, deleteUserAsync }
}) => ({
    actions: {
        getUserByIdAsync,
        getAllUsersAsync,
        deleteUserAsync
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);