import React, { useState, useEffect } from 'react';
import styles from './viewPendingPresentationRequest.module.scss';
import { Button, Card, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';
import { editorGetAllPendingResearchPapers, editorGetPendingResearchPaper } from '../../../../../../../services/util/editor/speakers';
import { Loader } from '../../../../../../../components/loader/loader';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function ViewPendingPresentationRequests() {
    let [presentation_request_list, set_presentation_request_list] = useState([]);
    let [is_page_loading, set_is_page_loading] = useState(false);
    let [is_single_item_loading, set_single_item_loading] = useState(false);
    let [modal_show, set_modal_show] = useState(false);
    let [single_request, set_single_request] = useState({});
    let [defaultScale, setdefaultScale] = useState(1.6);
    let [defaultScalePrecentage, setdefaultScalePrecentage] = useState(100);
    let [pageNumber, setpageNumber] = useState(1);
    let [numberOfPages, setnumberOfPages] = useState(0);
    let [cvObject, setcvObject] = useState({ url: null });
    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    };

    async function LoadPresentationRequest(id) {
        set_modal_show(true);
        set_single_item_loading(true);
        let respond = await editorGetPendingResearchPaper(id);
        if (respond.success) {
            let pdf_url = (respond.data.media_file).replace(/^.*\/\/[^\/]+/, '');
            set_single_item_loading(false);
            set_single_request(respond.data);
            setcvObject({ url: pdf_url });
        } else {
            set_single_item_loading(false);
            set_modal_show(false);
        }
    }

    function closeModal() {
        set_modal_show(false);
        set_single_request({});
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
        const LoadPresentations = async () => {
            set_is_page_loading(true);
            let respond = await editorGetAllPendingResearchPapers();
            if (respond.success === true) {
                set_is_page_loading(false);
                set_presentation_request_list(respond.data)
            } else {
                set_is_page_loading(false);
            }
        };
        LoadPresentations();
    }, [])

    return (
        <div>
            {is_page_loading ?
                <div className={styles.loaderComponent}>
                    <Loader />
                </div>
                :
                <Container fluid>
                    <Row>
                        {(presentation_request_list && (presentation_request_list).length > 0) ?
                            (presentation_request_list).map((values, idx) => (
                                <Col sm={3} key={idx}>
                                    <Card className={styles.researchPresentationCard} onClick={() => LoadPresentationRequest(values.researcher_id)}>
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
                                    <p className={styles.emptyMessage}>No presentation requests</p>
                                </div>
                            </Col>
                        }
                    </Row>
                </Container>

            } 
            <Modal show={modal_show} onHide={closeModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Presentation Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {is_single_item_loading ?
                        <div>
                            <Loader />
                        </div>
                        :
                        <div>
                            <Col className='mb-4'>
                                <Card className={styles.actionCard}>
                                    <Card.Body className={styles.actionCardBody}>
                                        <Row>
                                            <Col xs={4} lg={2}>
                                                <Image src={single_request.researcher_image ? single_request.researcher_image : `${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} className={styles.researcherImage2} />
                                            </Col>
                                            <Col className='align-self-center'>
                                                <p className={styles.researcherName}>{single_request.researcher_name}</p>
                                                <p className={styles.researcherEmail}>{single_request.researcher_email_address}</p>
                                                <p className={styles.researcherAffiliation}>{single_request.researcher_affiliation}</p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className={styles.cvViewCard}>
                                    <Card.Header className={styles.cardHeader}>
                                        <div className={styles.headerDetails}>
                                            <p className={styles.accordianHeaderTopic}><b>CV of</b>&nbsp;&nbsp;{single_request.researcher_name}</p>
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
                        </div>
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ViewPendingPresentationRequests
