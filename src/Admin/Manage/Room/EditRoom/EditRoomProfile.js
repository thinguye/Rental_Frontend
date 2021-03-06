import React, { Component, Fragment } from 'react';
import { Button, Table, Form} from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../../api/axiosClient';
import {
    Col, Row, FormGroup, Label, Input
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';

class EditRoomProfile extends Component {

    state = {
        id: sessionStorage.getItem("roomId"),
        name: '',
        state: '',
        number_Of_People: 0,
        price: 0,
        description: '',
        date: new Date(),
        redirect: false
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/Room/${this.state.id}`)
            .then(res => {
                const room = res.data;
                const name = room.name;
                const state = room.state;
                const number_Of_People = room.number_Of_People;
                const price = room.price;
                const description = room.description;
                const date = room.date;
                this.setState({ name, state, number_Of_People, price, description, date });
            })
            .catch(error => console.log(error));

    }

    onNameChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    onPriceChange = e => {
        this.setState({
            price: e.target.value
        });
    };

    onDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    };

    onStateChange = e => {
        this.setState({
            state: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            id: this.state.id,
            name: this.state.name,
            state: this.state.state,
            number_Of_People: this.state.number_Of_People,
            price: this.state.price,
            description: this.state.description,
            date: this.state.date
        };
        axios
            .put(API_BASE_URL + `/Room`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        this.setState({ redirect: true })
    };

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to='/manage/rooms' />;
        }
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
                                    <Label for="name">Ph??ng</Label>
                                    <Input type="text" name="name" id="name"
                                        placeholder="Nh???p s??? ph??ng" value={this.state.name} />
                                </FormGroup>
                            </Row>
                            <FormGroup>
                                <Label for="price">Gi?? ph??ng</Label>
                                <Input type="text" name="price" id="price"
                                    placeholder="Nh???p gi?? ph??ng" value={this.state.price}
                                    onChange={this.onPriceChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="state">Tr???ng th??i</Label>
                                <Form.Control
                                    as="select"
                                    id="state"
                                    value={this.state.state}
                                    onChange={this.onStateChange}
                                >
                                    <option value="???? Cho Thu??">???? Cho Thu??</option>
                                    <option value="???? ?????t">???? ?????t</option>
                                    <option value="??ang S???a Ch???a">??ang S???a Ch???a</option>
                                    <option value="C??n Tr???ng">C??n Tr???ng</option>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup>
                                <Label for="des">M?? t???</Label>
                                <Form.Control as="textarea" id="des"
                                    placeholder="" value={this.state.description}
                                    onChange={this.onDescriptionChange} row={5}>
                                    </Form.Control>
                            </FormGroup>
                            <div>
                                {this.renderRedirect()}
                                <Button onClick={this.handleSubmit} type="submit" color="primary">L??u ch???nh s???a</Button>
                            </div>
                        </Form>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

export default withRouter(EditRoomProfile);
