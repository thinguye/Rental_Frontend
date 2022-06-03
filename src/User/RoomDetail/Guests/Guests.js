import React, { Component, Fragment } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import { Row, Col, Input, Label } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';


class Guests extends Component {

    state = {
        guests: [],
        account: JSON.parse(sessionStorage.getItem("token")),
        showEdit: false,
        showDelete: false,

        id: '',
        name: '',
        id_Number: '',
        doB: '',
        phone: '',
        initial_Address: '',
        hometown: '',
        job: '',
        company: '',
        startDate: '',
        endDate: '',
        room: 0,
        nationality: '',
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/Customer/api/Customer/GetByRoom/${this.state.account.roomId}`)
            .then(res => {
                const guests = res.data;
                this.setState({ guests });
            })
            .catch(error => console.log(error));
    }

    deleteGuest(id, e) {
        const room = 0;
        axios.put(API_BASE_URL + `/Customer/${id}`, id, room)
            .then(res => {
                console.log(res);
                if (res) {
                    this.setState({
                        showDelete: false
                    })
                }
                console.log(res.data);
            })
            .catch(error => console.log(error));
    };


    handleShowEdit = (guestId) => {
        const id = guestId;
        axios.get(API_BASE_URL + `/Customer/${id}`)
            .then(res => {
                const guest = res.data;
                const name = guest.name;
                const id_Number = guest.id_Number;
                const doB = moment(guest.doB).format('YYYY-MM-DD');
                const phone = guest.phone;
                const initial_Address = guest.initial_Address;
                const hometown = guest.hometown;
                const job = guest.job;
                const company = guest.company;
                const startDate = moment(guest.startDate).format('YYYY-MM-DD');
                const endDate = moment(guest.endDate).format('YYYY-MM-DD');
                const room = guest.room;
                const nationality = guest.nationality;
                this.setState({ id, name, id_Number, doB, phone, initial_Address, hometown, job, company, startDate, endDate, room, nationality });
            })
            .catch(error => console.log(error));
        this.setState({
            showEdit: true
        })
    }

    handleCloseEdit = () => {
        this.setState({
            showEdit: false
        })
    }

    handleSubmit = () => {
        const data = {
            id: this.state.id,
            name: this.state.name,
            id_Number: this.state.id_Number,
            doB: moment(this.state.doB),
            hometown: this.state.hometown,
            initial_Address: this.state.initial_Address,
            job: this.state.job,
            nationality: this.state.nationality,
            company: this.state.company,
            phone: this.state.phone,
            room: this.state.room,
            startDate: moment(this.state.startDate),
            endDate: moment(this.state.endDate),
        };
        console.log(data);
        axios
            .put(API_BASE_URL + `/Customer/Edit/${this.state.id}`, data)
            .then(res => {
                if (res) {
                    this.setState({
                        showEdit: false
                    })
                }
            })
            .catch(err => console.log(err));
    }

    onNameChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    onIdNumberChange = e => {
        this.setState({
            id_Number: e.target.value
        });
    };

    onPhoneChange = e => {
        this.setState({
            phone: e.target.value
        });
    };

    onDoBChange = e => {
        this.setState({
            doB: e.target.value
        });
        console.log(e.target.value);
    };

    onHometownChange = e => {
        this.setState({
            hometown: e.target.value
        });
    };

    onAddressChange = e => {
        this.setState({
            initial_Address: e.target.value
        });
    };

    onJobChange = e => {
        this.setState({
            job: e.target.value
        });
    };

    onCompanyChange = e => {
        this.setState({
            company: e.target.value
        });
    };

    onNationalityChange = e => {
        this.setState({
            nationality: e.target.value
        });
    };

    onStartDateChange = e => {
        this.setState({
            startDate: e.target.value
        });
        console.log(e.target.value);
    };

    onEndDateChange = e => {
        this.setState({
            endDate: e.target.value
        });
        console.log(e.target.value);
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
                                            <td>Họ và tên</td>
                                            <td>Số điện thoại</td>
                                            <td>Ngày sinh</td>
                                            <td>Số CMND/CCCD</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.guests.map((guest) => (
                                            <tr v-for="item in tableItems" key={guest.id}>
                                                <td>{guest.name}</td>
                                                <td>{guest.phone}</td>
                                                <td>{moment(guest.doB).format('DD-MM-YYYY')}</td>
                                                <td>{guest.id_Number}</td>
                                                <td className='right'>
                                                    <Row style={{ float: 'right' }}>
                                                        <Col>
                                                            <Button variant="outline-primary" onClick={(e) => this.handleShowEdit(guest.id)}>
                                                                <FaPencilAlt />
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="outline-danger" onClick={(e) => this.deleteGuest(guest.id)}>
                                                                <FaTrashAlt />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Modal size="lg"
                                    aria-labelledby="contained-modal-title-vcenter" show={this.state.showEdit} onHide={e => this.handleCloseEdit()} style={{ width: '100wh' }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group>
                                                <Label for="name">Họ và tên</Label>
                                                <Input type="text" name="name" id="name"
                                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.name} onChange={(e) => this.onNameChange()}
                                                    required />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Form.Group>
                                                        <Label for="doB">Ngày sinh</Label>
                                                        <Input type="date" name="doB" id="doB"
                                                            min="1900-01-01" value={this.state.doB} onChange={this.onDoBChange}
                                                            required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Label for="id">Số CMND/CCCD</Label>
                                                        <Input type="text" name="id" id="id"
                                                            value={this.state.id_Number} onChange={(e) => this.onIdNumberChange()}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Label for="phone">Số điện thoại</Label>
                                                        <Input type="text" name="phone" id="phone"
                                                            value={this.state.phone} onChange={(e) => this.onPhoneChange()}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Label for="job">Nghề nghiệp</Label>
                                                        <Input type="text" name="job" id="job"
                                                            placeholder="Nhập tiếng Việt có dấu" value={this.state.job} onChange={(e) => this.onJobChange()}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Label for="company">Nơi làm việc</Label>
                                                        <Input type="text" name="company" id="company"
                                                            placeholder="Nhập tiếng Việt có dấu" value={this.state.company} onChange={(e) => this.onCompanyChange()}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group>
                                                <Label for="nationality">Quốc tịch</Label>
                                                <Input type="text" name="nationality" id="nationality"
                                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.nationality} onChange={(e) => this.onNationalityChange()}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Label for="oldRoom">Phòng</Label>
                                                <Input type="text" name="oldRoom" id="oldRoom" placeholder={this.state.room} disabled />
                                            </Form.Group>
                                            <Form.Group>
                                                <Label for="hometown">Quê quán</Label>
                                                <Input type="text" name="hometown" id="hometown"
                                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.hometown} onChange={(e) => this.onHometownChange()}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Label for="address">Nơi đăng kí HKTT</Label>
                                                <Input type="text" name="address" id="address"
                                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.initial_Address} onChange={(e) => this.onAddressChange()}
                                                />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Form.Group>
                                                        <Label for="startDate">Tạm trú từ ngày</Label>
                                                        <Input type="date" name="startDate" id="startDate" value={this.state.startDate} onChange={this.onStartDateChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Label for="endDate">Đến ngày</Label>
                                                        <Input type="date" name="endDate" id="endDate" value={this.state.endDate} onChange={this.onEndDateChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={(e) => this.handleSubmit()} type="submit" color="primary">Lưu chỉnh sửa</Button>
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

export default Guests;


