import React, { Component } from 'react';
import './about.scss';
import moment from 'moment';

export class About extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <section id="about" style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/about-bg.jpg)`}}>
                    <div className="container about-container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-lg-6" >
                                <h2>About The Event</h2>
                                <p>{this.props.bodyData ? this.props.bodyData.conference_about:'Not Available'}</p>
                            </div>
                            <div className="col-lg-3">
                                <h3>Where</h3>
                                <p>{this.props.bodyData ? `${this.props.bodyData.conference_location.location_name} (${this.props.bodyData.conference_type})` :'Not Available' }</p>
                            </div>
                            <div className="col-lg-3">
                                <h3>When</h3>
                                {this.props.bodyData ?
                                    <p>{moment(this.props.bodyData.conference_days.start_date).format('ll')} to <br />{moment(this.props.bodyData.conference_days.end_date).format('ll')}</p>
                                    :
                                    <p>Not Available</p>
                                }
                                
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default About
