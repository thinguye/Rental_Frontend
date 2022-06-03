import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Slider from './Slider';
import CardRoom from './CardRoom';
import Footer from './Footer';

export default class HomePageDetail extends React.Component {

    render() {
        return (
            <div style={{ width: '100%', maxWidth: '100%' }}>
                <Navbar />
                <Slider />
                <CardRoom />
                <Footer />
            </div>
        );
    }
}