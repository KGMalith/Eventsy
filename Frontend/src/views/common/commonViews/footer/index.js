import React, { Component } from 'react';
import './footer.scss'

export class Footer extends Component {

    render() {
        return (
            <div>
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
        )
    }
}

export default Footer;
