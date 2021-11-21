import React, { Component } from 'react';
import './home-page.scss';
import HomePageBody from './home-page-body';
import Header from '../commonViews/header';
import Footer from '../commonViews/footer';
// import { loadmainPage } from '../../../util/common';
import { Loader } from '../../../components/loader/loader';
import AOS from 'aos';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.loadPage = this.loadPage.bind(this);
        this.state = {
            pageData: null
        }
    }

    async loadPage() {
        // let respond = await loadmainPage();
        // if (respond.success === true) {
        //     this.setState({ pageData: respond.data });
        // }
    }

    componentDidMount() {
        window.addEventListener('load', () => {
            this.loadPage();
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
            // GLightbox({ selector: '.gallery-lightbox' });
            // new Swiper('.gallery-slider', {
            //     speed: 400,
            //     loop: true,
            //     centeredSlides: true,
            //     autoplay: {
            //         delay: 5000,
            //         disableOnInteraction: false
            //     },
            //     slidesPerView: 'auto',
            //     pagination: {
            //         el: '.swiper-pagination',
            //         type: 'bullets',
            //         clickable: true
            //     },
            //     breakpoints: {
            //         320: {
            //             slidesPerView: 1,
            //             spaceBetween: 20
            //         },
            //         575: {
            //             slidesPerView: 2,
            //             spaceBetween: 20
            //         },
            //         768: {
            //             slidesPerView: 3,
            //             spaceBetween: 20
            //         },
            //         992: {
            //             slidesPerView: 5,
            //             spaceBetween: 20
            //         }
            //     }
            // });
        });

    }

    render() {
        return (
            <div>
                <div>
                    <Header />
                    <HomePageBody bodyData={this.state.pageData && this.state.pageData} />
                    <Footer />
                </div>
            </div>
        )
    }
}





