import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import { Row, Col } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

export default class NewGuests extends Component {
    state = {
        guests: [],
        redirect: false
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/Customer/api/Customer/current+customers`)
            .then(res => {
                const guests = res.data;
                this.setState({ guests });
            })
            .catch(error => console.log(error));
    }

    deleteGuest = (id, e) => {
        axios.put(API_BASE_URL + `/Customer/${id}`, id, 0).then(res => {
            console.log(res);
            window.location.reload(false);
            console.log(res.data);
        });
    };

    setRedirect = (id, e) => {
        sessionStorage.setItem("guestId", id);
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/manage/guest' />
        }
        return <Redirect to='/manage/guests' />
    }

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
                        <div>
                            <Table>
                                <thead style={{ color: 'blue' }}>
                                    <tr>
                                        <td>Họ và tên</td>
                                        <td>Số điện thoại</td>
                                        <td>Ngày sinh</td>
                                        <td>Số CMND/CCCD</td>
                                        <td>Phòng</td>
                                        <td>Tạm trú từ</td>
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
                                            <td>{guest.room}</td>
                                            <td>{moment(guest.startDate).format('DD-MM-YYYY')}</td>
                                            <td>
                                                <Row>
                                                    <Col>
                                                        {this.renderRedirect()}
                                                        <Button variant="outline-primary" onClick={(e) => this.setRedirect(guest.id)}>
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
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};
