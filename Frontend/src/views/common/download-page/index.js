import React, { Component } from 'react';
import './download.scss';
import { CustomButton } from '../../../components/buttons';
import Footer from '../commonViews/footer';
import Header from '../commonViews/header';

export class Download extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        // window.addEventListener('load', () => {
        //     AOS.init({
        //         duration: 1000,
        //         easing: 'ease-in-out',
        //         once: true,
        //         mirror: false
        //     });
        // });
    }

    render() {
        return (
            <div>
                <Header />
                <section id="download" className="section-with-bg">
                    <div className="container" data-aos="fade-up">
                        <div className="section-header">
                            <h2>Downloads</h2>
                            <p>Here is download page</p>
                        </div>
                    </div>
                    <ul className="nav nav-tabs" role="tablist" data-aos="fade-up" data-aos-delay="100">
                        <li className="nav-item me-3">
                            <a className="nav-link active" href="#research-paper" role="tab" data-bs-toggle="tab">Presentations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#workshop" role="tab" data-bs-toggle="tab">Workshops</a>
                        </li>
                    </ul>
                    <div className="row tab-content justify-content-center" data-aos="fade-up" data-aos-delay="200">
                        <div role="tabpanel" className=" col-lg-9 tab-pane fade show active" id="research-paper">
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <div className="card downloadEventCard">
                                        <div className="card-body">
                                            <div className="downloadeventTitle">
                                                <h3 className="downloadtitle">Barcelona Food Truck Festival 2018-2019</h3>
                                            </div>
                                            <div>
                                                <CustomButton
                                                    classType="tertiaryBtn"
                                                    buttonType="button"
                                                    label="Download Research Paper"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" className="col-lg-9 tab-pane fade" id="workshop">
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <div className="card downloadEventCard">
                                        <div className="card-body">
                                            <div className="downloadeventTitle">
                                                <h3 className="downloadtitle">Barcelona Food Truck Festival 2018-2019</h3>
                                            </div>
                                            <div>
                                                <CustomButton
                                                    classType="tertiaryBtn"
                                                    buttonType="button"
                                                    label="Download Workshop Flyer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Download;
