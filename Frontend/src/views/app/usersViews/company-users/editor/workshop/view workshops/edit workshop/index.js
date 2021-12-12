import React, { Component } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { editWorkshop, getWorkshop } from '../../../../../../../../services/util/editor/workshops';
import { getAllSpeakersList } from '../../../../../../../../services/util/editor/speakers';
import styles from './editWorkshop.module.scss';
import WorkshopForm from './workshopForm';
import { Loader } from '../../../../../../../../components/loader/loader';

export class EditWorkshop extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.state = {
            is_page_loading: false,
            isSubmitLoading: false,
            speakers_data_set: [],
            workshop_data: ''
        }
    }

    async submitForm(value) {
        this.setState({ isSubmitLoading: true });

        let speakerList = [];
        for (let index = 0; index < (value.speaker).length; index++) {
            speakerList.push((value.speaker)[index].value)
        }

        let data = {
            workshop_id: this.props.match.params.id,
            speakers_id_list: speakerList,
            workshop_name: value.workshopName,
            workshop_description: value.workshopDesc,
            workshop_date_and_time: value.dateTime
        }

        let respond = await editWorkshop(data);
        if (respond.success === true) {
            this.setState({ isSubmitLoading: false });
            this.props.history.push('/app/editor-view-workshops');
        } else {
            this.setState({ isSubmitLoading: false });
        }
    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading: true });
            let respond = await getAllSpeakersList();
            let workshopResult = await getWorkshop(this.props.match.params.id);
            if (respond.success === true && workshopResult.success === true) {
                this.setState({ is_page_loading: false, speakers_data_set: respond.data, workshop_data: workshopResult.data });
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
                                    <Card.Title className={styles.cardTitle}>Edit Workshop</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <WorkshopForm submitForm={this.submitForm} workshopData={this.state.workshop_data} speakersList={this.state.speakers_data_set} isLoading={this.state.isSubmitLoading} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Container>
                }
            </div>
        )
    }
}

export default EditWorkshop;
