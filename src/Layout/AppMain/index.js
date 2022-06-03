import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from 'react';
import AuthorizeRoute from "../../api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from '../../api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from '../../api-authorization/ApiAuthorizationConstants';

import {
    ToastContainer,
} from 'react-toastify';

const Dashboards = lazy(() => import('../../Admin/Dashboards'));
const RoomPage = lazy(() => import('../../User/Room'));
const RoomDetail = lazy(() => import('../../User/RoomDetail'));
const Manage = lazy(() => import('../../Admin/Manage'));
const HomePage = lazy(() => import('../../HomePage'));
var account = JSON.parse(sessionStorage.getItem("token"));
const setRedirectMain = () => {
    if (account != null) {
        if (account.role == "admin") {
            return "/dashboards";
        } else if (account.role == "guest") {
            return "/room";
        }
    }
    return "/homepage";
}
const AppMain = () => {
    return (
        <Fragment>
            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <Route path="/homepage" component={HomePage} />
            </Suspense>

            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <AuthorizeRoute path="/dashboards" component={Dashboards} />
            </Suspense>

            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <AuthorizeRoute path="/manage" component={Manage} />
            </Suspense>

            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <AuthorizeRoute path="/room" component={RoomPage} />
            </Suspense>
            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <AuthorizeRoute path="/room-details" component={RoomDetail} />
            </Suspense>
            <Route exact path="/" render={() => (
                <Redirect to={setRedirectMain()} />
            )} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <ToastContainer />
        </Fragment>
    );
};

export default AppMain;