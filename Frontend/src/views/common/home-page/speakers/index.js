import React, { Component } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import './speakers.scss';

export class Speakers extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <section id="speakers">
                    <Container data-aos="fade-up">
                        <div className="section-header">
                            <h2>KEY NOTE SPEAKERS</h2>
                            <p>Here are some of key noted speakers</p>
                        </div>
                        <Row>
                            {(this.props.bodyData.key_note_speakers).map((value, idx) => (
                                <Col md={6} lg={4} key={idx}>
                                    <div className="speaker" data-aos="fade-up" data-aos-delay="100">
                                        <Image src={value.speaker_image} alt="Speaker" fluid />
                                        <div className="details">
                                            <h3><span>{`${value.speaker_title} ${value.speaker_first_name} ${value.speaker_last_name}`}</span></h3>
                                            <p>{value.speaker_affiliation}</p>
                                            <div className="social">
                                                <a href={value.speaker_social_media.twitter_link}><i className="bi bi-twitter"></i></a>
                                                <a href={value.speaker_social_media.facebook_link}><i className="bi bi-facebook"></i></a>
                                                <a href={value.speaker_social_media.linkedin_link}><i className="bi bi-linkedin"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                            }
                        </Row>
                    </Container>
                </section>
            </div>
        )
    }
}

export default Speakers;
