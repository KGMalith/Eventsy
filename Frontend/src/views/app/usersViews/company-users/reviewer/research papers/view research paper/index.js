import React, { useState, useEffect } from 'react';
import styles from './viewResearchPaper.module.scss';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { CustomButton } from '../../../../../../../components/buttons';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams,useHistory } from 'react-router-dom';
import { Loader } from '../../../../../../../components/loader/loader';
import { reviewerAcceptResearchPaper, reviewerGetResearchPaper, reviewerRejectResearchPaper } from '../../../../../../../services/util/reviewer/research paper';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


function ViewResearchPaper() {

    let [is_page_loading, set_page_loading] = useState(false);
    let [research_paper, set_research_paper] = useState({});
    let [defaultScalePrecentage, setdefaultScalePrecentage] = useState(100);
    let [defaultScale, setdefaultScale] = useState(1.6);
    let [pageNumber, setpageNumber] = useState(1);
    let [numberOfPages, setnumberOfPages] = useState(0);
    let [cvObject, setcvObject] = useState({ url: null });
    let [submissionLoading,setSubmissionLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    };

    async function AcceptResearchPaperRequest() {
        setSubmissionLoading(true);
        let respond = await reviewerAcceptResearchPaper(id);
        if (respond.success === true) {
            setSubmissionLoading(false);
            history.push('/app/reviewer-view-research-papers');
        } else {
            setSubmissionLoading(false);
        }
    }

    async function RejectResearchPaperRequest() {
        setSubmissionLoading(true);
        let respond = await reviewerRejectResearchPaper(id);
        if (respond.success === true) {
            setSubmissionLoading(false);
            history.push('/app/reviewer-view-research-papers');
        } else {
            setSubmissionLoading(false);
        }
    }

    const zoomin = () => {
        if (defaultScale < 2) {
            setdefaultScale(defaultScale + 0.2);
            setCvViewprecentage((defaultScale + 0.2));
        }

    }

    const zoomout = () => {
        if (defaultScale > 1.0000000000000002) {
            setdefaultScale(defaultScale - 0.2);
            setCvViewprecentage((defaultScale - 0.2));
        }
    }

    function setCvViewprecentage(value) {
        //check scale value and change precentage value according to scale value
        setdefaultScalePrecentage(value === 2 ? 150 : value === 1.8 ? 125 : value === 1.6 ? 100 : value === 1.4000000000000001 ? 75 : value === 1.2000000000000002 ? 50 : value === 1.0000000000000002 ? 25 : 0);
    }

    function nextPage() {
        if (pageNumber !== numberOfPages) {
            setpageNumber(prevState => prevState.pageNumber + 1);
        }
    }

    function prevPage() {
        if (pageNumber !== 1) {
            setpageNumber(prevState => prevState.pageNumber - 1);
        }
    }

    //on pdf load success
    function onDocumentLoadSuccess({ numPages }) {
        setnumberOfPages(numPages);
    }

    useEffect(() => {
        const LoadSpeakers = async () => {
            set_page_loading(true);
            let respond = await reviewerGetResearchPaper(id);
            if (respond.success === true) {
                let pdf_url = (respond.data.media_file).replace(/^.*\/\/[^\/]+/, '');
                set_page_loading(false);
                set_research_paper(respond.data);
                setcvObject({ url: pdf_url });
            } else {
                set_page_loading(false);
            }
        };
        LoadSpeakers();
    }, [])

    return (
        <div>
            {is_page_loading?
                <div className={styles.loaderComponent}>
                    <Loader />
                </div>
                :
                <Container fluid>
                    <Col lg={{ span: 10, offset: 1 }} className='mb-4'>
                        <Card className={styles.actionCard}>
                            <Card.Body className={styles.actionCardBody}>
                                <Row>
                                    <Col xs={4} lg={2}>
                                        <Image src={research_paper.researcher_image ? research_paper.researcher_image : `${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} className={styles.researcherImage} />
                                    </Col>
                                    <Col className='align-self-center'>
                                        <p className={styles.researcherName}>{research_paper.researcher_name}</p>
                                        <p className={styles.researcherEmail}>{research_paper.researcher_email_address}</p>
                                        <p className={styles.researcherAffiliation}>{research_paper.researcher_affiliation}</p>
                                    </Col>
                                    <Col xs={12} sm={6} lg={4} className='align-self-center'>
                                        <Row>
                                            <Col>
                                                <CustomButton
                                                    classType='successBtn'
                                                    label='Accept'
                                                    handleClick={() => AcceptResearchPaperRequest()}
                                                    buttonDisabled={submissionLoading ? true : false}
                                                />
                                            </Col>
                                            <Col>
                                                <CustomButton
                                                    classType='dangerBtn'
                                                    label='Reject'
                                                    handleClick={() => RejectResearchPaperRequest()}
                                                    buttonDisabled={submissionLoading ? true : false}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={{ span: 10, offset: 1 }}>

                        <Card className={styles.cvViewCard}>
                            <Card.Header className={styles.cardHeader}>
                                <div className={styles.headerDetails}>
                                    <p className={styles.accordianHeaderTopic}><b>CV of</b>&nbsp;&nbsp;{research_paper.researcher_name}</p>
                                    <div className={styles.pdfcomponentActions}>
                                        <div className={styles.cvZoomcomponent}>
                                            <Button className={styles.zoomOutBtn} onClick={() => zoomout()} disabled={defaultScalePrecentage === 25 ? true : false}>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15.75 15.7498L12.4875 12.4873" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M6 8.25H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                            <span className="ml-2 mr-2">{defaultScalePrecentage}%</span>
                                            <Button className={styles.zoomBtn} onClick={() => zoomin()} disabled={defaultScalePrecentage === 150 ? true : false}>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15.75 15.7498L12.4875 12.4873" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.25 6V10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M6 8.25H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                        </div>
                                        <div className={styles.pageChangerComponent}>
                                            <Button className={styles.pagePreviousBtn} disabled={pageNumber === 1 ? true : false} onClick={() => prevPage()}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                            <span className="ml-2 mr-2"><span>{pageNumber}/{numberOfPages}</span></span>
                                            <Button className={styles.pageNextBtn} disabled={pageNumber === numberOfPages ? true : false} onClick={() => nextPage()}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className={styles.cvViewBody}>
                                <Document
                                    file={cvObject}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    options={options}
                                    loading={<div>
                                        <Col sm={{ span: 4, offset: 4 }}>
                                            <Loader />
                                        </Col>
                                    </div>}
                                >
                                    <Page pageNumber={pageNumber} scale={defaultScale} />
                                </Document>
                            </Card.Body>
                        </Card>

                    </Col>
                </Container>
            }
        </div>
    )
}

export default ViewResearchPaper;
