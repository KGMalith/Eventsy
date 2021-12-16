import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CustomButton } from '../../../../../../../components/buttons';
import styles from './viewRequestedConferences.module.css';
import moment from 'moment';
// import { getPendingConference } from '../../../../../../../util/admin';

export class ViewRequestedConferences extends Component {
    constructor(props) {
        super(props)

        this.showConference = this.showConference.bind(this);
        this.state = {
            isPageLoading: false,
            conference_data_set: [],
        }
    }

    showConference(id) {
        this.props.history.push(`/app/admin-view-requested-conferences/${id}`);
    }

    componentDidMount() {
        // let loadData = async () => {
        //     this.setState({ isPageLoading: true });
        //     let respond = await getPendingConference();
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

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        {this.state.conference_data_set && this.state.conference_data_set.length > 0 &&
                            this.state.conference_data_set.map((values, idx) => (
                                <Col sm={4} key={idx}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title className={styles.cardTitle}>{values.conference_name}</Card.Title>
                                            <Row>
                                                <Col sm={4}>
                                                    <span className={styles.cardLabels}>Dates</span>
                                                </Col>
                                                <Col sm={8}>
                                                    <span className={styles.cardValues}>{values.conference_days && `${moment(values.conference_days.start_date).format('lll')} - ${moment(values.conference_days.end_date).format('lll')}`}</span>
                                                </Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col sm={4}>
                                                    <span className={styles.cardLabels}>Conference Type</span>
                                                </Col>
                                                <Col sm={8}>
                                                    <span className={styles.cardValues}>{values.conference_type}</span>
                                                </Col>
                                            </Row>
                                            <Col className="mt-3">
                                                <span className={styles.cardValuesDesc}>
                                                    {values.conference_about}
                                                </span>
                                            </Col>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Col className="text-center">
                                                <CustomButton
                                                    frontIcon={<i className="fa fa-pencil" aria-hidden="true"></i>}
                                                    classType="formSubmitBtn"
                                                    buttonType="button"
                                                    label="Edit"
                                                    handleClick={() => this.showConference(values._id)}
                                                />
                                            </Col>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ViewRequestedConferences;
