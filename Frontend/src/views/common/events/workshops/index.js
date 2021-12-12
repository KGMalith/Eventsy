import React, { Component } from 'react';
import Footer from '../../commonViews/footer';
import Header from '../../commonViews/header';
import styles from './workshops.module.scss';

export class Workshops extends Component {

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
                <section id="workshops" className={`section-with-bg ${styles.workshops}`}>
                    <div className="container" data-aos="fade-up">
                        <div className="section-header">
                            <h2>Workshops</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
                                <div className={`card ${styles.workshopCard}`}>
                                    <div className="card-body">
                                        <div className={styles.eventTitle}>
                                            <h3 className={styles.title}>Barcelona Food Truck Festival 2018-2019</h3>
                                        </div>
                                        <p className={styles.eventDesc}>
                                            Lorem ipsum dollor site amet the best consectuer diam nerd adipiscing elites sed diam nonummy nibh the ebest uismod tincidunt ut laoreet dolore magna aliquam erat volutpat guild insignia the consectuer adipiscing elit.
                                        </p>
                                        <div className="row mt-4">
                                            <div className="col">
                                                <div>
                                                    <span className={styles.IconBox}>
                                                        <i class="bi bi-mic-fill"></i>
                                                    </span>
                                                    <div className={styles.eventDetailsBox}>
                                                        <span className={styles.eventLabel}>Speakers</span>
                                                        <p className={styles.eventValue}>JENNY JUIS</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div>
                                                    <span className={styles.IconBox}>
                                                        <i class="bi bi-clock"></i>
                                                    </span>
                                                    <div className={styles.eventDetailsBox}>
                                                        <span className={styles.eventLabel}>Event Time</span>
                                                        <p className={styles.eventValue}>Sat 20:00pm</p>
                                                    </div>
                                                </div>
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

export default Workshops;
