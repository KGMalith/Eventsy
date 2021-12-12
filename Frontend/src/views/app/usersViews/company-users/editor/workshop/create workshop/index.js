import React, { Component } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { getAllRequestedWorkshopConductors } from '../../../../../../../services/util/editor/workshops';
import { getAllSpeakersList } from '../../../../../../../services/util/editor/speakers';
import styles from './createWorkshop.module.scss';
import WorkshopForm from './workshopForm';
import { Loader } from '../../../../../../../components/loader/loader';

export class CreateWorkshop extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.state = {
            is_page_loading: false,
            isSubmitLoading: false,
            speakers_data_set: [],
            conductors_data_set:[]
        }
    }

    async submitForm(value, { resetForm }) {
        //     this.setState({ isSubmitLoading: true });
        //     let speakersArray = [];
        //     for (let index = 0; index < (value.speaker).length; index++) {
        //         speakersArray.push((value.speaker)[index].value);
        //     }
        //     let data = {
        //         speakers_id_list: speakersArray,
        //         workshop_name: value.workshopName,
        //         workshop_description: value.workshopDesc,
        //         workshop_date_and_time: value.dateTime
        //     };

        //     let respond = await ceateWorkshop(data);
        //     if(respond.success === true){
        //         resetForm({});
        //         toast.success(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //             position: "top-right",
        //             autoClose: 2500,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //         this.setState({ isSubmitLoading: false });
        //     }else{
        //         toast.error(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //             position: "top-right",
        //             autoClose: 2500,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //         this.setState({ isSubmitLoading: false });
        //     }

    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading: true });
            let speakersRespond = await getAllSpeakersList();
            let requestedConductorsRespond = await getAllRequestedWorkshopConductors();
            if (speakersRespond.success && requestedConductorsRespond) {
                this.setState({ is_page_loading: false, speakers_data_set: speakersRespond.data, conductors_data_set: requestedConductorsRespond.data });
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
                        <Loader/>
                    </div>
                    :
                    <Container fluid>
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Card>
                                <Card.Header>
                                    <Card.Title className={styles.cardTitle}>Create Workshop</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <WorkshopForm submitForm={this.submitForm} speakersList={this.state.speakers_data_set} conductorsList={this.state.conductors_data_set} isLoading={this.state.isSubmitLoading} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Container>
                }
            </div>
        )
    }
}

export default CreateWorkshop;
