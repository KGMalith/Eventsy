import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import { getAccountRole } from '../../../../services/util/auth';

export class SideBar extends Component {
    constructor(props) {
        super(props)
        this.updateDropDown = this.updateDropDown.bind(this);
        this.state = {
            isNavbarDropUserActive: false,
            isNavbarAdminDropConferenceActive: false,
            isNavbarAdminDropPresentationActive: false,
            isNavbarAdminDropWorkshopActive: false,
            isNavbarDropConferenceActive: false,
            isNavbarDropSpeakerActive: false,
            isNavbarDropWorkshopActive: false,
            isNavbarDropPresentationActive: false
        }
    }

    updateDropDown(value) {
        if (value === 1) {
            this.setState({
                isNavbarDropUserActive: !(this.state.isNavbarDropUserActive),
            })
        }

        if (value === 2) {
            this.setState({
                isNavbarAdminDropConferenceActive: !(this.state.isNavbarAdminDropConferenceActive),
            })
        }

        if (value === 3) {
            this.setState({
                isNavbarAdminDropPresentationActive: !(this.state.isNavbarAdminDropPresentationActive),
            })
        }

        if (value === 4) {
            this.setState({
                isNavbarAdminDropWorkshopActive: !(this.state.isNavbarAdminDropWorkshopActive),
            })
        }

        if (value === 5) {
            this.setState({
                isNavbarDropConferenceActive: !(this.state.isNavbarDropConferenceActive),
            })
        }

        if (value === 6) {
            this.setState({
                isNavbarDropSpeakerActive: !(this.state.isNavbarDropSpeakerActive),
            })
        }

        if (value === 7) {
            this.setState({
                isNavbarDropWorkshopActive: !(this.state.isNavbarDropWorkshopActive),
            })
        }

        if (value === 8) {
            this.setState({
                isNavbarDropPresentationActive: !(this.state.isNavbarDropPresentationActive),
            })
        }


    }

    render() {
        return (
            <div className={this.props.isSidebarOpen ? 'sidebar' : 'sidebar-hide'}>
                <div className="sidebar-header">
                    <span className="brand">
                        <Image src={`${process.env.REACT_APP_BASE_URL}/images/logo.png`} fluid />
                    </span>
                    <i className="bi bi-list ms-md-3 d-lg-none" onClick={this.props.sideBarAction}></i>
                </div>
                <ul className="main-ul">
                    {/* admin routes start*/}
                    {parseInt(getAccountRole()) === 5 &&
                        <div>
                            <li>
                                <NavLink to="/app/admin-dashboard" activeClassName="active-nav">
                                    <div className="sidebar-menu">
                                        <span>
                                            <i className="bi bi-speedometer2"></i>
                                        </span>
                                        <span>
                                            Dashboard
                                        </span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="sidebar-nav-title">Users</li>
                            <li className={this.state.isNavbarDropUserActive === true ? "sidebar-nav-dropdown c-show" : "sidebar-nav-dropdown"}>
                                <a className={this.state.isNavbarDropUserActive === true ? "sidebar-menu-link link-active " : "sidebar-menu-link"} onClick={() => this.updateDropDown(1)}>
                                    <div className="sidebar-menu-arrow">
                                        <span>
                                            <i className="bi bi-people"></i>
                                        </span>
                                        <span>
                                            Users
                                        </span>
                                    </div>
                                </a>
                                <ul className="sideNavBarDopdown">
                                    <NavLink to="/app/admin-add-users" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Add Users
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/admin-view-users" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                View Users
                                            </span>
                                        </div>
                                    </NavLink>
                                </ul>
                            </li>

                            <li className="sidebar-nav-title">Conferences</li>
                            <li className={this.state.isNavbarAdminDropConferenceActive === true ? "sidebar-nav-dropdown c-show" : "sidebar-nav-dropdown"}>
                                <a className={this.state.isNavbarAdminDropConferenceActive === true ? "sidebar-menu-link link-active " : "sidebar-menu-link"} onClick={() => this.updateDropDown(2)}>
                                    <div className="sidebar-menu-arrow">
                                        <span>
                                            <i className="bi bi-calendar"></i>
                                        </span>
                                        <span>
                                            Conference
                                        </span>
                                    </div>
                                </a>
                                <ul className="sideNavBarDopdown">
                                    <NavLink to="/app/admin-view-conferences" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Conferences
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/admin-view-requested-conferences" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Requested Conference
                                            </span>
                                        </div>
                                    </NavLink>
                                </ul>
                            </li>

                            <li className="sidebar-nav-title">Presentations</li>
                            <li className={this.state.isNavbarAdminDropPresentationActive === true ? "sidebar-nav-dropdown c-show" : "sidebar-nav-dropdown"}>
                                <a className={this.state.isNavbarAdminDropPresentationActive === true ? "sidebar-menu-link link-active " : "sidebar-menu-link"} onClick={() => this.updateDropDown(3)}>
                                    <div className="sidebar-menu-arrow">
                                        <span>
                                            <i className="bi bi-easel"></i>
                                        </span>
                                        <span>
                                            Presentation
                                        </span>
                                    </div>
                                </a>
                                <ul className="sideNavBarDopdown">
                                    <NavLink to="/app/admin-view-presentations" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Presentations
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/admin-view-requested-presentations" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Requested Presentations
                                            </span>
                                        </div>
                                    </NavLink>
                                </ul>
                            </li>

                            <li className="sidebar-nav-title">Speakers</li>
                            <li>
                                <NavLink to="/app/admin-view-requested-speakers" activeClassName="active-nav">
                                    <div className="sidebar-menu">
                                        <span>
                                            <i className="bi bi-person"></i>
                                        </span>
                                        <span>
                                            Requested Speakers
                                        </span>

                                    </div>
                                </NavLink>
                            </li>

                            <li className="sidebar-nav-title">Workshops</li>
                            <li className={this.state.isNavbarAdminDropWorkshopActive === true ? "sidebar-nav-dropdown c-show" : "sidebar-nav-dropdown"}>
                                <a className={this.state.isNavbarAdminDropWorkshopActive === true ? "sidebar-menu-link link-active " : "sidebar-menu-link"} onClick={() => this.updateDropDown(4)}>
                                    <div className="sidebar-menu-arrow">
                                        <span>
                                            <i className="bi bi-shop-window"></i>
                                        </span>
                                        <span>
                                            Workshop
                                        </span>
                                    </div>
                                </a>
                                <ul className="sideNavBarDopdown">
                                    <NavLink to="/app/admin-view-workshops" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Workshops
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/admin-view-requested-workshops" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Requested Workshops
                                            </span>
                                        </div>
                                    </NavLink>
                                </ul>
                            </li>
                        </div>
                    }
                    {/* admin routes end*/}


                    {/* editor routes start*/}
                    {parseInt(getAccountRole()) === 4 &&
                        <div>
                            <li className="sidebar-nav-title">Conferences</li>
                            <li className={this.state.isNavbarDropConferenceActive === true ? "sidebar-nav-dropdown c-show" : "sidebar-nav-dropdown"}>
                                <a className={this.state.isNavbarDropConferenceActive === true ? "sidebar-menu-link link-active " : "sidebar-menu-link"} onClick={() => this.updateDropDown(5)}>
                                    <div className="sidebar-menu-arrow">
                                        <span>
                                            <i className="bi bi-calendar"></i>
                                        </span>
                                        <span>
                                            Conference
                                        </span>
                                    </div>
                                </a>
                                <ul className="sideNavBarDopdown">
                                    <NavLink to="/app/editor-create-conference" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Create Conference
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-conferences" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Conferences
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-pending-conferences" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Pending Conferences
                                            </span>
                                        </div>
                                    </NavLink>
                                </ul>
                            </li>

                            <li className="sidebar-nav-title">Speakers</li>
                            <li className={this.state.isNavbarDropSpeakerActive === true ? "sidebar-nav-dropdown c-show" : "sidebar-nav-dropdown"}>
                                <a className={this.state.isNavbarDropSpeakerActive === true ? "sidebar-menu-link link-active " : "sidebar-menu-link"} onClick={() => this.updateDropDown(6)}>
                                    <div className="sidebar-menu-arrow">
                                        <span>
                                            <i className="bi bi-person"></i>
                                        </span>
                                        <span>
                                            Speaker
                                        </span>
                                    </div>
                                </a>
                                <ul className="sideNavBarDopdown">
                                    <NavLink to="/app/editor-create-speaker" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Create Speaker
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-speakers" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Speakers
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-pending-speakers" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Pending Speakers
                                            </span>
                                        </div>
                                    </NavLink>
                                </ul>
                            </li>

                            <li className="sidebar-nav-title">Workshops</li>
                            <li className={this.state.isNavbarDropWorkshopActive === true ? "sidebar-nav-dropdown c-show" : "sidebar-nav-dropdown"}>
                                <a className={this.state.isNavbarDropWorkshopActive === true ? "sidebar-menu-link link-active " : "sidebar-menu-link"} onClick={() => this.updateDropDown(7)}>
                                    <div className="sidebar-menu-arrow">
                                        <span>
                                            <i className="bi bi-shop-window"></i>
                                        </span>
                                        <span>
                                            Workshop
                                        </span>
                                    </div>
                                </a>
                                <ul className="sideNavBarDopdown">
                                    <NavLink to="/app/editor-view-requested-workshops" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Requested Workshops
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-create-workshop" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Create Workshop
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-view-workshops" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Workshops
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-view-pending-workshops" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Pending Workshops
                                            </span>
                                        </div>
                                    </NavLink>
                                </ul>
                            </li>

                            <li className="sidebar-nav-title">Presentations</li>
                            <li className={this.state.isNavbarDropPresentationActive === true ? "sidebar-nav-dropdown c-show" : "sidebar-nav-dropdown"}>
                                <a className={this.state.isNavbarDropPresentationActive === true ? "sidebar-menu-link link-active " : "sidebar-menu-link"} onClick={() => this.updateDropDown(8)}>
                                    <div className="sidebar-menu-arrow">
                                        <span>
                                            <i className="bi bi-easel"></i>
                                        </span>
                                        <span>
                                            Presentation
                                        </span>
                                    </div>
                                </a>
                                <ul className="sideNavBarDopdown">
                                    <NavLink to="/app/editor-create-presentation" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Create Presentation
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-view-presentations" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Presentations
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/app/editor-view-pending-presentations" activeClassName="active-nav">
                                        <div className="sidebar-menu-sub">
                                            <span>
                                                Pending Presentations
                                            </span>
                                        </div>
                                    </NavLink>
                                </ul>
                            </li>
                        </div>
                    }
                    {/* editor routes end*/}

                    {/* reviewer routes start*/}
                    {parseInt(getAccountRole()) === 3 &&
                        <div>
                            <li className="sidebar-nav-title">Research Papers</li>
                            <li>
                                <NavLink to="/app/reviewer-view-research-papers" activeClassName="active-nav">
                                    <div className="sidebar-menu">
                                        <span>
                                            <i className="bi bi-file-pdf"></i>
                                        </span>
                                        <span>
                                            Research Papers
                                        </span>

                                    </div>
                                </NavLink>
                            </li>

                            <li className="sidebar-nav-title">Workshop Proposals</li>
                            <li>
                                <NavLink to="/app/reviewer-view-workshop-proposals" activeClassName="active-nav">
                                    <div className="sidebar-menu">
                                        <span>
                                            <i className="bi bi-file-pdf"></i>
                                        </span>
                                        <span>
                                            Workshop Proposals
                                        </span>

                                    </div>
                                </NavLink>
                            </li>
                        </div>
                    }
                    {/* reviewer routes end*/}

                </ul>
            </div>
        )
    }
}

export default SideBar;
