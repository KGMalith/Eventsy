import React,{useState} from 'react';
import HeaderTopBar from '../commonViews/header';
import SideBar from '../commonViews/sidebar';
import AppBodyLayout from './appBodyLayout';
import {useHistory} from 'react-router-dom';
import './appLayout.scss';

function AppLayout() {
    const history = useHistory();
    let [isSidebarOpen,setSidebarOpen] = useState(true);

    const sideBarAction = () =>{
        setSidebarOpen(!isSidebarOpen);
    }

    return (
        <div>
            <SideBar isSidebarOpen={isSidebarOpen} sideBarAction={sideBarAction}/>
            <div className={isSidebarOpen ? "header-wrapper" : "header-wrapper-expand"}>
                <HeaderTopBar sideBarAction={sideBarAction} history={history}/>
                <div className="app-body">
                    <AppBodyLayout history={history}/>
                </div>
            </div>
            
        </div>
    )
}

export default AppLayout;
