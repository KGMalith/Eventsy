import React, { Component } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import styles from './conferencePreview.module.scss';
import { Loader } from '../../../../../components/loader/loader';
import { CustomButton } from '../../../../../components/buttons';
import ContactForm from '../../../../common/home-page/contact/contactForm';
import { getConferencePreview, getPendingConferencePreview } from '../../../../../services/util/editor/conference';
import moment from 'moment';
import Glightbox from 'glightbox';
import Swiper from 'swiper';

export class ConferencePreview extends Component {
    constructor(props) {
        super(props)
        this.navBarClicked = this.navBarClicked.bind(this);
        this.state = {
            is_navbar_clicked: false,
            is_page_loading: false,
            title_first_Word_Set: null,
            title_middle_Word_Set: null,
            title_final_Word_Set: null,
            conference_data_set: {
                conference_about: '',
                conference_days: {},
                conference_images: [],
                conference_location: {
                    location_images: []
                },
                conference_name: '',
                conference_organizer: '',
                conference_sub_topic: '',
                conference_type: '',
                contact_details: {},
                key_note_speakers: [],
                registration_fees: {
                    attendee_registration_fee: 0,
                    researcher_registration_fee: 0,
                    workshop_conductor_registration_fee: 0
                },
                seat_capacity: {}
            },
        }
    }

    navBarClicked() {
        this.setState({ is_navbar_clicked: !(this.state.is_navbar_clicked) })
    }

    componentDidMount() {
        let respond = '';
        const getAllData = async () => {
            this.setState({ is_page_loading: true })
            if (this.props.location.search) {
                respond = await getPendingConferencePreview(this.props.match.params.id);
            } else {
                respond = await getConferencePreview(this.props.match.params.id);
            }
            if (respond.success === true) {
                //conference name divide to make highlight
                if (respond.data.conference_name) {
                    let wordsArray = respond.data.conference_name.split(" ");
                    let firstWordSet = '';
                    let middleWord = '';
                    let finalWordSet = '';
                    if (wordsArray.length > 3) {
                        firstWordSet = wordsArray[0] + ' ' + wordsArray[1];
                        middleWord = wordsArray[2];
                        for (let index = 3; index < wordsArray.length; index++) {
                            finalWordSet = finalWordSet + ' ' + wordsArray[index];
                        }
                        this.setState({ title_first_Word_Set: firstWordSet, title_middle_Word_Set: middleWord, title_final_Word_Set: finalWordSet });
                    } else {
                        finalWordSet = respond.data.conference_name;
                        this.setState({ title_final_Word_Set: finalWordSet });
                    }
                }
                this.setState({
                    conference_data_set: respond.data,
                    is_page_loading: false
                })
                Glightbox({ selector: '.gallery-lightbox' });
                new Swiper('.gallery-slider', {
                    speed: 400,
                    loop: true,
                    centeredSlides: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    slidesPerView: 'auto',
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        575: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        992: {
                            slidesPerView: 5,
                            spaceBetween: 20
                        }
                    }
                });
            } else {
                this.setState({ is_page_loading: false });
            }
        }
        getAllData();
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
                        <div className={styles.previewBackground}>
                            <div className={`${styles.header} ${styles.headerScrolled}d-flex align-items-center`}>
                                <div className="container d-flex align-items-center">
                                    <div className={`${styles.logo} me-auto`}>
                                        <a href="#" className="scrollto"><img src={`${process.env.REACT_APP_BASE_URL}/images/logo.png`} /></a>
                                    </div>
                                    <nav id="navbar" className={this.state.is_navbar_clicked === true ? "navbar order-last order-lg-0 navbar-mobile" : "navbar order-last order-lg-0"}>
                                        <ul>
                                            <li><a className={"nav-link scrollto active"} href="#">Home</a></li>
                                            <li><a className={"nav-link scrollto"} href="#">About</a></li>
                                            <li><a className={"nav-link scrollto"} href="#">Speakers</a></li>
                                            <li><a className={"nav-link scrollto"} href="#">Gallery</a></li>
                                            <li><a className={"nav-link scrollto"} href="#">Venue</a></li>
                                            <li><a className={"nav-link scrollto"} href="#">Contact</a></li>
                                            <li><a className={"nav-link scrollto"} href="#">Downloads</a></li>
                                            <li className="dropdown"><a href="#"><span>Events</span> <i className="bi bi-chevron-down"></i></a>
                                                <ul>
                                                    <li><a href="#">Research Paper Presentations</a></li>
                                                    <li><a href="#">Workshops</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <i className={this.state.is_navbar_clicked === true ? "bi bi-x mobile-nav-toggle" : "bi bi-list mobile-nav-toggle ms-3"} onClick={() => this.navBarClicked}></i>
                                    </nav>
                                    <div className="ms-3">
                                        <a href="#">
                                            <CustomButton
                                                label="Signup"
                                                classType="secondaryBtn"
                                                buttonType="button"
                                            />
                                        </a>
                                    </div>
                                    <div className="ms-3">
                                        <a href="#">
                                            <CustomButton
                                                label="Signin"
                                                classType="secondaryBtn"
                                                buttonType="button"
                                            />
                                        </a>
                                    </div>

                                </div>
                            </div>

                            <section id="hero" style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/hero-bg.jpg)` }}>
                                <div className="hero-container">
                                    <h1 className="mb-3 pb-0">{this.state.title_first_Word_Set ? this.state.title_first_Word_Set : this.state.title_final_Word_Set}<br /><span>{this.state.title_middle_Word_Set && this.state.title_middle_Word_Set}</span>{this.state.title_first_Word_Set ? this.state.title_final_Word_Set : ''}</h1>
                                    <p className="mb-4 pb-0">{this.state.conference_data_set.conference_sub_topic}</p>
                                    <a href="#">
                                        <CustomButton
                                            label="About The Event"
                                            classType="primaryBtn"
                                            buttonType="button"
                                        />
                                    </a>

                                </div>
                            </section>
                            <section id="about" style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/about-bg.jpg)` }}>
                                <div className="container about-container">
                                    <div className="row">
                                        <div className="col-lg-6" >
                                            <h2>About The Event</h2>
                                            <p>{this.state.conference_data_set.conference_about}</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <h3>Where</h3>
                                            <p>{this.state.conference_data_set.conference_location && this.state.conference_data_set.conference_location.location_name}</p>
                                            {this.state.conference_data_set.conference_type === 'Online' &&
                                                <p>({this.state.conference_data_set.conference_type})</p>
                                            }
                                        </div>
                                        <div className="col-lg-3">
                                            <h3>When</h3>
                                            {
                                                <p>{moment(this.state.conference_data_set.conference_days && this.state.conference_data_set.conference_days.start_date).format('ll')} To<br />{moment(this.state.conference_data_set.conference_days && this.state.conference_data_set.conference_days.end_date).format('ll')}</p>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section id="speakers">
                                <Container >
                                    <div className="section-header">
                                        <h2>KEY NOTE SPEAKERS</h2>
                                        <p>Here are some of key noted speakers</p>
                                    </div>
                                    <Row>
                                        {this.state.conference_data_set.key_note_speakers && (this.state.conference_data_set.key_note_speakers).map((value, idx) => (
                                            <Col md={6} lg={4} key={idx}>
                                                <div className="speaker">
                                                    <Image src={value.speaker_image ? value.speaker_image : `${process.env.REACT_APP_BASE_URL}/images/dummy-avatar-speaker.png`} alt="Speaker" fluid />
                                                    <div className="details">
                                                        <h3><span>{`${value.speaker_title} ${value.speaker_first_name} ${value.speaker_last_name}`}</span></h3>
                                                        <p>{value.speaker_affiliation}</p>
                                                        <div className="social">
                                                            <a href={value.speaker_social_media.twitter_link}><i className="bi bi-twitter"></i></a>
                                                            <a href={value.speaker_social_media.facebook_link}><i className="bi bi-facebook"></i></a>
                                                            <a href={value.speaker_social_media.linkedin_link}><i className="bi bi-linkedin"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                        }
                                    </Row>
                                </Container>
                            </section>
                            <section id="gallery">
                                <Container>
                                    <div className="section-header">
                                        <h2>Gallery</h2>
                                        <p>Check our gallery from the recent events</p>
                                    </div>
                                </Container>
                                <div className="gallery-slider swiper-container">
                                    <div className="swiper-wrapper align-items-center">
                                        {this.state.conference_data_set.conference_images && (this.state.conference_data_set.conference_images).map((value, idx) => (
                                            <div className="swiper-slide" key={idx}><a to={value} className="gallery-lightbox"><Image src={value} fluid alt="" /></a></div>
                                        ))
                                        }
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </section>
                            <section id="fees" className="section-with-bg">
                                <Container>
                                    <div className="section-header">
                                        <h2>Registration Fees</h2>
                                        <p>Check registration fees of current event</p>
                                    </div>

                                    <Row>
                                        <Col lg={4}>
                                            <Card className="mb-5 mb-lg-0">
                                                <Card.Body className="card-body-fees">
                                                    <h5 className="card-title text-muted text-uppercase text-center">Attendee Registration Fee</h5>
                                                    <h6 className="card-price text-center">{this.state.conference_data_set.registration_fees.attendee_registration_fee === 0 ? 'Free' : 'RS. ' + (this.state.conference_data_set.registration_fees.attendee_registration_fee).toFixed(2)}</h6>
                                                    <hr />
                                                    <div className="text-center">
                                                        <CustomButton
                                                            classType="feeCardBtn"
                                                            buttonType="button"
                                                            label="Register Now"
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={4} data-aos="fade-up" data-aos-delay="200">
                                            <Card className="mb-5 mb-lg-0">
                                                <Card.Body>
                                                    <h5 className="card-title text-muted text-uppercase text-center">Researcher Registration Fee</h5>
                                                    <h6 className="card-price text-center">{this.state.conference_data_set.registration_fees.researcher_registration_fee === 0 ? 'Free' : 'RS. ' + (this.state.conference_data_set.registration_fees.researcher_registration_fee).toFixed(2)}</h6>
                                                    <hr />
                                                    <div className="text-center">
                                                        <CustomButton
                                                            classType="feeCardBtn"
                                                            buttonType="button"
                                                            label="Register Now"
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={4} data-aos="fade-up" data-aos-delay="300">
                                            <Card className="mb-5 mb-lg-0">
                                                <Card.Body>
                                                    <h5 className="card-title text-muted text-uppercase text-center">Workshop Conductor Registration Fee</h5>
                                                    <h6 className="card-price text-center">{this.state.conference_data_set.registration_fees.workshop_conductor_registration_fee === 0 ? 'Free' : 'RS. ' + (this.state.conference_data_set.registration_fees.workshop_conductor_registration_fee).toFixed(2)}</h6>
                                                    <hr />
                                                    <div className="text-center">
                                                        <CustomButton
                                                            classType="feeCardBtn"
                                                            buttonType="button"
                                                            label="Register Now"
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </section>
                            <section id="venue">
                                <div className="container-fluid" data-aos="fade-up">
                                    <div className="section-header">
                                        <h2>Event Venue</h2>
                                        <p>Event venue location info and gallery</p>
                                    </div>
                                    <div className="row g-0">
                                        <div className="col-lg-6 venue-map">
                                            <iframe src={this.state.conference_data_set.conference_location.location_google_map_link && this.state.conference_data_set.conference_location.location_google_map_link} frameBorder='0' style={{border:0}} allowFullScreen></iframe>
                                        </div>

                                        <div className="col-lg-6 venue-info" style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/venue-info-bg.jpg)` }}>
                                            <div className="row justify-content-center">
                                                <div className="col-11 col-lg-8 position-relative">
                                                    <h3>{this.state.conference_data_set.conference_location.location_name}</h3>
                                                    <p>{this.state.conference_data_set.conference_location.location_desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {(this.state.conference_data_set.conference_location.location_images).length > 0 &&
                                    <div className="container-fluid venue-gallery-container">
                                        <Row className="g-0">
                                            {(this.state.conference_data_set.conference_location.location_images).map((value, idx) => (
                                                <Col md={4} lg={3} key={idx}>
                                                    <div className="venue-gallery">
                                                        <a href={value} className="glightbox" data-gall="venue-gallery">
                                                            <Image src={value} alt="" fluid />
                                                        </a>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>

                                }
                            </section>
                            <section id="contact" className="section-bg">
                                <Container>
                                    <div className="section-header">
                                        <h2>Contact Us</h2>
                                        <p>Have a question in mind? Contact us.</p>
                                    </div>
                                    <Row className="contact-info">
                                        <Col md={4}>
                                            <div className="contact-address">
                                                <i className="bi bi-geo-alt"></i>
                                                <h3>Address</h3>
                                                <address>{this.state.conference_data_set.contact_details.address}</address>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="contact-phone">
                                                <i className="bi bi-geo-alt"></i>
                                                <h3>Phone Number</h3>
                                                <p><a>{this.state.conference_data_set.contact_details.phone_number}</a></p>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="contact-email">
                                                <i className="bi bi-geo-alt"></i>
                                                <h3>Email</h3>
                                                <p><a>{this.state.conference_data_set.contact_details.email}</a></p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <ContactForm />
                                </Container>
                            </section>
                            <footer id="footer">
                                <div className="footer-top">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6 col-lg-3 footer-info">
                                                <img src={`${process.env.REACT_APP_BASE_URL}/images/logo.png`} alt="TheEvenet" />
                                                <p>Eventsy is an online conference management tool specially build for manage conferences.We will help you to manage your conference under one software.</p>
                                            </div>
                                            <div className="col-md-6 col-lg-3 offset-lg-3 footer-links">
                                                <h4>Useful Links</h4>
                                                <ul>
                                                    <li><i className="bi bi-chevron-right"></i> <a href="/#hero">Home</a></li>
                                                    <li><i className="bi bi-chevron-right"></i> <a href="/#about">About</a></li>
                                                    <li><i className="bi bi-chevron-right"></i> <a href="/#speakers">Speakers</a></li>
                                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
                                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6 col-lg-3 footer-contact">
                                                <h4>Contact Us</h4>
                                                <p>
                                                    A108 New Kandy Road, <br />
                                                    Malabe<br />
                                                    Sri Lanka <br />
                                                    <strong>Phone:</strong> +94 XXXXXXXXXX<br />
                                                    <strong>Email:</strong> contact.eventsy@gmail.com<br />
                                                </p>
                                                <div className="social-links">
                                                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                                    <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="copyright">
                                        &copy; Copyright <strong>Eventsy</strong>. All Rights Reserved
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </Container>
                }
            </div>

        )
    }
}

export default ConferencePreview;
