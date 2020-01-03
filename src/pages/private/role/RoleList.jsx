import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Table, Container, Row, Col,
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner,
    Card, CardHeader, CardFooter, DropdownMenu, CardBody,
    DropdownItem, UncontrolledDropdown, DropdownToggle,
    FormFeedback, Form, FormGroup, Label, Input
} from 'reactstrap';

//import CustomTypes from '../../../../lib/custom-types';
// import { API } from '../../../../config';

import HasPermission from '../../../components/common/HasPermission';
import CPagination from '../../../components/common/CPagination';
import Helpers from '../../../lib/Helpers';
import Header from '../../../components/Headers/Header';


class RoleList extends Component {
    state = {
        modalAdd: false,
        modalDelete: false,
        isLoading: false,
        newRoleName: '',
        roleIsValid: true,
        usersToUpdate: [],
        roleIdToDelete: ''
    }
    async componentDidMount() {
        const {
            actions: { getAllRolesAsync }
        } = this.props;
        getAllRolesAsync();
    }

    setPage(page) {
        const {
            actions: { getAllRolesAsync },
        } = this.props;
        getAllRolesAsync(page);
    }
    toggle() {
        this.setState(prevState => ({
            modalAdd: !prevState.modalAdd,
            isLoading: false,
            newRoleName: '',
            roleIsValid: true
        }))
    }
    toggleDeleteModal() {
        this.setState(prevState => ({
            modalDelete: !prevState.modalDelete,
            usersToUpdate: [],
            roleIdToDelete: '',
            isLoading: false,
            // newRoleName: '',
            // roleIsValid: true
        }))
    }
    getUsersByRoleId(roleId) {
        const { actions: { getAllUsersByRoleIdAsync } } = this.props;
        getAllUsersByRoleIdAsync(roleId)
            .then((data) => {
                this.toggleDeleteModal();
                this.setState({ usersToUpdate: data, roleIdToDelete: roleId })
            })
            .catch(error => this.setState({ showError: true, error: error.message }));
    }
    onRoleNameChange = e => {
        let data = e.target.value;
        this.setState({
            newRoleName: data,
            roleIsValid: Helpers.isNullOrEmpty(data) ? false : true
        });

    }
    onValidateSubmit = async (e) => {
        const { newRoleName } = this.state;

        this.setState({ roleIsValid: Helpers.isNullOrEmpty(newRoleName) ? false : true })
        const { roleIsValid } = this.state;

        if (roleIsValid === true) {
            this.onSubmit();
        }
    }
    onSubmit = async () => {

        const { newRoleName } = this.state;

        const { actions: { createRoleAsync, getAllRolesAsync } } = this.props;
        createRoleAsync({ name: newRoleName })
            .then(() => {
                getAllRolesAsync();
                this.toggle();
            })
            .catch(error => this.setState({ showError: true, error: error.message }));
    }
    deleteRole = async () => {
        const { roleIdToDelete } = this.state;
        const { actions: { deleteRoleAsync, getAllRolesAsync } } = this.props;
        this.setState({ isLoading: true });
        deleteRoleAsync(roleIdToDelete)
            .then((data) => {
                getAllRolesAsync();
                this.toggleDeleteModal();
            })
            .catch(error => this.setState({ showError: true, error: error.message }));

    }
    render() {
        const { model: { role: { paginatedRoles, pagination }, userLogged } } = this.props;
        const { modalAdd, modalDelete, isLoading,
            newRoleName, roleIsValid, usersToUpdate
        } = this.state;
        return (
            <>
                <Header>
                    <Col>
                        <HasPermission user={userLogged} allowedRoles="Manager">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Button className='float-right' onClick={() => this.toggle()} size="sm" outline color="info">Create new role </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </HasPermission>
                    </Col>
                </Header>
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Roles</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>id</th>
                                            <th>Name</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedRoles &&
                                            paginatedRoles.map(role => {
                                                return (
                                                    < tr key={role.id}>
                                                        <td>{role.id}</td>
                                                        <td>{role.name}</td>
                                                        <td className="text-right">
                                                            {
                                                                role.name !== 'Manager' &&
                                                                <UncontrolledDropdown>
                                                                    <DropdownToggle
                                                                        className="btn-icon-only text-light"
                                                                        role="button"
                                                                        size="sm"
                                                                        color=""
                                                                    >
                                                                        <i className="fas fa-ellipsis-v" />
                                                                    </DropdownToggle>
                                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                                        <DropdownItem
                                                                            onClick={() => this.getUsersByRoleId(role.id)}
                                                                        >
                                                                            Delete
                                                                    </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            }
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
                    <Modal isOpen={modalAdd} toggle={() => this.toggle()} backdrop={'static'}>
                        <ModalHeader toggle={() => this.toggle()}>Add role</ModalHeader>
                        <ModalBody>
                            <Form >
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Name</Label>
                                    <Col sm={10}>
                                        <Input type="text"
                                            name="roleName"
                                            id="roleName"
                                            onChange={this.onRoleNameChange}
                                            value={newRoleName || ''}
                                            invalid={!roleIsValid}
                                        />
                                        <FormFeedback>Name is required</FormFeedback>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter className="justify-content-between">
                            {isLoading ?
                                <Spinner color="primary" /> :
                                <>
                                    <Button outline color="info" onClick={() => this.onValidateSubmit()}>Save</Button>
                                    <Button outline color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                                </>
                            }

                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={modalDelete} toggle={() => this.toggleDeleteModal()} backdrop={'static'}>
                        <ModalHeader toggle={() => this.toggleDeleteModal()}>Delete role</ModalHeader>
                        <ModalBody>
                            si eliminas este rol, se quedaran sin rol los siguientes usuarios y no podran ingresar al sistema
                        <ul>
                                {
                                    usersToUpdate.length > 0 &&
                                    usersToUpdate.map(user => <li key={user.id}>{user.userName}</li>)
                                }
                            </ul>
                        </ModalBody>
                        <ModalFooter className="justify-content-between">
                            {isLoading ?
                                <Spinner color="primary" /> :
                                <>
                                    <Button outline color="danger" onClick={() => this.deleteRole()}>Save</Button>
                                    <Button outline color="secondary" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                                </>
                            }

                        </ModalFooter>
                    </Modal>
                </Container>
            </>
        );
    }
}

// RoleList.propTypes = {
//     userLogged: CustomTypes.userData,
//     getUserByIdAsync: PropTypes.func,
//     history: PropTypes.shape({
//         push: PropTypes.func,
//     }),
// };

const mapStateToProps = state => {
    return {
        model: {
            role: state.role,
            userLogged: state.user.userLogged
        }
    }
};

const mapDispatchToProps = ({
    role: {
        getAllRolesAsync,
        createRoleAsync,
        getAllUsersByRoleIdAsync,
        deleteRoleAsync
    }
}) => ({
    actions: {
        getAllRolesAsync,
        createRoleAsync,
        getAllUsersByRoleIdAsync,
        deleteRoleAsync
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleList);