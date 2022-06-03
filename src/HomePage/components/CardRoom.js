import React from 'react'
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap'
import logo from './images/logo1.png'
import './CardRoom.css'
import { FaHome, FaDollarSign, FaCalendarCheck } from 'react-icons/fa'
import instance from '../../api/axiosClient'

export default class CardRoom extends React.Component {
  state = {
    show: false,
    name: "",
    phone: "",
    note: "",
    room: "",
    status: false,
    createDate: "",
    rooms: []
  }

  componentDidMount() {
    instance.get(`api/Room`)
      .then(res => {
        const rooms = res.data;
        this.setState({ rooms });
      })
      .catch(error => console.log(error));
  }

  handleClose = (e) => {
    this.setState({
      show: false
    })
  }
  handleShow = (id) => {
    this.setState({
      show: true,
      room: id
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
    instance.post(`/Booking`, data)
      .then(res => {
        this.setState({
          show: false
        })
        window.location.reload()
      })
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
  setDisabledButton(status) {
    if (status != "Còn Trống") {
      return "disabled"
    }
    return ""
  }
  render() {
    return (
      <>
        <Row md={3} xs={1} className='g-4'>
          {this.state.rooms.map((room) => (
            <div className='room-content'>
              <Card style={{ width: '20rem' }} key={room.id}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                  <Card.Title><FaHome /> Phòng {room.name}</Card.Title>
                  <Card.Text><FaDollarSign /> Giá: {room.price}</Card.Text>
                  <Card.Text><FaCalendarCheck /> Trạng thái: {room.state}</Card.Text>
                  <Button variant="primary book" className={this.setDisabledButton(room.state)} onClick={(e) => this.handleShow(room.id)}>
                    Đặt Phòng
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>


        <Modal show={this.state.show} onHide={(e) => this.handleClose()}>
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
            <Button variant="secondary" onClick={(e) => this.handleClose()}>
              Thoát
            </Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit()}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
