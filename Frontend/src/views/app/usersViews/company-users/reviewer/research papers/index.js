import React, { Component } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Loader } from '../../../../../../components/loader/loader';
import { reviewerGetAllResearchPapers } from '../../../../../../services/util/reviewer/research paper';
import styles from './researchPapers.module.scss';

export class ResearchPapers extends Component {
    constructor(props) {
        super(props)
        this.LoadViewResearchPaper = this.LoadViewResearchPaper.bind(this);
        this.state = {
            is_page_loading: false,
            all_research_papers: []
        }
    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading: true })
            let respond = await reviewerGetAllResearchPapers();
            if (respond.success) {
                this.setState({ is_page_loading: false, all_research_papers: respond.data })
            } else {
                this.setState({ is_page_loading: false })
            }
        };
        LoadSpeakers();
    }

    LoadViewResearchPaper(id) {
        this.props.history.push(`/app/reviewer-view-research-papers/${id}`);
    }

    render() {
        console.log(this.state.all_research_papers)
        return (
            <div>
                {this.state.is_page_loading === true ?
                    <div className={styles.loaderComponent}>
                        <Loader />
                    </div>
                    :
                    <Container fluid>
                        <Row>
                            {(this.state.all_research_papers && (this.state.all_research_papers).length > 0) ?
                                (this.state.all_research_papers).map((values, idx) => (
                                    <Col sm={3} key={idx}>
                                        <Card className={styles.researchPaperCard} onClick={() => this.LoadViewResearchPaper(values.researcher_id)}>
                                            <div className={styles.headerBackground}></div>
                                            <Card.Body>
                                                <div>
                                                    <Image src={values.researcher_image ? values.researcher_image : `${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} className={styles.researcherImage} fluid />
                                                </div>
                                                <p className={styles.researcherName}>{values.researcher_name}</p>
                                                <p className={styles.researcherEmail}>{values.researcher_email_address}</p>
                                                <p className={styles.researcherAffiliation}>{values.researcher_affiliation}</p>
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
                                        <p className={styles.emptyMessage}>No research papers</p>
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

export default ResearchPapers;
