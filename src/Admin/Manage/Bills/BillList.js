import React, { Component, Fragment } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import { Row, Col, Input, Label } from 'reactstrap';
import { FaTrashAlt, FaEye, FaPlus, FaRegSave } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    toast,
    Slide
} from 'react-toastify';

class BillList extends Component {

    state = {
        bills: [],
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/Bill`)
            .then(res => {
                const bills = res.data;
                this.setState({ bills });
            })
            .catch(error => console.log(error));
        $(document).ready(function () {
            setTimeout(function () {
                $('#billList').dataTable();
            }, 1000);
        });
    }

    onIsPayChange = (id, e) => {
        axios.put(API_BASE_URL + `/Bill/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }

    notify = (e) => this.toastId = toast("Cập nhật hóa đơn thành công!", {
        transition: Slide,
        closeButton: true,
        autoClose: 3000,
        position: 'bottom-center',
        type: 'success'
    });

    notify2 = (e) => this.toastId = toast("Đã xóa hóa đơn!", {
        transition: Slide,
        closeButton: true,
        autoClose: 3000,
        position: 'bottom-center',
        type: 'warning'
    });

    setCheck(is_Pay) {
        if (is_Pay == true) {
            return 'checked';
        }
        return "";
    }

    deleteBill(id, e) {
        axios.delete(API_BASE_URL + `/Bill/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const bills = this.state.bills.filter(item => item.id != id);
                this.setState({ bills });
            })
            .catch(error => console.log(error));
        this.notify2();
    };

    render() {

        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <div>
                                <Table id="billList" hover>
                                    <thead style={{ color: 'blue' }}>
                                        <tr>
                                            <td className='text-center' >Mã hóa đơn</td>
                                            <td className='text-center' >Ngày</td>
                                            <td className='text-center' >Phòng</td>
                                            <td className='text-center' >Thành tiền</td>
                                            <td className='text-center' >Trạng thái</td>
                                            <td ></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bills.map((bill) => (
                                            <tr v-for="item in tableItems" key={bill.id}>
                                                <td className='text-center' >{bill.id}</td>
                                                <td className='text-center' >{moment(bill.time).format('DD-MM-YYYY')}</td>
                                                <td className='text-center' >{bill.room}</td>
                                                <td className='text-center' >{bill.total}</td>
                                                <td className='text-center'>
                                                    <Input style={{ backgroundColor: 'green', borderColor: 'green' }} defaultChecked={bill.is_Pay == true} value={bill.is_Pay} type='checkbox' onClick={this.notify} onChange={(e)=>this.onIsPayChange(bill.id)} />
                                                </td>
                                                <td>
                                                    <Row >
                                                        <Col>
                                                            <Button variant="outline-primary">
                                                                <FaEye />
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="outline-danger" onClick={(e) => this.deleteBill(bill.id)}>
                                                                <FaTrashAlt />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};

export default withRouter(BillList);


