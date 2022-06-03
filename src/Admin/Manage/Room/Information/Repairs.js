import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus, FaEye } from 'react-icons/fa';
import { Tab } from 'bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../../../api/axiosClient';
import axios from 'axios';
import moment from 'moment';

class Repairs extends Component {

    state = {
        repairs: []
    }

    componentDidMount() {
        const id = sessionStorage.getItem("roomId");
        axios.get(API_BASE_URL + `/RequestRepair/api/RequestRepair/RoomRepairs/${id}`)
            .then(res => {
                const repairs = res.data;
                this.setState({ repairs });
                console.log(id);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <div>
                                <Table bordered style={{ borderColor: 'gray' }}>
                                    <thead style={{ color: 'blue' }}>
                                        <tr>
                                            <td>Ngày</td>
                                            <td>Nội dung</td>
                                            <td>Trạng thái</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.repairs.map((repair) => (
                                            <tr v-for="item in tableItems" key={repair.id}>
                                                <td>{moment(repair.date).format('DD-MM-YYYY')}</td>
                                                <td>{repair.description}</td>
                                                <td>{repair.status}</td>
                                                <td className='right'>
                                                    <Button variant="outline-danger" onClick={(e) => this.deleteRepair(repair.id_Number)}>
                                                        <FaTrashAlt />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className='text-center'>
                                    <Button variant="outline-primary">
                                        <FaPlus /> Thêm yêu cầu sửa chữa
                                    </Button>
                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};

export default withRouter(Repairs);


