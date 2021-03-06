import React, { Component } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { Loader } from '../../../../../../../../components/loader/loader';
import { editConference, getConference, uploadConferenceImagesList, uploadConferenceLocationImages } from '../../../../../../../../services/util/editor/conference';
import { getAllPresentationsList } from '../../../../../../../../services/util/editor/presentations';
import { getAllSpeakersList } from '../../../../../../../../services/util/editor/speakers';
import { getAllWorkshopsList } from '../../../../../../../../services/util/editor/workshops';
import ConferenceForm from './conferenceForm';
import styles from './editConference.module.scss';

export class EditConference extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.uploadConferenceImages = this.uploadConferenceImages.bind(this);
        this.uploadLocationImages = this.uploadLocationImages.bind(this);
        this.state = {
            is_page_loading: false,
            isSubmitLoading: false,
            workshop_data_set: [],
            presentation_data_set: [],
            speakers_data_set: [],
            conference_data: {
                conference_days: {},
                registration_fees: {},
                contact_details: {},
                conference_location: {}
            },
            conference_image_urls: [],
            location_image_urls: [],
            uploadPrecentageConference: 0,
            uploadPrecentageLocation: 0
        }
    }

    async uploadConferenceImages(images) {
        let imageURLs = [];
        for (let index = 0; index < images.length; index++) {
            let respond = await uploadConferenceImagesList(images[index], this.setState.bind(this));
            imageURLs.push(respond.data.file_path);
        }
        this.setState({
            conference_image_urls: imageURLs
        })
    }

    async uploadLocationImages(images) {
        let imageURLs = [];
        for (let index = 0; index < images.length; index++) {
            let respond = await uploadConferenceLocationImages(images[index], this.setState.bind(this));
            imageURLs.push(respond.data.file_path);
        }
        this.setState({
            location_image_urls: imageURLs
        })
    }

    async submitForm(value) {
        this.setState({ isSubmitLoading: true });

        let presentation_object_array = [];
        let workshop_object_array = [];
        let speaker_object_array = [];

        if (value.workshoplist && value.pesentationlist && value.speakerlist) {
            for (let index = 0; index < (value.workshoplist).length; index++) {
                workshop_object_array.push((value.workshoplist)[index].value);
            }

            for (let index = 0; index < (value.pesentationlist).length; index++) {
                presentation_object_array.push((value.pesentationlist)[index].value);
            }

            for (let index = 0; index < (value.speakerlist).length; index++) {
                speaker_object_array.push((value.speakerlist)[index].value);
            }
        }

        let data = {
            conference_id: this.props.match.params.id,
            conference_name: value.conferenceName,
            conference_sub_topic: value.conferenceSubTopic,
            conference_type: value.conferenceType,
            conference_location_name: value.locationName,
            conference_location_desc: value.locationDesc,
            conference_location_google_map_link: value.locationLink,
            conference_location_images_array: this.state.location_image_urls,
            conference_start_date: value.conferenceDays[0],
            conference_end_date: value.conferenceDays[1],
            conference_organizer: value.confereceOrganizer,
            conference_about: value.conferenceAbout,
            conference_images_array: this.state.conference_image_urls,
            attendee_registration_fee: value.attendeeFee,
            researcher_registration_fee: value.researcherFee,
            workshop_conductor_fee: value.workshopConductorFee,
            contact_address: value.contactAddress,
            contact_number: value.contactNumber,
            contact_email: value.contactEmail,
            key_note_speakers: speaker_object_array,
            conference_workshops: workshop_object_array,
            conference_reserch_paper_presentations: presentation_object_array
        }

        let respond = await editConference(data);
        if (respond.success) {
            this.setState({ isSubmitLoading: false });
            this.props.history.push('/app/editor-conferences');
        } else {
            this.setState({ isSubmitLoading: false });
        }
    }

    componentDidMount() {
        const getAllData = async () => {
            this.setState({ is_page_loading: true })
            let respondWorkshop = await getAllWorkshopsList();
            let respondPresentation = await getAllPresentationsList();
            let respondSpeakers = await getAllSpeakersList();
            let respondConference = await getConference(this.props.match.params.id);

            if (respondWorkshop.success === true && respondPresentation.success === true && respondSpeakers.success === true && respondConference.success === true) {
                this.setState({
                    speakers_data_set: respondSpeakers.data,
                    workshop_data_set: respondWorkshop.data,
                    presentation_data_set: respondPresentation.data,
                    conference_data: respondConference.data,
                    is_page_loading: false
                })
            } else {
                this.setState({ is_page_loading: false });
            }
        }
        getAllData();
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
                                    <Card.Title className={styles.cardTitle}>Edit Conference</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <ConferenceForm workshops={this.state.workshop_data_set} presentations={this.state.presentation_data_set} speakers={this.state.speakers_data_set} submitForm={this.submitForm} conferenceData={this.state.conference_data} isLoading={this.state.isSubmitLoading} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Container>
                }
            </div>
        )
    }
}

export default EditConference;
