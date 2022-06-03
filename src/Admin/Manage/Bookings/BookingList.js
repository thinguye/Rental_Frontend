import React, { Component, Fragment } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import { Row, Col } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';


class BookingList extends Component {

    state = {
        bookings: [],
        rooms: [],
        showAdd: false,
        name: "",
        phone: "",
        note: "",
        room: ""
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/Booking`)
            .then(res => {
                const bookings = res.data;
                console.log(res);
                console.log(res.data);
                this.setState({ bookings });
            })
            .catch(error => console.log(error));
    }

    deleteBooking(id, e) {
        axios.delete(API_BASE_URL + `/Booking/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const bookings = this.state.bookings.filter(item => item.id != id);
                this.setState({ bookings });
            })
            .catch(error => console.log(error));
    };



    onStatusChange = (id, e) => {
        axios.put(API_BASE_URL + `/Booking/${id}`);
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onPhoneChange = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    onNotesChange = (e) => {
        this.setState({
            note: e.target.value
        })
    }
    onRoomChange = (e) => {
        this.setState({
            room: e.target.value
        })
    };

    handleShowAdd = () => {
        this.setState({
            showAdd: true
        })
        axios.get(API_BASE_URL + '/Room')
            .then((res) => {
                const rooms = (res.data).filter(item => item.state == 'Còn Trống');
                this.setState({ rooms });
            })
    }
    handleCloseAdd = () => {
        this.setState({
            showAdd: false
        })
    }
    handleSubmit = (e) => {
        const data = {
            name: this.state.name,
            phone: this.state.phone,
            room: this.state.room,
            note: this.state.note,
            status: false,
            createDate: new Date()
        }
        axios.post(API_BASE_URL + `/Booking`, data)
            .then(res => {
                this.setState({
                    showAdd: false
                })
                window.location.reload()
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
                                <Table style={{ borderColor: 'gray' }}>
                                    <thead style={{ color: 'blue' }}>
                                        <tr>
                                            <td className='text-center'>Người đặt phòng</td>
                                            <td className='text-center'>Số điện thoại</td>
                                            <td className='text-center'>Phòng</td>
                                            <td className='text-center'>Ghi chú</td>
                                            <td className='text-center'>Trạng thái cọc</td>
                                            <td className='text-center'>Ngày đặt</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bookings.map((booking) => (
                                            <tr v-for="item in tableItems" key={booking.id}>
                                                <td className='text-center'>{booking.name}</td>
                                                <td className='text-center'>{booking.phone}</td>
                                                <td className='text-center'>{booking.room}</td>
                                                <td className='text-center'>{booking.note}</td>
                                                <td className='text-center'>
                                                    <Input style={{ backgroundColor: 'green', borderColor: 'green' }} defaultChecked={booking.status == true} value={booking.status} type='checkbox' onChange={(e) => this.onStatusChange(booking.id)} />
                                                </td>
                                                <td className='text-center'>{moment(booking.createDate).format('DD-MM-YYYY')}</td>
                                                <td className='right'>
                                                    <Row style={{ float: 'right' }}>
                                                        <Col>
                                                            <Button variant="outline-primary">
                                                                <FaPencilAlt />
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="outline-danger" onClick={(e) => this.deleteBooking(booking.id)}>
                                                                <FaTrashAlt />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot style={{ borderColor: 'transparent' }}>
                                        <tr>
                                            <td colSpan={12}>
                                                <div className='text-center'>
                                                    <Button variant="outline-primary" onClick={(e) => this.handleShowAdd()}>
                                                        <FaPlus /> Đặt phòng
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                                <Modal show={this.state.showAdd} onHide={(e) => this.handleCloseAdd()}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Đặt Phòng</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Họ và Tên</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nguyễn Văn A"
                                                    autoFocus
                                                    name="name"
                                                    onChange={this.onNameChange}
                                                    value={this.state.name}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    placeholder=""
                                                    autoFocus
                                                    name="phone"
                                                    onChange={this.onPhoneChange}
                                                    value={this.state.phone}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Phòng</Form.Label>
                                                <Form.Select
                                                    value={this.state.room}
                                                    onChange={this.onRoomChange}
                                                >
                                                    {this.state.rooms.map((room) => (
                                                        <option key={room.id} value={room.id}>{room.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                            >
                                                <Form.Label>Ghi chú</Form.Label>
                                                <Form.Control as="textarea" rows={3}
                                                    name="notes"
                                                    onChange={this.onNotesChange}
                                                    value={this.state.note} />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={(e) => this.handleSubmit()}>
                                            Xác nhận
                                        </Button>
                                        <Button variant="secondary" onClick={(e) => this.handleCloseAdd()}>
                                            Thoát
                                        </Button>
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

export default withRouter(BookingList);


