import React, { Component, Fragment } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    Row, Col, Label, Input
} from 'reactstrap';
import { FaTrashAlt, FaPlus, FaEye } from 'react-icons/fa';
import { API_BASE_URL } from '../../../api/axiosClient';
import axios from 'axios';
import moment from 'moment';

class BillsTotal extends Component {

    account= JSON.parse(sessionStorage.getItem("token"));

    state = {
        bills: [],
        roomName: '',
        room: this.account.roomId,
        electric_num: 0,
        water_num: 0,
        showAdd: false
    }

    componentDidMount() {
        const id = this.state.room
        axios.get(API_BASE_URL + `/Bill/api/Bill/GetByRoom/${id}`)
            .then(res => {
                const bills = res.data;
                this.setState({ bills });
            })
            .catch(error => console.log(error));
        axios.get(API_BASE_URL + `/Room/${id}`)
            .then(res => {
                const data = res.data;
                const roomName = data.name;
                this.setState({ roomName })
            })
            .catch(error => console.log(error));
    }

    handleShowAdd = () => {
        this.setState({
            showAdd: true
        })
    }

    handleCloseAdd = () => {
        this.setState({
            showAdd: false
        })
    }

    onElectricChange = (e) => {
        this.setState({
            electric_num: e.target.value
        });
    };

    onWaterChange = (e) => {
        this.setState({
            water_num: e.target.value
        });
    };

    handleSubmit = (e) => {
        const room = this.state.room;
        const electric_num = this.state.electric_num;
        const water_num = this.state.water_num;
        axios
            .post(API_BASE_URL + `/Bill?roomId=${room}&electric_num=${electric_num}&water_num=${water_num}`)
            .then(res => {
                console.log(res)
                if (res) {
                    this.setState({ showAdd: false })
                    window.location.reload()
                }
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <div>
                                <Table>
                                    <thead style={{ color: 'blue' }}>
                                        <tr>
                                            <td className='text-center'>Mã hóa đơn</td>
                                            <td className='text-center'>Ngày</td>
                                            <td className='text-center'>Tiền phòng</td>
                                            <td className='text-center'>Tiền điện</td>
                                            <td className='text-center'>Tiền nước</td>
                                            <td className='text-center'>Các khoản khác</td>
                                            <td className='text-center'>Thành tiền</td>
                                            <td className='text-center'>Trạng thái</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bills.map((bill) => (
                                            <tr v-for="item in tableItems" key={bill.id}>
                                                <td className='text-center'>{bill.id}</td>
                                                <td className='text-center'>{moment(bill.time).format('DD-MM-YYYY')}</td>
                                                <td className='text-center'>{bill.price}</td>
                                                <td className='text-center'>{bill.electric_Fee}</td>
                                                <td className='text-center'>{bill.water_Fee}</td>
                                                <td className='text-center'>{bill.wifi_Fee + bill.garbage_Fee}</td>
                                                <td className='text-center'>{bill.total}</td>
                                                <td className='text-center'>{bill.is_Pay?"Đã Thanh Toán":"Chưa Thanh Toán"}</td>
                                                <td className='right'>
                                                    <Row style={{ float: 'right' }}>
                                                        <Col>
                                                            <Button variant="outline-primary">
                                                                <FaEye />
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="outline-danger" onClick={(e) => this.deleteBill(bill.id_Number)}>
                                                                <FaTrashAlt />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className='text-center'>
                                    <Button variant="outline-primary" onClick={(e) => this.handleShowAdd()}>
                                        <FaPlus /> Thêm hóa đơn
                                    </Button>
                                </div>
                                <Modal show={this.state.showAdd} onHide={(e) => this.handleCloseAdd()} >
                                    <Modal.Header style={{ backgroundColor: 'white', borderWidth: '5px', borderColor: 'blueviolet' }} closeButton>
                                        <Modal.Title style={{ color: 'blueviolet' }}>Thêm hóa đơn</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Row>
                                                <Form.Group>
                                                    <Label for="name">Số phòng</Label>
                                                    <Input type="text" name="name" id="name" value={this.state.roomName} />
                                                </Form.Group>
                                            </Row>
                                            <Form.Group>
                                                <Label for="electric">Số điện</Label>
                                                <Input type="number" step={1} name="electric" id="electric" value={this.state.electric_num}
                                                    onChange={this.onElectricChange} required />
                                            </Form.Group>
                                            <Form.Group>
                                                <Label for="water">Số nước</Label>
                                                <Input type="number" step={1} name="water" id="water" value={this.state.water_num}
                                                    onChange={this.onWaterChange} required />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer style={{ display: 'block' }}>
                                        <div className='text-center'>
                                            <Button style={{ marginRight: '40px', borderColor: 'transparent' }} onClick={(e) => this.handleSubmit()} type="submit" variant='outline-primary'>
                                                <b>Thêm</b>
                                            </Button>
                                            <Button style={{ marginLeft: '40px' }} variant="danger" onClick={(e) => this.handleCloseAdd()}>
                                                Thoát
                                            </Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};

export default BillsTotal;


