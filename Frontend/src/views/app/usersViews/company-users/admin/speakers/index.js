import React, { Component } from 'react'
import { Card, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import { CustomButton } from '../../../../../../components/buttons';
import { Loader } from '../../../../../../components/loader/loader';
import { adminAcceptRequestedSpeaker, adminGetAllRequestedSpeakers, adminGetRequestedSpeaker, adminRejectRequestedSpeaker } from '../../../../../../services/util/admin/speaker';
import styles from './viewRequestedSpeakers.module.scss';

export class ViewRequestedSpeakers extends Component {
    constructor(props) {
        super(props)
        this.approveSpeaker = this.approveSpeaker.bind(this);
        this.rejectSpeaker = this.rejectSpeaker.bind(this);
        this.ViewSpeaker = this.ViewSpeaker.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.LoadSpeakers = this.LoadSpeakers.bind(this);
        this.state = {
            is_page_loading: false,
            all_speakers: [],
            is_modal_open:false,
            is_single_item_loading:false,
            single_request:{},
            submissionLoading:false
        }
    }

    async LoadSpeakers() {
        this.setState({ is_page_loading: true })
        let respond = await adminGetAllRequestedSpeakers();
        if (respond.success) {
            this.setState({ is_page_loading: false, all_speakers: respond.data })
        } else {
            this.setState({ is_page_loading: false })
        }
    };

    componentDidMount() {
        this.LoadSpeakers();
    }

    async approveSpeaker(id) {
        this.setState({ submissionLoading: true });
        let respond = await adminAcceptRequestedSpeaker(id);
        if(respond.success){
            this.setState({ submissionLoading: false, is_modal_open: false, single_request: {} });

        }else{
            this.setState({ submissionLoading: false });
        }
    }

    async rejectSpeaker(id) {
        this.setState({ submissionLoading: true });
        let respond = await adminRejectRequestedSpeaker(id);
        if (respond.success) {
            this.setState({ submissionLoading: false, is_modal_open: false, single_request: {} });
            this.LoadSpeakers();
        } else {
            this.setState({ submissionLoading: false });
        }
    }

    async ViewSpeaker(id){
        this.setState({ is_single_item_loading: true });
        let respond = await adminGetRequestedSpeaker(id);
        if(respond.success){
            this.setState({ is_modal_open: true, single_request: respond.data, is_single_item_loading:false });
            this.LoadSpeakers();
        }else{
            this.setState({ is_single_item_loading: false });
        }
        
    }

    closeModal(){
        this.setState({ is_modal_open: false, single_request: {} })
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
                            {(this.state.all_speakers && (this.state.all_speakers).length > 0) &&
                                (this.state.all_speakers).map((values, idx) => (
                                    <Col sm={3} key={idx}>
                                        <Card className={styles.speakerCard} onClick={() => this.ViewSpeaker(values.speaker_id)}>
                                            <div className={styles.headerBackground}></div>
                                            <Card.Body>
                                                <div>
                                                    <Image src={values.speaker_image ? values.speaker_image : `${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} className={styles.speakerImage} fluid />
                                                </div>
                                                <p className={styles.speakerName}>{values.speaker_name}</p>
                                                <p className={styles.speakerAffiliation}>{values.speaker_affiliation}</p>
                                                <Row className={styles.socialMediaRow}>
                                                    <Col>
                                                        <a href={values.speaker_social_media_links && values.speaker_social_media_links.facebook_link} >
                                                            <div className={styles.socialIconsBackground}>
                                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                                            </div>
                                                        </a>
                                                    </Col>
                                                    <Col>
                                                        <a href={values.speaker_social_media_links && values.speaker_social_media_links.twitter_link} >
                                                            <div className={styles.socialIconsBackground}>
                                                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                                            </div>
                                                        </a>
                                                    </Col>
                                                    <Col>
                                                        <a href={values.speaker_social_media_links && values.speaker_social_media_links.linkedin_link} >
                                                            <div className={styles.socialIconsBackground}>
                                                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                                                            </div>
                                                        </a>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                }
                <Modal show={this.state.is_modal_open} onHide={this.closeModal} centered size="md">
                    <Modal.Header closeButton>
                        <Modal.Title>Speaker Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.is_single_item_loading ?
                            <div>
                                <Loader />
                            </div>
                            :
                            <div>
                                <Col className='mb-4'>
                                    <Card className={styles.actionCard}>
                                        <Card.Img variant="top" src={this.state.single_request.speaker_image ? this.state.single_request.speaker_image : `${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} />
                                        <Card.Body className={styles.actionCardBody}>
                                            <Card.Title className='mb-3'>{this.state.single_request.speaker_name}</Card.Title>
                                            <Card.Subtitle className="mb-4 text-muted">{this.state.single_request.speaker_affiliation}</Card.Subtitle>
                                            <Row>
                                                <Col>
                                                    <a href={this.state.single_request.speaker_social_media_links && this.state.single_request.speaker_social_media_links.facebook_link} >
                                                        <div className={styles.socialIconsBackground}>
                                                            <i className="fa fa-facebook" aria-hidden="true"></i>
                                                        </div>
                                                    </a>
                                                </Col>
                                                <Col>
                                                    <a href={this.state.single_request.speaker_social_media_links && this.state.single_request.speaker_social_media_links.twitter_link} >
                                                        <div className={styles.socialIconsBackground}>
                                                            <i className="fa fa-twitter" aria-hidden="true"></i>
                                                        </div>
                                                    </a>
                                                </Col>
                                                <Col>
                                                    <a href={this.state.single_request.speaker_social_media_links && this.state.single_request.speaker_social_media_links.linkedin_link} >
                                                        <div className={styles.socialIconsBackground}>
                                                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                                                        </div>
                                                    </a>
                                                </Col>
                                            </Row>
                                            <Card.Text>
                                                
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>
                                                <Col>
                                                    <CustomButton
                                                        classType='successBtn'
                                                        label='Accept'
                                                        handleClick={() => this.approveSpeaker(this.state.single_request.speaker_id)}
                                                        buttonDisabled={this.state.submissionLoading ? true : false}
                                                    />
                                                </Col>
                                                <Col className='text-right'>
                                                    <CustomButton
                                                        classType='dangerBtn'
                                                        label='Reject'
                                                        handleClick={() => this.rejectSpeaker(this.state.single_request.speaker_id)}
                                                        buttonDisabled={this.state.submissionLoading ? true : false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default ViewRequestedSpeakers;
