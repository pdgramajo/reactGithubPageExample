import React, { Component } from "react";
import {
    Button, Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    FormFeedback,
} from "reactstrap";

import Helpers from '../../lib/Helpers';
import ImageItem from '../common/ImageItem';

class UserForm extends Component {
    state = {
        user: {
            email: '',
            roleName: '',
            password: '',
            phoneNumber: '',
            file: null,
            avatarUrl: ''
        },
        validation: {
            emailIsValid: true,
            passwordIsValid: true,
            confirmPasswordIsValid: true,
            roleIsSelected: true,
        },
        addNewFile: false,
        avatarIdToDelete: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const { user, isEditing } = nextProps;

        if (isEditing === true) {

            if (user.email !== prevState.user.email) {
                return {
                    ...prevState,
                    user: {
                        email: user.email,
                        roleName: user.roles,
                        password: '',
                        phoneNumber: user.phoneNumber,
                        file: null,
                        avatarUrl: user.avatarUrl
                    }
                }
            }
            return prevState;
        }
        return prevState;

    }

    onSubmit = async () => {
        const { btnSave, isEditing } = this.props;
        const { user: { email, password, file, phoneNumber, roleName }, avatarIdToDelete,
        } = this.state;

        let userData = {};
        if (!isEditing) {
            userData = {
                file: file ? file : '',
                roleName: roleName,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            };
        } else {
            userData = {
                file: file ? file : '',
                roleName: roleName,
                phoneNumber: phoneNumber,
                oldFileUrl: avatarIdToDelete
            };
        }

        btnSave(userData);
    }

    onHandleDeletePhoto = (data) => {
        this.setState(prevState => ({
            ...prevState,
            addNewFile: true,
            avatarIdToDelete: data
        }))
    }

    onValidateSubmit = async (e) => {
        e.preventDefault();

        const {
            user: { email, password, roleName, confirmPassword }
        } = this.state;
        this.setState(prevState => ({
            ...prevState,
            validation: {
                ...prevState.validation,
                passwordIsValid: Helpers.isPasswordValid(password),
                confirmPasswordIsValid: confirmPassword === password,
                emailIsValid: Helpers.isNullOrEmpty(email) ? false : (Helpers.isEmailValid(email) ? true : false),
                roleIsSelected: Helpers.isNullOrEmpty(roleName) ? false : true
            }
        }),
            () => { // callback function
                this.beforeSubmit()
            })
    }

    beforeSubmit() {
        const {
            validation: { emailIsValid, passwordIsValid, roleIsSelected, confirmPasswordIsValid }
        } = this.state;

        if (emailIsValid === true && passwordIsValid === true &&
            confirmPasswordIsValid === true && roleIsSelected === true) {
            this.onSubmit();
        }
    }

    onEmailChange = e => {
        let data = e.target.value;
        console.log(data);
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: data
            },
            validation: {
                ...prevState.validation,
                emailIsValid: Helpers.isNullOrEmpty(data) ? false : (Helpers.isEmailValid(data) ? true : false),
            }
        }))
    }

    onPasswordChange = e => {
        let data = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: data
            },
            validation: {
                ...prevState.validation,
                passwordIsValid: Helpers.isPasswordValid(data),
            }
        }))
    }

    onConfirmPasswordChange = (e) => {
        let data = e.target.value;
        const {
            user: { password }
        } = this.state;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                confirmPassword: data
            },
            validation: {
                ...prevState.validation,
                confirmPasswordIsValid: data === password,
            }
        }))
    }

    onPhoneNumberChange = e => {
        let data = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                phoneNumber: data
            }
        }))

    }

    onFileChange = (e) => {
        let file = e.target.files[0];
        let data = new FormData();
        data.append('file', file);
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                file: data
            }
        }))
    }

    onRolesChange = e => {
        let data = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                roleName: data
            },
            validation: {
                ...prevState.validation,
                roleIsSelected: true
            }
        }))
    }

    render() {

        const {
            user: { email, roleName, password, phoneNumber, avatarUrl },
            validation: { emailIsValid, passwordIsValid, confirmPasswordIsValid, roleIsSelected },
            addNewFile
        } = this.state;
        const { roles, isEditing } = this.props;

        return (
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                            <h3 className="mb-0">
                                {
                                    isEditing ? 'Edit User' : 'Create User'
                                }
                            </h3>
                        </Col>
                        <Col className="text-right" xs="4">
                            <Button
                                color="default"

                                onClick={this.onValidateSubmit}
                            >
                                Save
                      </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                            User information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Username
                                </label>
                                        <Input
                                            id="input-username"
                                            placeholder="Username"
                                            type="text"
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                        >
                                            Email address
                                </label>
                                        <Input
                                            id="input-email"
                                            placeholder="example@example.com"
                                            onChange={this.onEmailChange}
                                            value={email || ''}
                                            invalid={!emailIsValid}
                                            type="text"
                                        />
                                        <FormFeedback>Email is required</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {
                                !isEditing &&
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-password"
                                            >
                                                Password
                                    </label>
                                            <Input
                                                id="input-password"
                                                name="password"
                                                placeholder="Write your password"
                                                onChange={this.onPasswordChange}
                                                value={password || ''}
                                                invalid={!passwordIsValid}
                                                type="password"
                                            />
                                            <FormFeedback>
                                                Passwords must:
                                        <ul>
                                                    <li>be at least 6 characters</li>
                                                    <li>have at least one lowercase ('a'-'z')</li>
                                                    <li>have at least one uppercase ('A'-'Z')</li>
                                                    <li>have at least one digit ('0'-'9')</li>
                                                    <li>have at least one non alphanumeric character</li>
                                                </ul>
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-last-name"
                                            >
                                                Confirm Password
                                    </label>
                                            <Input
                                                name="confirmPassword"
                                                id="input-confirm-password"
                                                placeholder="Confirm your password"
                                                type="password"
                                                onChange={this.onConfirmPasswordChange}
                                                invalid={!confirmPasswordIsValid}
                                            />
                                            <FormFeedback>Password not match</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            }
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Extra information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-role"
                                        >
                                            Role
                                </label>
                                        <Input
                                            id="input-role"
                                            type="select"
                                            onChange={this.onRolesChange}
                                            value={roleName || ''}
                                            invalid={!roleIsSelected}
                                        >
                                            <option value="" key="0" disabled>{"Select a role"}</option>
                                            {
                                                roles &&
                                                (
                                                    roles.map(r => <option value={r.name} key={r.id}>{r.name}</option>)
                                                )
                                            }
                                        </Input>
                                        <FormFeedback>Role is required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-phone"
                                        >
                                            Phone Number
                                </label>
                                        <Input
                                            id="input-phone"
                                            placeholder="Write your phone number"
                                            onChange={this.onPhoneNumberChange}
                                            value={phoneNumber || ''}
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">

                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-img"
                                        >
                                            Avatar
                                        </label>
                                        {
                                            (isEditing && !addNewFile && avatarUrl !== '') ?
                                                <ImageItem
                                                    imageURL={avatarUrl}
                                                    handlerDelete={this.onHandleDeletePhoto}
                                                />
                                                :
                                                <Input
                                                    name="file"
                                                    id="input-img"
                                                    type="file"
                                                    onChange={this.onFileChange}
                                                />
                                        }
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Description */}
                        <h6 className="heading-small text-muted mb-4">About me</h6>
                        <div className="pl-lg-4">
                            <FormGroup>
                                <label>About Me</label>
                                <Input
                                    placeholder="A few words about you ..."
                                    rows="4"
                                    defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                                    type="textarea"
                                />
                            </FormGroup>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default UserForm;