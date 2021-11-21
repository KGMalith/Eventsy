import React, { Component } from 'react';
import './hero.scss';
import {CustomButton} from '../../../../components/buttons';

export class Hero extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <section id="hero" style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/hero-bg.jpg)`}}>
                    <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
                        <h1 className="mb-3 pb-0">{this.props.bodyData && this.props.bodyData.conference_name ? this.props.bodyData.conference_name : 'Not Available'}</h1>
                        <h2 className="mb-2 pb-0"><span>{this.props.bodyData && this.props.bodyData.conference_title ? this.props.bodyData.conference_title : 'Not Available'}</span></h2>
                        <p className="mb-4 pb-0">{this.props.bodyData && this.props.bodyData.conference_sub_topic ? this.props.bodyData.conference_sub_topic:'Not Available'}</p>
                        <a href="#about">
                            <CustomButton
                                label="About The Event"
                                classType="primaryBtn"
                                buttonType="button"
                            />
                        </a>
                        
                    </div>
                </section>
            </div>
        )
    }
}

export default Hero;