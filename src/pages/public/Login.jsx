import React from "react";
import { connect } from 'react-redux';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
  Alert,
} from "reactstrap";

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    showError: false,
    error: '',
    isLoggingIn: false
  }

  componentDidMount() {
    const { model: { user }, history } = this.props;
    if (user) {
      history.push('/');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { actions: { loginAsync }, history } = this.props;
    const { email, password } = this.state;
    loginAsync({ email, password })
      .then(() => {
        history.push('/')
      })
      .catch(error => this.setState({ showError: true, error: error.message }));
  }

  onEmailChange = e => this.setState({ email: e.target.value })

  onPasswordChange = e => this.setState({ password: e.target.value })

  closeError = () => this.setState({ showError: false })

  render() {
    const {
      email, password, showError, error
    } = this.state;
    const { loading } = this.props;
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            {
              showError &&
              <CardHeader className="bg-transparent pb-5">
                <div className="btn-wrapper text-center">
                  <Alert color="danger" isOpen={showError} toggle={this.closeError}>{error}</Alert>
                </div>
              </CardHeader>
            }
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>sign in with credentials</small>
              </div>
              <Form role="form" onSubmit={this.onSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={email} onChange={this.onEmailChange} type="email" placeholder="Email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={password} onChange={this.onPasswordChange} type="password" placeholder="Password" />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  {
                    loading ?
                      <Spinner style={{ width: '3rem', height: '3rem' }} />
                      :
                      <Button type="submit" color="primary" className="my-4"> Sign in</Button>
                  }
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    model: {
      user: state.user.userLogged,
      isLogged: state.user.isLogged,
      loading: state.user.loading
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
