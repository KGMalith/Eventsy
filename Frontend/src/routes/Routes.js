import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes.js';
import PublicRoutes from './PublicRoutes.js';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                    <Switch>
                        {/* Public Routes */}
                        {/* <PublicRoutes exact component={Home} path={`/`} /> */}

                        {/* Private Routes */}
                        {/* <PrivateRoutes component={AppLayout} path={`/app`} /> */}

                        {/* 404 error page */}
                        {/* <Route path="*" component={} /> */}
                    </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;

