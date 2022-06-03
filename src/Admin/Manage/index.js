import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// BUTTONS

// Standard

import Rooms from './Rooms';

// DROPDOWNS
import Room from './Room/Information';
import AddGuest from './Room/Add/Guest';
import EditRoom from './Room/EditRoom';
import AddBill from './Room/Add/Bill';

import Guests from './Guests';
import EditGuest from './EditGuestProfile';

// BADGES & LABELS

import Bookings from './Bookings';

import Repairs from './Repairs';

import Bills from './Bills';
// ICONS

// Layout
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';


const Elements = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Rooms */}

                    <Route path={`${match.url}/rooms`} component={Rooms} />

                    <Route path={`${match.url}/guests`} component={Guests} />

                    <Route path={`${match.url}/room/details`} component={Room} />

                    <Route path={`${match.url}/room/edit`} component={EditRoom} />

                    <Route path={`${match.url}/room/add/bill`} component={AddBill} />

                    <Route path={`${match.url}/room/add/guest`} component={AddGuest} />

                    {/* Guests */}



                    <Route path={`${match.url}/guest`} component={EditGuest} />

                    {/* Bills */}
                    <Route path={`${match.url}/bills`} component={Bills} />
                    {/* Bookings */}

                    <Route path={`${match.url}/bookings`} component={Bookings} />

                    {/* Repairs */}

                    <Route path={`${match.url}/repairs`} component={Repairs} />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Elements;