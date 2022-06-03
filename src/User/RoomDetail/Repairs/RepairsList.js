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

export default class RepairsList extends Component {

    state = {
        repairs: {},
        account: JSON.parse(sessionStorage.getItem("token"))
    }

    componentDidMount() {
        console.log(this.state.account);
        axios.get(API_BASE_URL + `/Repair/api/Repair/GetByRoom/${this.state.account.roomId}`)
            .then(res => {
                const repairs = res.data;
                this.setState({ repairs });
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
                                    <Input type="text" name="name" id="name" value={''} />
                                </FormGroup>
                            </Row>
                            <FormGroup>
                                <Label for="price">Giá phòng</Label>
                                <Input type="text" name="price" id="price"
                                    placeholder="Nhập giá phòng" value={''} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="state">Trạng thái</Label>
                                <Input type="text" name="state" id="state" value={''} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="des">Mô tả</Label>
                                <Input type="text" name="des" id="des"
                                    placeholder="Nhập số khách trong phòng" value={''} />.
                            </FormGroup>
                        </Form>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

