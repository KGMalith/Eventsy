import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import {submitContactMessage } from '../../../../util/common';
import './contact.scss';
import ContactForm from './contactForm';
import { toast } from 'react-toastify';

export class Contact extends Component {
    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this);

        this.state = {
             issubmitLoading:false
        }
    }

    async submitForm(values, { resetForm}){
        
        // let data={
        //     contact_name: values.contactName,
        //     contact_email: values.contactEmail,
        //     contact_subject: values.contactSubject,
        //     conference_message: values.contactMessage
        // }

        // this.setState({ issubmitLoading:true});
        // let respond = await submitContactMessage(data);
        // if(respond.success){
        //     resetForm({});
        //     toast.success(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //         position: "top-right",
        //         autoClose: 2500,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     this.setState({ issubmitLoading: false });
        // }else{
        //     toast.error(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //         position: "top-right",
        //         autoClose: 2500,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     this.setState({ issubmitLoading: false });
        // }
    }
    
    render() {
        return (
            <div>
                <section id="contact" className="section-bg">
                    <Container data-aos="fade-up">
                        <div className="section-header">
                            <h2>Contact Us</h2>
                            <p>Have a question in mind? Contact us.</p>
                        </div>
                        <Row className="contact-info">
                            <Col md={4}>
                                <div className="contact-address">
                                    <i className="bi bi-geo-alt"></i>
                                    <h3>Address</h3>
                                    <address>{this.props.bodyData ? this.props.bodyData.contact_details.address:'Not Available'}</address>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="contact-phone">
                                    <i className="bi bi-geo-alt"></i>
                                    <h3>Phone Number</h3>
                                    <p><a>{this.props.bodyData ? this.props.bodyData.contact_details.phone_number : 'Not Available'}</a></p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="contact-email">
                                    <i className="bi bi-geo-alt"></i>
                                    <h3>Email</h3>
                                    <p><a>{this.props.bodyData ? this.props.bodyData.contact_details.email : 'Not Available'}</a></p>
                                </div>
                            </Col>
                        </Row>
                        <ContactForm submitForm={this.submitForm} isLoading={this.state.issubmitLoading}/>
                    </Container>
                </section>
            </div>
        )
    }
}

export default Contact;
