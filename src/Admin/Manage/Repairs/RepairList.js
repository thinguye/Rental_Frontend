import React, { Component, Fragment } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import { Row, Col, Input, Label } from 'reactstrap';
import { FaTrashAlt, FaEye, FaPlus, FaRegSave } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
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

export default class RepairList extends Component {

    state = {
        id: '',
        repairs: [],
        show: false,
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/RequestRepair`)
            .then(res => {
                const repairs = res.data;
                this.setState({ repairs });
            })
            .catch(error => console.log(error));
        $(document).ready(function () {
            setTimeout(function () {
                $('#repairList').dataTable();
            }, 1000);
        });
    }

    notify2 = (e) => this.toastId = toast("Đã xóa hóa đơn!", {
        transition: Slide,
        closeButton: true,
        autoClose: 2000,
        position: 'center-center',
        type: 'warning'
    });

    deleteRepair(e) {
        const id = this.state.id;
        axios.delete(API_BASE_URL + `/RequestRepair/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const repairs = this.state.repairs.filter(item => item.id != id);
                this.setState({ repairs });
                this.setState({
                    show: false
                })
            })
            .catch(error => console.log(error));
        this.notify2();
    };

    handleShow = (id, e) => {
        this.setState({
            id: id,
            show: true
        })
    }

    handleClose = (e) => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <div>
                                <Table id='repairList'>
                                    <thead style={{ color: 'blue' }}>
                                        <tr>
                                            <td>Mã</td>
                                            <td>Phòng</td>
                                            <td>Nội dung</td>
                                            <td>Ngày</td>
                                            <td>Trạng thái</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.repairs.map((repair) => ((
                                            <tr v-for="item in tableItems" key={repair.id}>
                                                <td>{repair.id}</td>
                                                <td>{repair.room}</td>
                                                <td>{repair.description}</td>
                                                <td>{moment(repair.date).format('DD-MM-YYYY')}</td>
                                                <td>{repair.status}</td>
                                                <td>
                                                    <Button variant="outline-danger" onClick={(e) => this.handleShow(repair.id)}>
                                                        <FaTrashAlt />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )))}
                                    </tbody>
                                    <Modal show={this.state.show} onHide={(e) => this.handleClose()}>
                                        <Modal.Header
                                            closeButton style={{ backgroundColor: 'black', padding: '1rem', color: 'white' }}
                                        >
                                            <b><FaTrashAlt/> Xác nhận</b>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Bạn có thực sự muốn xóa mục đã chọn không?
                                        </Modal.Body>
                                        <Modal.Footer style={{ display: 'block', backgroundColor: 'transparent' }}>
                                            <Row>
                                                <Col>
                                                </Col>
                                                <Col>
                                                    <div className='text-center'>
                                                        <Button
                                                            variant="outline-danger"
                                                            style={{ borderColor: "transparent" }}
                                                            onClick={(e) => this.deleteRepair()}
                                                        >
                                                            <b>Có</b>
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='text-center'>
                                                        <Button onClick={(e) => this.handleClose()}
                                                            style={{ borderColor: "transparent" }}
                                                            variant="outline-primary"
                                                        >
                                                            <b>Không</b>
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col>
                                                </Col>
                                            </Row>
                                        </Modal.Footer>

                                    </Modal>
                                </Table>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};
