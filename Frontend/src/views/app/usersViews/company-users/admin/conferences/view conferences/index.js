import React, { Component } from 'react';
import { Card, Col, Container, Row, Badge} from 'react-bootstrap';
import { CustomButton } from '../../../../../../../components/buttons';
import styles from './viewConferences.module.css';
import { toast } from 'react-toastify';
import moment from 'moment';
// import { activeConference, getAllConferences } from '../../../../../../../util/admin';

export class AdminViewConferences extends Component {
    constructor(props) {
        super(props)

        this.changeStateConference = this.changeStateConference.bind(this);
        this.state = {
            isPageLoading: false,
            conference_data_set: [],
            isSubmitLoading:false
        }
    }

    componentDidMount() {
        // let loadData = async () => {
        //     this.setState({ isPageLoading: true });
        //     let respond = await getAllConferences();
        //     if (respond.success === true) {
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

    async changeStateConference(id,state) {
        // console.log(id)
        // this.setState({ isSubmitLoading: true });
        // let respond = await activeConference(id, state);
        // if (respond.success === true){
        //     toast.success(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //         position: "top-right",
        //         autoClose: 2500,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     this.setState({ isSubmitLoading: false });
        // }else{
        //     toast.error(<div><i className="bi bi-exclamation-circle"></i>&nbsp;&nbsp;{respond.msg}</div>, {
        //         position: "top-right",
        //         autoClose: 2500,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     this.setState({ isSubmitLoading: false });
        // }
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
                                        <Card.Header>
                                            {values.is_conference_active?
                                                <span className={`badge badge-pill ${styles.badgeSuccess}`}>Active</span>
                                                :
                                                <span className={`badge badge-pill ${styles.badgeDanger}`}>Inactive</span>
                                            } 
                                        </Card.Header>
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
                                                    classType="formSubmitBtn"
                                                    buttonType="button"
                                                    label={values.is_conference_active?'Make Deactive':'Make Active'}
                                                    buttonDisabled={this.state.isSubmitLoading === true ? true : false}
                                                    handleClick={() => this.changeStateConference(values._id, !(values.is_conference_active))}
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

export default AdminViewConferences;
