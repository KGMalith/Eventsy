import React, { Component } from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './gallery.scss';

export class Gallery extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <section id="gallery">
                    <Container data-aos="fade-up">
                        <div className="section-header">
                            <h2>Gallery</h2>
                            <p>Check our gallery from the recent events</p>
                        </div>
                    </Container>
                    <div className="gallery-slider swiper-container">
                        <div className="swiper-wrapper align-items-center">
                            {(this.props.bodyData).map((value,idx)=>(
                                <div className="swiper-slide" key={idx}><Link to={value} className="gallery-lightbox"><Image src={value} fluid alt="" /></Link></div>
                            )) 
                            }
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Gallery
