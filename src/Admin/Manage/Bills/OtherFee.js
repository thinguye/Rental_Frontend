import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import {
    Col, Row, Form, FormGroup, Label, Input
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';


class OtherFee extends Component {

    state = {
        areaID: 1,
        electricFee: 0,
        waterFee: 0,
        garbageFee: 0,
        wifiFee: 0,
        bonusPeopleFee: 0
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/OtherFee/1`)
            .then(res => {
                const otherFree = res.data;
                const areaID = otherFree.areaID;
                const electricFee = otherFree.electricFee;
                const waterFee = otherFree.waterFee;
                const garbageFee = otherFree.garbageFee;
                const wifiFee = otherFree.wifiFee;
                const bonusPeopleFee = otherFree.bonusPeopleFee;
                this.setState({ areaID, electricFee, waterFee, garbageFee, wifiFee, bonusPeopleFee });
            })
            .catch(error => console.log(error));
    }

    onElectricFeeChange = e => {
        this.setState({
            electricFee: e.target.value
        });
    };

    onWaterFeeChange = e => {
        this.setState({
            waterFee: e.target.value
        });
    };

    onWifiFeeChange = e => {
        this.setState({
            wifiFee: e.target.value
        });
    };

    onGarbageFeeChange = e => {
        this.setState({
            garbageFee: e.target.value
        });
    };

    onBonusPeopleChange = e => {
        this.setState({
            bonusPeopleFee: e.target.value
        });
    };



    handleSubmit = e => {
        e.preventDefault();
        const data = {
            areaID: this.state.areaID,
            electricFee: this.state.electricFee,
            waterFee: this.state.waterFee,
            garbageFee: this.state.garbageFee,
            wifiFee: this.state.wifiFee,
            bonusPeopleFee: this.state.bonusPeopleFee
        };
        axios
            .put(API_BASE_URL + `/OtherFee/1`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        console.log(this.state.areaID);
    };


    render() {
        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition
                        component="div"
                        className="TabsAnimation"
                        appear={true}
                        timeout={0}
                        enter={false}
                        exit={false}>
                        <div style={{ padding: '5vh' }}>
                            <Form>
                                <FormGroup>
                                    <Row>
                                        <Col><Label for="area">Khu tr???</Label></Col>
                                        <Col><Input type="number" step={1} name="area" id="area" value={this.state.areaID}
                                            required /></Col>
                                        <Col></Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label for="electric">Gi?? ??i???n</Label></Col>
                                        <Col><Input type="number" step={100} name="electric" id="electric" value={this.state.electricFee} onChange={this.onElectricFeeChange}
                                            required /></Col>
                                        <Col>VN??/kWh</Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label for="water">Gi?? n?????c</Label></Col>
                                        <Col><Input type="number" step={100} name="water" id="water" value={this.state.waterFee} onChange={this.onWaterFeeChange}
                                            required /></Col>
                                        <Col>VN??/m<sup>3</sup></Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label for="garbage">Ti???n r??c</Label></Col>
                                        <Col><Input type="number" step={1000} name="garbage" id="garbage" value={this.state.garbageFee} onChange={this.onGarbageFeeChange}
                                            required /></Col>
                                        <Col>VN??/ph??ng</Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label for="wifi">Ph?? wi-fi</Label></Col>
                                        <Col><Input type="number" step={2000} name="wifi" id="wifi" value={this.state.wifiFee} onChange={this.onWifiFeeChange}
                                            required /></Col>
                                        <Col>VN??/ph??ng</Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label for="bonusPeople">Th??m ng?????i(cho ph??ng t??? 3 ng?????i tr??? l??n)</Label></Col>
                                        <Col><Input type="number" step={10000} name="bonusPeople" id="bonusPeople" value={this.state.bonusPeopleFee} onChange={this.onBonusPeopleChange}
                                            required /></Col>
                                        <Col>VN??/ng?????i</Col>
                                    </Row>
                                </FormGroup>
                                <div className='text-center'>
                                    <Button onClick={this.handleSubmit} type="submit" color="primary">L??u ch???nh s???a</Button>
                                </div>
                            </Form>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment >
        );
    }
};

export default withRouter(OtherFee);


