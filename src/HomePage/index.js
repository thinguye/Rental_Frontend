import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// DASHBOARDS

import HomePageDetail from './components/index';


const HomePage = ({ match }) => (
    <Route path={`${match.url}`} component={HomePageDetail} />
);

export default HomePage;