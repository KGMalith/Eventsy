import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes.js';
import PublicRoutes from './PublicRoutes.js';
import Home from '../views/common/home-page';
import Download from '../views/common/download-page';
import Signin from '../views/common/signin';
import Signup from '../views/common/signup';
import ForgotPassword from '../views/common/forgot-password';
import Workshops from '../views/common/events/workshops';
import ResearchPaperPresentations from '../views/common/events/researchPapers';
import AppLayout from '../views/app/layouts/appLayout.js';
import VerifyEmail from '../views/common/verify-email';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    {/* Public Routes */}
                    <PublicRoutes exact component={Home} path={`/`} />
                    <PublicRoutes exact path="/downloads" component={Download} />
                    <PublicRoutes exact path="/signin" component={Signin} />
                    <PublicRoutes exact path="/signup" component={Signup} />
                    <PublicRoutes exact path="/forgotpassword" component={ForgotPassword} />
                    <PublicRoutes exact path="/workshops" component={Workshops} />
                    <PublicRoutes exact path="/research-presentations" component={ResearchPaperPresentations} />
                    <PublicRoutes component={VerifyEmail} path={`/email-verify`} /> 
                    {/*<PublicRoutes component={} path={`/join-user/:id`} exact /> */}

                    {/* Private Routes */}
                    <PrivateRoutes component={AppLayout} path={`/app`} />
                    

                    {/* 404 error page */}
                    {/* <Route path="*" component={} /> */}
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;

