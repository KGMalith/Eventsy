import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './fees.scss';
import {CustomButton} from '../../../../components/buttons';

export class Fees extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <section id="fees" className="section-with-bg">
                    <Container data-aos="fade-up">
                        <div className="section-header">
                            <h2>Registration Fees</h2>
                            <p>Check registration fees of current event</p>
                        </div>

                        <Row>
                            <Col lg={4} data-aos="fade-up" data-aos-delay="100">
                                <Card className="mb-5 mb-lg-0">
                                    <Card.Body className="card-body-fees">
                                        <h5 className="card-title text-muted text-uppercase text-center">Attendee Registration Fee</h5>
                                        <h6 className="card-price text-center">{this.props.bodyData ? ((this.props.bodyData.registration_fees.attendee_registration_fee) === 0 ? 'Free' : 'RS. '+(this.props.bodyData.registration_fees.attendee_registration_fee).toFixed(2)) : 'Not Available'}</h6>
                                        <hr />
                                        <div className="text-center">
                                            <CustomButton 
                                                classType="feeCardBtn"
                                                buttonType="button"
                                                label="Register Now"
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4} data-aos="fade-up" data-aos-delay="200">
                                <Card className="mb-5 mb-lg-0">
                                    <Card.Body>
                                        <h5 className="card-title text-muted text-uppercase text-center">Researcher Registration Fee</h5>
                                        <h6 className="card-price text-center">{this.props.bodyData ? ((this.props.bodyData.registration_fees.researcher_registration_fee) === 0 ? 'Free' : 'RS. ' +(this.props.bodyData.registration_fees.researcher_registration_fee).toFixed(2)) : 'Not Available'}</h6>
                                        <hr />
                                        <div className="text-center">
                                            <CustomButton
                                                classType="feeCardBtn"
                                                buttonType="button"
                                                label="Register Now"
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4} data-aos="fade-up" data-aos-delay="300">
                                <Card className="mb-5 mb-lg-0">
                                    <Card.Body>
                                        <h5 className="card-title text-muted text-uppercase text-center">Workshop Conductor Registration Fee</h5>
                                        <h6 className="card-price text-center">{this.props.bodyData ? ((this.props.bodyData.registration_fees.workshop_conductor_registration_fee) === 0 ? 'Free' : 'RS. ' +(this.props.bodyData.registration_fees.workshop_conductor_registration_fee).toFixed(2)):'Not Available'}</h6>
                                        <hr />
                                        <div className="text-center">
                                            <CustomButton
                                                classType="feeCardBtn"
                                                buttonType="button"
                                                label="Register Now"
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        )
    }
}

export default Fees;
