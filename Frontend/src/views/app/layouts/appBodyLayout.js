import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { getAccountRole } from '../../../services/util/auth';

import routes from './routes';

function AppBodyLayout(props) {
    return (
        <div className="mt-5">
            <Switch>
                {routes.map((route, id) => {
                    return route.component && (
                        <Route
                            key={id}
                            path={route.path}
                            exact={route.exact}
                            render={props => <route.component {...props} />}
                        />
                    )
                })}
                <Redirect from="/" to={parseInt(getAccountRole()) === 5 ? '/app/admin-dashboard' : parseInt(getAccountRole()) === 4 ? '/app/editor-create-conference' : parseInt(getAccountRole()) === 3 ? '/app/reviewer-view-research-papers' : ''} />
            </Switch>
        </div>
    )
}

export default AppBodyLayout;
