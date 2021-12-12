import React, { Component } from 'react';
import {Container, Row } from 'react-bootstrap';
import { CustomButton } from '../../../../../../../components/buttons';
import styles from './viewConference.module.scss';
import { getAllConferences } from '../../../../../../../services/util/editor/conference';
import { Loader } from '../../../../../../../components/loader/loader';
import moment from 'moment';

export class ViewConferences extends Component {
    constructor(props) {
        super(props)

        this.previewConference = this.previewConference.bind(this);
        this.editConference = this.editConference.bind(this);
        this.state = {
            is_page_loading: false,
            conference_data_set: []
        }
    }

    componentDidMount() {
        const getAllData = async () => {
            this.setState({ is_page_loading: true })
            let respond = await getAllConferences();
            if (respond.success === true) {
                this.setState({
                    conference_data_set: respond.data,
                    is_page_loading: false
                })
            } else {
                this.setState({ is_page_loading: false });
            }
        }
        getAllData();
    }

    previewConference(id) {
        this.props.history.push(`/app/view-conference-preview/${id}`);
    }

    editConference(id) {
        this.props.history.push(`/app/editor-conferences/${id}`);
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
                        <Row>
                            {this.state.conference_data_set.length > 0 &&
                                this.state.conference_data_set.map((values,idx)=>(
                                    <div className="col-md-6" key={idx}>
                                        <div className={`card ${styles.workshopCard}`}>
                                            <div className="card-body">
                                                <div className={styles.eventTitle}>
                                                    <h3 className={styles.title}>{values.conference_name}</h3>
                                                </div>
                                                <p className={styles.eventDesc}>
                                                    {values.conference_about}
                                                </p>
                                                <div className="row mt-4">
                                                    <div className="col">
                                                        <div>
                                                            <span className={styles.IconBox}>
                                                                <i className="bi bi-briefcase"></i>
                                                            </span>
                                                            <div className={styles.eventDetailsBox}>
                                                                <span className={styles.eventLabel}>Organizer</span>
                                                                <p className={styles.eventValue}>{values.conference_organizer}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div>
                                                            <span className={styles.IconBox}>
                                                                <i className="bi bi-clock"></i>
                                                            </span>
                                                            <div className={styles.eventDetailsBox}>
                                                                <span className={styles.eventLabel}>Event Dates</span>
                                                                <p className={styles.eventValue}>{moment(values.conference_days && values.conference_days.start_date).format('ll')}&nbsp;-&nbsp;{moment(values.conference_days && values.conference_days.end_date).format('ll')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col">
                                                        <div>
                                                            <span className={styles.IconBox}>
                                                                <i className="bi bi-pin-map"></i>
                                                            </span>
                                                            <div className={styles.eventDetailsBox}>
                                                                <span className={styles.eventLabel}>Location</span>
                                                                <p className={styles.eventValue}>{values.conference_location && values.conference_location.location_name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div>
                                                            <span className={styles.IconBox}>
                                                                <i className="bi bi-easel"></i>
                                                            </span>
                                                            <div className={styles.eventDetailsBox}>
                                                                <span className={styles.eventLabel}>Conference Type</span>
                                                                <p className={styles.eventValue}>{values.conference_type}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col">
                                                        <CustomButton
                                                            classType="tertiaryBtn"
                                                            buttonType="button"
                                                            label="Preview"
                                                            handleClick={() => this.previewConference(values._id)}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <CustomButton
                                                            classType="feeCardBtn"
                                                            buttonType="button"
                                                            label="Edit"
                                                            handleClick={() => this.editConference(values._id)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Row>
                    </Container>
                }
            </div>
        )
    }
}

export default ViewConferences;
