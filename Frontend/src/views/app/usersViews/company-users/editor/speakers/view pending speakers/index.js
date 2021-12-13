import React, { Component } from 'react';
import { Col, Container, Row, Card, Image, Badge } from 'react-bootstrap';
import { Loader } from '../../../../../../../components/loader/loader';
import { getPendingSpeakers } from '../../../../../../../services/util/editor/speakers';
import styles from './viewPendingSpeakers.module.scss';

export class ViewPendingSpeakers extends Component {
    constructor(props) {
        super(props)
        this.LoadEditSpeaker = this.LoadEditSpeaker.bind(this);
        this.state = {
            is_page_loading: false,
            all_speakers: []
        }
    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading:true})
            let respond = await getPendingSpeakers();
            if (respond.success === true) {
                this.setState({ is_page_loading: false, all_speakers: respond.data})
            }else{
                this.setState({ is_page_loading: false })
            }
        };
        LoadSpeakers();
    }

    LoadEditSpeaker(id){
        this.props.history.push(`/app/editor-pending-speakers/${id}`);
    }

    render() {
        return (
            <div>
                {this.state.is_page_loading === true?
                    <div className={styles.loaderComponent}>
                        <Loader />
                    </div>
                    :
                    <Container fluid>
                        <Row>
                            {(this.state.all_speakers && (this.state.all_speakers).length > 0) &&
                                (this.state.all_speakers).map((values,idx)=>(
                                    <Col sm={3} key={idx}>
                                        <Card className={styles.speakerCard} onClick={() => this.LoadEditSpeaker(values.speaker_id)}>
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
            </div>
        )
    }
}

export default ViewPendingSpeakers;
