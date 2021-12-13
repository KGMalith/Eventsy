import React, { Component } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { Loader } from '../../../../../../../components/loader/loader';
import { ceatePresentation } from '../../../../../../../services/util/editor/presentations';
import { getAllSpeakersList } from '../../../../../../../services/util/editor/speakers';
import styles from './createPresentation.module.scss';
import PresentationForm from './presentationForm';

export class CreatePresentation extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.state = {
            is_page_loading: false,
            isSubmitLoading: false,
            speakers_data_set: [],
        }
    }

    async submitForm(value, { resetForm }) {
        this.setState({ isSubmitLoading:true});
        let data = {
            speaker_id: value.speaker,
            presentation_topic: value.topic,
            presentation_description: value.presentationDesc,
            presentation_date_and_time: value.dateTime,
        }
        let respond = await ceatePresentation(data);
        if (respond.success === true){
            resetForm({});
            this.props.history.go(0);
            this.setState({ isSubmitLoading: false });
        }else{
            this.setState({ isSubmitLoading: false });
        }
    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading: true });
            let respond = await getAllSpeakersList();
            if (respond.success === true) {
                this.setState({ is_page_loading: false, speakers_data_set: respond.data });
            } else {
                this.setState({ is_page_loading: false });
            }
        };
        LoadSpeakers();
    }

    render() {
        return (
            <div>
                {this.state.is_page_loading === true ?
                    <div className={styles.loaderComponent}>
                        <Loader />
                    </div>
                    :
                    <Container fluid>
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Card>
                                <Card.Header>
                                    <Card.Title className={styles.cardTitle}>Create Presentation</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <PresentationForm submitForm={this.submitForm} speakersList={this.state.speakers_data_set} isLoading={this.state.isSubmitLoading} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Container>
                }
            </div>
        )
    }
}

export default CreatePresentation;
