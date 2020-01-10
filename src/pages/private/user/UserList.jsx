import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Table, Container, Row, Col,
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter, Spinner, Badge, Card,
    CardHeader, CardFooter, DropdownMenu, CardBody,
    DropdownItem, UncontrolledDropdown, DropdownToggle, Media
} from 'reactstrap';

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
        const { actions: { getAllUsersAsync } } = this.props;
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
                    <Col xs='12'>
                        <HasPermission user={userLogged} allowedRoles='Manager'>
                            <Card className='card-stats mb-4 mb-xl-0'>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Link to='/private/users/new' className='btn btn-default float-right'>Create new User</Link>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </HasPermission>
                    </Col>
                </Header>
                <Container className='mt--7' fluid>
                    {/* Table */}
                    <Row>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='border-0'>
                                    <h3 className='mb-0'>Active Users</h3>
                                </CardHeader>
                                <Table className='align-items-center table-flush' responsive>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th scope='col' />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedUsers &&
                                            paginatedUsers.map(user => {
                                                return (
                                                    < tr key={user.id}>
                                                        <th scope='row'>
                                                            <Media className='align-items-center'>
                                                                <a
                                                                    className='avatar rounded-circle mr-3'
                                                                    href='#pablo'
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    <img
                                                                        alt='...'
                                                                        src={Helpers.getImageUrl(user.avatarUrl)}
                                                                    />
                                                                </a>
                                                                <Media>
                                                                    <span className='mb-0 text-sm'>
                                                                        {user.userName}
                                                                    </span>
                                                                </Media>
                                                            </Media>
                                                        </th>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <Badge color='' className='badge-dot mr-4'>
                                                                <i className='bg-warning' />
                                                                {user.roles}
                                                            </Badge>
                                                        </td>
                                                        <td className='text-right'>
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle
                                                                    className='btn-icon-only text-light'
                                                                    role='button'
                                                                    size='sm'
                                                                >
                                                                    <i className='fas fa-ellipsis-v' />
                                                                </DropdownToggle>
                                                                <DropdownMenu className='dropdown-menu-arrow' right>
                                                                    <DropdownItem to={`/private/users/${user.id}/details`} tag={Link}>
                                                                        <span>Details</span>
                                                                    </DropdownItem>
                                                                    <HasPermission user={userLogged} allowedRoles='Admin,Manager'>
                                                                        <DropdownItem to={`/private/users/${user.id}/edit`} tag={Link}>
                                                                            <span>Edit</span>
                                                                        </DropdownItem>
                                                                    </HasPermission>
                                                                    <HasPermission user={userLogged} allowedRoles='Manager'>
                                                                        <DropdownItem
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
                                <CardFooter className='py-4'>
                                    <nav aria-label='...'>
                                        <CPagination
                                            model={pagination}
                                            setPage={e => this.setPage(e)}
                                        />
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                    <Modal isOpen={modal} toggle={() => this.toggle()} backdrop={'static'}>
                        <ModalHeader toggle={() => this.toggle()}>Delete User</ModalHeader>
                        <ModalBody>
                            estas Seguro de querer eliminar el usuario: {userToDelete.userName}
                        </ModalBody>
                        <ModalFooter className='justify-content-between'>
                            {isLoading ?
                                <Spinner color='primary' /> :
                                <>
                                    <Button outline color='danger' onClick={() => this.deleteUser()}>Yes</Button>
                                    <Button outline color='secondary' onClick={() => this.toggle()}>Cancel</Button>
                                </>
                            }
                        </ModalFooter>
                    </Modal>
                </Container>
            </>
        );
    }
}

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