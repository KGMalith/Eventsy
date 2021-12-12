import React, { Component } from 'react';
import { Image, Dropdown, Card, Badge } from 'react-bootstrap';
import {logout} from '../../../../services/util/auth';
import './header.scss';

export class HeaderTopBar extends Component {
    constructor(props) {
        super(props)
        this.SystemLogout = this.SystemLogout.bind(this);
    }

    SystemLogout(){
        logout();
        this.props.history.push('/signin');
    }
    
    render() {
        return (
            <header className="header-bar">
                <button className="header-toggler ms-3 d-md-down-none me-auto" onClick={this.props.sideBarAction}>
                    <i className="bi bi-list"></i>
                </button>
                <ul className="header-nav px-3">
                    <li className="mx-2">
                        <Dropdown
                            alignRight={true}
                        >
                            <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn">
                                <i className="bi bi-bell"></i>
                                <Badge className="count-badge color-danger">5</Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="notification-dropdown">
                                <Card>
                                    <Card.Header className="card-header">
                                        <Card.Title className="card-header-title">You have 5 notifications</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="header-card-body">
                                        <Dropdown.Item href="#/action-1">
                                            <i className="bi bi-person-plus me-3"></i>
                                            <span className="notification-message">New user registered</span>
                                        </Dropdown.Item>
                                    </Card.Body>
                                </Card>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li className="mx-2">
                        <Dropdown
                            alignRight={true}
                        >
                            <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn">
                                <i className="bi bi-envelope"></i>
                                <Badge className="count-badge color-primary">4</Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="message-dropdown">
                                <Card>
                                    <Card.Header className="card-header">
                                        <Card.Title className="card-header-title">You have 4 messages</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="header-card-body">
                                        <Dropdown.Item href="#/action-1">
                                            <div className="pt-3 me-3 float-left">
                                                <div className="avatar">
                                                    <Image src={`${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} className="avatar-image" />
                                                </div>
                                            </div>
                                            <div>
                                                <small className="message-sender-name">John Doe</small>
                                                <div>
                                                    <span className="message-subject">Important message</span>
                                                </div>
                                                <div>
                                                    <span className="brief-message">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm t...
                                                    </span>
                                                </div>
                                            </div>
                                            
                                        </Dropdown.Item>
                                        <Dropdown.Divider className="dropdown-divider" />
                                        <Dropdown.Item href="#/action-1" className="action-label">View all messages</Dropdown.Item>
                                    </Card.Body>
                                </Card>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li className="mx-2">
                        <Dropdown
                            alignRight={true}
                        >
                            <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn">
                                <div className="avatar">
                                    <Image src={`${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} className="avatar-image" />
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="user-dropdown">
                                <Card>
                                    <Card.Header className="header-card-header">
                                        <Card.Title className="card-header-title">Account</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="header-card-body">
                                        <Dropdown.Item href="#/action-1">
                                            <i className="bi bi-person me-3"></i>
                                            <span className="notification-message">Profile</span>
                                        </Dropdown.Item>
                                        <Dropdown.Divider className="dropdown-divider" />
                                        <Dropdown.Item onClick={this.SystemLogout}>
                                            <i className="bi bi-box-arrow-in-left me-3"></i>
                                            <span className="notification-message">Logout</span>
                                        </Dropdown.Item>
                                    </Card.Body>
                                </Card>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </header>
        )
    }
}

export default HeaderTopBar;
