import React, { Component } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import styles from './editPresentation.module.scss';
import PresentationForm from './presentationForm';
import { editPresentation, getPresentation } from '../../../../../../../../services/util/editor/presentations';
import { getAllSpeakersList } from '../../../../../../../../services/util/editor/speakers';
import { Loader } from '../../../../../../../../components/loader/loader';

export class EditPresentation extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.state = {
            is_page_loading: false,
            isSubmitLoading: false,
            speakers_data_set: [],
            presentation_data: ''
        }
    }

    async submitForm(value) {
        this.setState({ isSubmitLoading: true });
        let data = {
            presentation_id: this.props.match.params.id,
            presentation_topic: value.topic,
            presentation_description: value.presentationDesc,
            presentation_date_and_time: value.dateTime,
        }
        let respond = await editPresentation(data);
        if (respond.success) {
            this.setState({ isSubmitLoading: false });
            this.props.history.push('/app/editor-view-presentations');
        } else {
            this.setState({ isSubmitLoading: false });
        }
    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading: true });
            let respond = await getAllSpeakersList();
            let presentationList = await getPresentation(this.props.match.params.id);
            if (respond.success === true && presentationList.success === true) {
                this.setState({ is_page_loading: false, speakers_data_set: respond.data, presentation_data: presentationList.data });
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
                                    <Card.Title className={styles.cardTitle}>Edit Presentation</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <PresentationForm submitForm={this.submitForm} speakersList={this.state.speakers_data_set} presentationData={this.state.presentation_data} isSubmitLoading={this.state.isSubmitLoading} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Container>
                }
            </div>
        )
    }
}

export default EditPresentation;
