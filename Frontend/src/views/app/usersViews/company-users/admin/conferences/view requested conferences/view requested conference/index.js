import React, { Component } from 'react'
// import { approveConference, getConference, rejectConference } from '../../../../../../../../util/admin';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CustomButton } from '../../../../../../../../components/buttons';
import styles from './viewRequestedConference.module.css';
import moment from 'moment';
import {toast} from 'react-toastify';

export class ViewRequestedConferece extends Component {
    constructor(props) {
        super(props)

        this.approveConference = this.approveConference.bind(this);
        this.rejectConference = this.rejectConference.bind(this);
        this.state = {
            isPageLoading: false,
            conference_data_set:'',
            isRejectLoading:false,
            isApproveLoading:false
        }
    }

    componentDidMount() {
        // let loadData = async () => {
        //     this.setState({ isPageLoading: true });
        //     let respond = await getConference(this.props.match.params.id);
        //     if (respond.success) {
        //         this.setState({ conference_data_set: respond.data, isPageLoading: false })
        //     } else {
        //         toast.error(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //             position: "top-right",
        //             autoClose: 2500,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //         this.setState({ isPageLoading: false });
        //     }
        // }
        // loadData();
    }

    async approveConference() {
        // this.setState({ isApproveLoading: true });
        // let respond = await approveConference(this.props.match.params.id);
        // if (respond.success) {
        //     toast.success(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //         position: "top-right",
        //         autoClose: 2500,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     this.setState({ isApproveLoading: false });
        //     this.props.history.push('/app/admin-view-requested-conferences');
        // } else {
        //     toast.error(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //         position: "top-right",
        //         autoClose: 2500,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     this.setState({ isApproveLoading: false });
        // }
    }

    async rejectConference() {
        // this.setState({ isRejectLoading: true });
        // let respond = await rejectConference(this.props.match.params.id);
        // if (respond.success) {
        //     this.props.history.push('/app/admin-view-requested-conferences');
        // } else {
        //     toast.error(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //         position: "top-right",
        //         autoClose: 2500,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     this.setState({ isRejectLoading: false });
        // }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    {this.state.isPageLoading === false &&
                    <Col >
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Conference Name :</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && this.state.conference_data_set.conference_name}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Conference title :</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && this.state.conference_data_set.conference_title}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Conference Sub Topic :</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && this.state.conference_data_set.conference_sub_topic}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Conference Type :</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && this.state.conference_data_set.conference_type}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Conference Location :</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && this.state.conference_data_set.conference_location.location_name}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Conference Location Description :</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && this.state.conference_data_set.conference_location.location_desc}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Dates:</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && `${moment(this.state.conference_data_set.conference_days.start_date).format('llll')} - ${moment(this.state.conference_data_set.conference_days.end_date).format('llll')}`}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Conference Organizer :</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && this.state.conference_data_set.conference_organizer}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <span className={styles.cardLabels}>Conference About :</span>
                                    </Col>
                                    <Col sm={8}>
                                        <span className={styles.cardValues}>{this.state.conference_data_set && this.state.conference_data_set.conference_about}</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Col>
                                    <div className={styles.buttonContainer}>
                                        <div>
                                            <CustomButton
                                                classType="formSubmitBtn"
                                                buttonType="button"
                                                label="Approve"
                                                handleClick={() => this.approveConference()}
                                                buttonDisabled={this.state.isApproveLoading === true ? true : false}
                                                backicon={this.state.isApproveLoading === true ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                                            />
                                        </div>
                                        <div>
                                            <CustomButton
                                                classType="formRejectBtn"
                                                buttonType="button"
                                                label="Reject"
                                                handleClick={() => this.rejectConference()}
                                                buttonDisabled={this.state.isRejectLoading === true ? true : false}
                                                backicon={this.state.isRejectLoading === true ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                                            />
                                        </div>
                                    </div>

                                </Col>
                            </Card.Footer>
                        </Card>
                    </Col>
                    }
                </Container>
            </div>
        )
    }
}

export default ViewRequestedConferece;
