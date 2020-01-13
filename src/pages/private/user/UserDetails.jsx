import React from 'react';
import { connect } from 'react-redux';
// reactstrap components
import {
    Button, Card, CardHeader, CardBody,
    Container, Row, Col
} from 'reactstrap';
// core components
import Header from '../../../components/Headers/Header';
import Helpers from '../../../lib/Helpers';

class UserDetails extends React.Component {

    async componentDidMount() {
        const { actions: { getUserByIdAsync, getAllRolesForSelectAsync }, match: { params: { id } } } = this.props;
        getUserByIdAsync(id);
        getAllRolesForSelectAsync();
    }

    render() {

        const { model: { userFound: { avatarUrl, email, id, phoneNumber, roles, userName } } } = this.props;
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className='mt--7' fluid>
                    <Row>
                        <Col className='order-xl-1 mb-5 mb-xl-0' xl='4'></Col>
                        <Col className='order-xl-2 mb-5 mb-xl-0' xl='4'>
                            <Card className='card-profile shadow'>
                                <Row className='justify-content-center'>
                                    <Col className='order-lg-2' lg='3'>
                                        <div className='card-profile-image'>
                                            <img
                                                alt='...'
                                                className='rounded-circle'
                                                src={
                                                    Helpers.getImageUrl(avatarUrl)
                                                }
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className='text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'>
                                    <div className='d-flex justify-content-between'>
                                        <Button
                                            className='mr-4'
                                            color='info'
                                            href='#pablo'
                                            onClick={e => e.preventDefault()}
                                            size='sm'
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className='float-right'
                                            color='default'
                                            href='#pablo'
                                            onClick={e => e.preventDefault()}
                                            size='sm'
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className='pt-0 pt-md-4'>
                                    <Row>
                                        <div className='col'>
                                            <div className='card-profile-stats d-flex justify-content-center mt-md-5'>
                                                <div>
                                                    <span className='heading'>22</span>
                                                    <span className='description'>Friends</span>
                                                </div>
                                                <div>
                                                    <span className='heading'>10</span>
                                                    <span className='description'>Photos</span>
                                                </div>
                                                <div>
                                                    <span className='heading'>89</span>
                                                    <span className='description'>Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <div className='text-center'>
                                        <h3>
                                            {userName}
                                            <span className='font-weight-light'>

                                            </span>
                                        </h3>
                                        <div className='h5 font-weight-300'>
                                            <i className='ni location_pin mr-2' />
                                            {email}
                                        </div>
                                        <div className='h5 mt-4'>
                                            <i className='ni business_briefcase-24 mr-2' />
                                            {roles}
                                        </div>
                                        <div>
                                            <i className='ni education_hat mr-2' />
                                            {phoneNumber}
                                        </div>
                                        <hr className='my-4' />
                                        <p>
                                            {id}
                                        </p>
                                        <a href='#pablo' onClick={e => e.preventDefault()}>
                                            Show more
                                        </a>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className='order-xl-3 mb-5 mb-xl-0' xl='4'></Col>
                    </Row>
                </Container>
            </>
        );
    }
}

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
    user: { getUserByIdAsync },
}) => ({
    actions: {
        getUserByIdAsync,
        getAllRolesForSelectAsync,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);