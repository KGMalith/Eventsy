import React, { Component } from 'react';
import './header.scss';
import {CustomButton} from '../../../../components/buttons';

export class Header extends Component {
    constructor(props) {
        super(props)
        this.navBarClicked = this.navBarClicked.bind(this);
        this.state = {
            pathActive:'',
            is_navbar_clicked:false
        }
    }


    componentDidMount(){
        let value = window.location.href;
        let pathValue = value.split(process.env.REACT_APP_BASE_URL)[1];
        this.setState({
            pathActive: pathValue === '/' ? 0 : pathValue === '/#about' ? 1 : pathValue === '/#speakers' ? 2 : pathValue ==='/#gallery' ? 3 : pathValue === '/#venue' ? 4 : pathValue === '/#contact' ? 5 : pathValue === '/downloads'?6:0
        })
    }

    componentDidUpdate(){
        let value = window.location.href;
        let pathValue = value.split(process.env.REACT_APP_BASE_URL)[1];
        let stateValue = pathValue === '/' ? 0 : pathValue === '/#about' ? 1 : pathValue === '/#speakers' ? 2 : pathValue === '/#gallery' ? 3 : pathValue === '/#venue' ? 4 : pathValue === '/#contact' ? 5 : pathValue === '/downloads' ? 6 : 0;

        if (this.state.pathActive !== stateValue) {
            this.setState({
                pathActive: stateValue
            });
        }  
    }

    navBarClicked(){
        this.setState({ is_navbar_clicked:!(this.state.is_navbar_clicked)})
    }
    
    render() {
        return (
            <div>
                <header id="header" className="d-flex align-items-center header-scrolled">
                    <div className="container d-flex align-items-center">
                        <div id="logo" className="me-auto">
                            <a href="/" className="scrollto"><img src={`${process.env.REACT_APP_BASE_URL}/images/logo.png`}/></a>
                        </div>
                        <nav id="navbar" className={this.state.is_navbar_clicked === true ? "navbar order-last order-lg-0 navbar-mobile" : "navbar order-last order-lg-0"}>
                            <ul>
                                <li><a className={this.state.pathActive === 0 ? "nav-link scrollto active" :"nav-link scrollto"} href="/#hero">Home</a></li>
                                <li><a className={this.state.pathActive === 1 ? "nav-link scrollto active" : "nav-link scrollto"} href="/#about">About</a></li>
                                <li><a className={this.state.pathActive === 2 ? "nav-link scrollto active" :"nav-link scrollto"} href="/#speakers">Speakers</a></li>
                                <li><a className={this.state.pathActive === 3 ? "nav-link scrollto active" :"nav-link scrollto"} href="/#gallery">Gallery</a></li>
                                <li><a className={this.state.pathActive === 4 ? "nav-link scrollto active" :"nav-link scrollto"} href="/#venue">Venue</a></li>
                                <li><a className={this.state.pathActive === 5 ? "nav-link scrollto active" :"nav-link scrollto"} href="/#contact">Contact</a></li>
                                <li><a className={this.state.pathActive === 6 ? "nav-link scrollto active" : "nav-link scrollto"} href="/downloads">Downloads</a></li>
                                <li className="dropdown"><a href="#"><span>Events</span> <i className="bi bi-chevron-down"></i></a>
                                    <ul>
                                        <li><a href="/research-presentations">Research Paper Presentations</a></li>
                                        <li><a href="/workshops">Workshops</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <i className={this.state.is_navbar_clicked === true ? "bi bi-x mobile-nav-toggle" :"bi bi-list mobile-nav-toggle ms-3"} onClick={this.navBarClicked}></i>
                        </nav>
                        <div className="ms-3">
                            <a href="/signup">
                                <CustomButton
                                    label="Signup"
                                    classType="secondaryBtn"
                                    buttonType="button"
                                />
                            </a>
                        </div>
                        <div className="ms-3">
                            <a href="/signin">
                                <CustomButton
                                    label="Signin"
                                    classType="secondaryBtn"
                                    buttonType="button"
                                />
                            </a>
                        </div>
                        
                    </div>
                </header>
            </div>
        )
    }
}

export default Header
