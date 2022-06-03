import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import {
    Col, Row, Form, FormGroup, Label, Input
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

class RoomProfile extends Component {

    state = {
        room: {},
        account: JSON.parse(sessionStorage.getItem("token"))
    }

    componentDidMount() {
        console.log(this.state.account);
        axios.get(API_BASE_URL + `/Room/${this.state.account.roomId}`)
            .then(res => {
                const room = res.data;
                this.setState({ room });
            })
            .catch(error => console.log(error));
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
                        <Form>
                            <Row>
                                <FormGroup>
                                    <Label for="name">Phòng</Label>
                                    <Input type="text" name="name" id="name" value={this.state.room.name} />
                                </FormGroup>
                            </Row>
                            <FormGroup>
                                <Label for="price">Giá phòng</Label>
                                <Input type="text" name="price" id="price"
                                    placeholder="Nhập giá phòng" value={this.state.room.price} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="state">Trạng thái</Label>
                                <Input type="text" name="state" id="state" value={this.state.room.state} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="des">Mô tả</Label>
                                <Input type="text" name="des" id="des"
                                    placeholder="Nhập số khách trong phòng" value={this.state.room.description} />.
                            </FormGroup>
                        </Form>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

export default withRouter(RoomProfile);
