import React, { Component } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { Loader } from '../../../../../../../../components/loader/loader';
import { uploadSpeakerImage, editTempSpeaker, getPendingSpeaker } from '../../../../../../../../services/util/editor/speakers';
import styles from './editSpeaker.module.scss';
import SpeakerForm from './editSpeakerForm';

export class EditSpeaker extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.state = {
            isSubmitLoading: false,
            is_page_loading: false,
            imageUploadPrecentage: 0,
            speaker_image_url: null,
            speaker_data: ''
        }
    }

    async uploadImage(value) {
        let image = value[0];
        let respond = await uploadSpeakerImage(image, this.setState.bind(this));
        if (respond.success) {
            this.setState({
                speaker_image_url: respond.data.file_path
            })
        }
    }

    async submitForm(value) {
        this.setState({ isSubmitLoading: true });
        let data = {
            speaker_id: this.props.match.params.id,
            speaker_title: value.speakerTitle,
            speaker_first_name: value.firstName,
            speaker_last_name: value.lastName,
            speaker_affiliation: value.affiliation,
            twitter_link: value.twitterLink,
            facebook_link: value.facebookLink,
            linkedin_link: value.linkedinLink,
            image_link: this.state.speaker_image_url
        }
        let respond = await editTempSpeaker(data);
        if (respond.success) {
            this.setState({ isSubmitLoading: false });
            this.props.history.push('/app/editor-pending-speakers');
        } else {
            this.setState({ isSubmitLoading: false });
        }
    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading: true })
            let respond = await getPendingSpeaker(this.props.match.params.id);
            if (respond.success) {
                this.setState({ is_page_loading: false, speaker_data: respond.data })
            } else {
                this.setState({ is_page_loading: false })
            }
        };
        LoadSpeakers();
    }

    render() {
        return (
            <div>
                {this.state.is_page_loading === true ?
                    <div className={styles.loaderComponent}>
                        <Loader/>
                    </div>
                    :
                <Container fluid>
                    <Col sm={{ span: 10, offset: 1 }}>
                        <Card>
                            <Card.Header>
                                <Card.Title className={styles.cardTitle}>Edit Pending Speaker</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <SpeakerForm uploadPrecentage={this.state.imageUploadPrecentage} submitForm={this.submitForm} speakerData={this.state.speaker_data} isSubmitLoading={this.state.isSubmitLoading} uploadImage={this.uploadImage} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            }
            </div>
        )
    }
}

export default EditSpeaker;
