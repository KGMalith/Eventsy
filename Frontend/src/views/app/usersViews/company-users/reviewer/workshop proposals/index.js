import React, { Component } from 'react'
import styles from './workshopProposals.module.scss';
import { Loader } from '../../../../../../components/loader/loader';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { reviewerGetAllWorkshopProposals } from '../../../../../../services/util/reviewer/workshop proposals';

export class WorkShopProposals extends Component {
    constructor(props) {
        super(props)
        this.LoadWorkshopProposal = this.LoadWorkshopProposal.bind(this);
        this.state = {
            is_page_loading: false,
            all_workshop_proposals: []
        }
    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading: true })
            let respond = await reviewerGetAllWorkshopProposals();
            if (respond.success === true) {
                this.setState({ is_page_loading: false, all_workshop_proposals: respond.data })
            } else {
                this.setState({ is_page_loading: false })
            }
        };
        LoadSpeakers();
    }

    LoadWorkshopProposal(id) {
        this.props.history.push(`/app/reviewer-view-workshop-proposals/${id}`);
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
                            {(this.state.all_workshop_proposals && (this.state.all_workshop_proposals).length > 0) ?
                                (this.state.all_workshop_proposals).map((values, idx) => (
                                    <Col sm={3} key={idx}>
                                        <Card className={styles.workshopProposalCard} onClick={() => this.LoadWorkshopProposal(values.workshop_conductor_id)}>
                                            <div className={styles.headerBackground}></div>
                                            <Card.Body>
                                                <div>
                                                    <Image src={values.workshop_conductor_image ? values.workshop_conductor_image : `${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} className={styles.workshopConductorImage} fluid />
                                                </div>
                                                <p className={styles.workshopConductorName}>{values.workshop_conductor_name}</p>
                                                <p className={styles.workshopConductorEmail}>{values.workshop_conductor_email_address}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                                :
                                <Col className={styles.MainMessageComponent}>
                                    <div className={styles.innerMessageComponent}>
                                        <div className={styles.iconContainer}>
                                            <i className="fa fa-file-pdf-o fa-4x" aria-hidden="true"></i>
                                        </div>
                                        <p className={styles.emptyMessage}>No workshop proposals</p>
                                    </div>
                                </Col>
                            }
                        </Row>
                    </Container>
                }
            </div>
        )
    }
}

export default WorkShopProposals;
