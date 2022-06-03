import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { API_BASE_URL } from '../../../api/axiosClient';
import axios from 'axios';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Tab } from 'bootstrap';
import moment from 'moment';


export default class WaterBills extends Component {

    account = sessionStorage.getItem("token");

    state = {
        electrics: []
    }

    componentDidMount() {
        const id = this.account.roomId;
        axios.get(API_BASE_URL + `/Bill/api/Bill/room+electric/${id}`)
            .then(res => {
                const electrics = res.data;
                this.setState({ electrics });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition component="div" className="TabsAnimation"
                        appear={true} timeout={0} enter={false} exit={false}>
                        <Table>
                            <thead style={{ color: 'blue' }}>
                                <tr>
                                    <td>Ngày</td>
                                    <td>Số điện cũ</td>
                                    <td>Số điện mới </td>
                                    <td>Đơn giá/kWh</td>
                                    <td>Tiền điện</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.electrics.map((electric) => (
                                    <tr for="item in tableItems" key={electric.id}>
                                        <td>{moment(electric.electric_Date).format.apply('DD-MM-YYYY')}</td>
                                        <td>{electric.old_Number}</td>
                                        <td>{electric.electric_Number}</td>
                                        <td>{electric.electric_Price}</td>
                                        <td>{electric.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};


