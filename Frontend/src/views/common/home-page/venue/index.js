import React, { Component } from 'react';
import {Col, Image, Row } from 'react-bootstrap';
import './venue.scss';

export class Venue extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <section id="venue">
                    <div className="container-fluid" data-aos="fade-up">
                        <div className="section-header">
                            <h2>Event Venue</h2>
                            <p>Event venue location info and gallery</p>
                        </div>
                        <div className="row g-0">
                            <div className="col-lg-6 venue-map">
                                <div dangerouslySetInnerHTML={{ __html: `<iframe src={${this.props.bodyData && this.props.bodyData.conference_location.location_google_map_link}} frameBorder='0' style='border:0' allowFullScreen></iframe>` }} />
                            </div>

                            <div className="col-lg-6 venue-info" style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/venue-info-bg.jpg)`}}>
                                <div className="row justify-content-center">
                                    <div className="col-11 col-lg-8 position-relative">
                                        <h3>{this.props.bodyData ? this.props.bodyData.conference_location.location_name:'Not Available'}</h3>
                                        <p>{this.props.bodyData ? this.props.bodyData.conference_location.location_desc : 'Not Available'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.bodyData && (this.props.bodyData.conference_location.location_images).length > 0 &&
                        (this.props.bodyData.conference_location.location_images).map((value,idx)=>(
                            <div className="container-fluid venue-gallery-container" data-aos="fade-up" data-aos-delay="100" key={idx}>
                                <Row className="g-0">
                                    <Col md={4} lg={3}>
                                        <div className="venue-gallery">
                                            <a href={value} className="glightbox" data-gall="venue-gallery">
                                                <Image src={value} alt="" fluid />
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))
                    }
                </section>
            </div>
        )
    }
}

export default Venue;
