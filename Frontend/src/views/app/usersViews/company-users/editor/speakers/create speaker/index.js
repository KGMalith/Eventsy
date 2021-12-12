import React, { Component } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { ceateSpeaker, uploadSpeakerImage } from '../../../../../../../services/util/editor/speakers';
import styles from './createSpeaker.module.scss';
import SpeakerForm from './speakerForm';

export class CreateSpeaker extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.state = {
            isSubmitLoading: false,
            imageUploadPrecentage:0,
            speaker_image_url:''
        }
    }

    async uploadImage (value){
        let image = value[0];
        let respond = await uploadSpeakerImage(image, this.setState.bind(this));
        if (respond.success === true){
            this.setState({
                speaker_image_url: respond.data.file_path
            })
        }
    }

    async submitForm(value, { resetForm }) {
        this.setState({ isSubmitLoading: true });
        let data = {
            speaker_title: value.speakerTitle,
            speaker_first_name: value.firstName,
            speaker_last_name: value.lastName,
            speaker_affiliation: value.affiliation,
            twitter_link: value.twitterLink,
            facebook_link: value.facebookLink,
            linkedin_link: value.linkedinLink,
            image_link: this.state.speaker_image_url
        }
        let respond = await ceateSpeaker(data);
        if (respond.success === true) {
            resetForm({});
            this.setState({ isSubmitLoading: false });
        } else {
            this.setState({ isSubmitLoading: false });
        }
    }
    render() {
        return (
            <div>
                <Container fluid>
                    <Col sm={{ span: 10, offset: 1 }}>
                        <Card>
                            <Card.Header>
                                <Card.Title className={styles.cardTitle}>Create Speaker</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <SpeakerForm uploadPrecentage={this.state.imageUploadPrecentage} submitForm={this.submitForm} isSubmitLoading={this.state.isSubmitLoading} uploadImage={this.uploadImage}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            </div>
        )
    }
}

export default CreateSpeaker;
