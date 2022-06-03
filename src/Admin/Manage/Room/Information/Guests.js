import React, { Component, Fragment } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../../api/axiosClient';
import { Row, Col, Input, Label, Form, FormGroup } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';


class Guests extends Component {

    state = {
        idRoom: sessionStorage.getItem("roomId"),
        guests: [],
        redirectEditGuest: false,
        redirectAddGuest: false,
        showDelete: false,
        name: '',
        id: '',
        showAdd: false,
        name: '',
        id_Number: '',
        doB: '',
        hometown: '',
        initial_Address: '',
        job: '',
        nationality: '',
        company: '',
        phone: '',
        room: sessionStorage.getItem("roomId"),
        startDate: '',
        endDate: ''
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

    onRoomChange = e => {
        this.setState({
            room: e.target.value
        });
    };

    onStartDateChange = e => {
        this.setState({
            startDate: e.target.value,
            endDate: e.target.value
        });
    };

    handleSubmit = e => {
        const data = {
            name: this.state.name,
            id_Number: this.state.id_Number,
            doB: this.state.doB,
            hometown: this.state.hometown,
            initial_Address: this.state.initial_Address,
            job: this.state.job,
            nationality: this.state.nationality,
            company: this.state.company,
            phone: this.state.phone,
            room: this.state.room,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        axios
            .post(API_BASE_URL + '/Customer', data)
            .then(res => {
                console.log(res);
                this.setState({ showAdd: false })
                window.location.reload(false);
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        axios.get(API_BASE_URL + `/Customer/api/Customer/GetByRoom/${this.state.idRoom}`)
            .then(res => {
                const guests = res.data;
                this.setState({ guests });
            })
            .catch(error => console.log(error));
    }

    deleteGuest = (id, e) => {
        const room = 0;
        axios.put(API_BASE_URL + `/Customer/${id}`, room)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({ showDelete: false })
                window.location.reload(false);
            })
            .catch(error => console.log(error));

    };

    setRedirectEditGuest = (id, e) => {
        sessionStorage.setItem("guestId", id);
        this.setState({
            redirectEditGuest: true
        })
    }

    setRedirectAddGuest = (e) => {
        this.setState({
            redirectAddGuest: true
        })
    }

    renderRedirectEditGuest = () => {
        if (this.state.redirectEditGuest)
            return <Redirect to='/manage/guest' />;
        return <Redirect to='/manage/room/details' />;
    }

    renderRedirectAddGuest = () => {
        if (this.state.redirectAddGuest)
            return <Redirect to='/manage/room/add/guest' />;
        return <Redirect to='/manage/room/details' />;
    }

    handleShowDelete = (id, name, e) => {
        this.setState({
            showDelete: true,
            name: name,
            id: id
        })
    }

    handleCloseDelete = () => {
        this.setState({
            showDelete: false
        })
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
                                                            {this.renderRedirectEditGuest()}
                                                            <Button onClick={(e) => this.setRedirectEditGuest(guest.id)} variant="outline-primary">
                                                                <FaPencilAlt />
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="outline-danger" onClick={(e) => this.handleShowDelete(guest.id, guest.name)}>
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
                                            <td colSpan={5}>
                                                <div className='text-center'>
                                                    {this.renderRedirectAddGuest()}
                                                    <Button onClick={(e) => this.handleShowAdd()} variant="outline-primary">
                                                        <FaPlus /> Thêm khách trọ
                                                    </Button>
                                                    <Modal show={this.state.showAdd} onHide={(e) => this.handleCloseAdd()} dialogClassNam='100wh' >
                                                        <Modal.Header style={{ backgroundColor: 'white', borderWidth: '5px', borderColor: 'blueviolet' }} closeButton>
                                                            <Modal.Title style={{ color: 'blueviolet' }}>Thêm thông tin khách trọ</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Form style={{ color: 'blueviolet' }}>
                                                                <FormGroup>
                                                                    <Label for="name">Họ và tên</Label>
                                                                    <Input type="text" name="name" id="name"
                                                                        placeholder="Nhập tiếng Việt có dấu" value={this.state.name}
                                                                        onChange={this.onNameChange} required />
                                                                </FormGroup>
                                                                <Row>
                                                                    <Col>
                                                                        <FormGroup>
                                                                            <Label for="phone">Số điện thoại</Label>
                                                                            <Input type="tel" name="phone" id="phone"
                                                                                value={this.state.phone}
                                                                                onChange={this.onPhoneChange} />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col>
                                                                        <FormGroup>
                                                                            <Label for="doB">Ngày sinh</Label>
                                                                            <Input type="date" name="doB" id="doB"
                                                                                value={this.state.doB}
                                                                                onChange={this.onDoBChange} required />
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <FormGroup>
                                                                            <Label for="nationality">Quốc tịch</Label>
                                                                            <Input type="text" name="nationality" id="nationality"
                                                                                placeholder="Nhập tiếng Việt có dấu" value={this.state.nationality}
                                                                                onChange={this.onNationalityChange} />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col>
                                                                        <FormGroup>
                                                                            <Label for="id">Số CMND/CCCD</Label>
                                                                            <Input type="text" name="id" id="id"
                                                                                value={this.state.id_Number}
                                                                                onChange={this.onIdNumberChange} />
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <FormGroup>
                                                                            <Label for="job">Nghề nghiệp</Label>
                                                                            <Input type="text" name="job" id="job"
                                                                                placeholder="Nhập tiếng Việt có dấu" value={this.state.job}
                                                                                onChange={this.onJobChange} />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col>
                                                                        <FormGroup>
                                                                            <Label for="company">Nơi làm việc</Label>
                                                                            <Input type="text" name="company" id="company"
                                                                                placeholder="Nhập tiếng Việt có dấu" value={this.state.company}
                                                                                onChange={this.onCompanyChange} />
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>

                                                                <FormGroup>
                                                                    <Label for="hometown">Quê quán</Label>
                                                                    <Input type="text" name="hometown" id="hometown"
                                                                        placeholder="Nhập tiếng Việt có dấu" value={this.state.hometown}
                                                                        onChange={this.onHometownChange} />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label for="address">Nơi đăng kí HKTT</Label>
                                                                    <Input type="text" name="address" id="address"
                                                                        placeholder="Nhập tiếng Việt có dấu" value={this.state.initial_Address} onChange={this.onAddressChange} />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label for="startDate">Ngày đến</Label>
                                                                    <Input type="date" name="startDate" id="startDate"
                                                                        value={this.state.startDate}
                                                                        onChange={this.onStartDateChange} required />
                                                                </FormGroup>
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
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                                <Modal
                                    show={this.state.showDelete}
                                    size="lg"
                                    onClick={(e) => this.handleCloseDelete()}
                                    aria-labelledby="contained-modal-title-vcenter"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Xác nhận</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Bạn có muốn xóa {this.state.name} khỏi phòng {this.state.idRoom}?
                                    </Modal.Body>
                                    <Modal.Footer style={{ backgroundColor: 'white', borderColor: 'transparent' }}>
                                        <Button variant="danger" onClick={(e) => this.deleteGuest(this.state.id)}>
                                            Có
                                        </Button>
                                        <Button variant="secondary" onClick={(e) => this.handleCloseDelete()}>Không</Button>
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

export default withRouter(Guests);


