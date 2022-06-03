import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// DASHBOARDS
import Account from './Account'
// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../LayoutUser/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const RoomPage = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/account`} component={Account} />
                    <Route path={`${match.url}/homepage`} component={Homepage} />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default RoomPage;

