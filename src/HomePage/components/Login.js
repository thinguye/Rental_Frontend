import React, { Component, useState } from 'react'

import instance from '../../api/axiosClient'
//import axios from 'axios'
import './Login.css';
import { LoginMenu } from '../../api-authorization/LoginMenu';
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    redirect: false,
    account: {}
  }
  handleOnChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }
  handleOnChangePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleLogin = e => {
    instance.post(`/Account?username=${this.state.username}&password=${this.state.password}`)
      .then((res) => {
        if (res.data != null) {
          sessionStorage.setItem("token", JSON.stringify(res.data));
          this.setState({ redirect: true, account: res.data });
        }
      }).catch(error => console.log(error));
  }

  // renderRedirect = () => {
  //   if (this.state.redirect == true) {
  //     if (this.state.account.roomId == 0) {
  //       return <Redirect to='/dashboards' />;
  //     } else if (this.state.account.roomId > 0) {
  //       return <Redirect to='/room' />;
  //     }
  //   }
  //   return <Redirect to='/homepage' />;
  // }

  //   renderRedirect = () => {
  //   if (this.state.redirect == true) {
  //     if (this.state.account.role == 'admin') {
  //       return <Redirect to='/dashboards' />;
  //     } else if (this.state.account.role == 'guest') {
  //       return <Redirect to='/room' />;
  //     }
  //   }
  //   return <Redirect to='/homepage' />;
  // }

  render() {

    return (
      <div className='login'>
        <ul className='nav login'>
          {/*           
          <li>
            <form className='login-form'>
              <label for='uname' className='label'>Tên đăng nhập</label>
              <input type="text" name="uname" required
                value={this.state.username}
                onChange={this.handleOnChangeUsername}
              />
            </form>
          </li>
          <li>
            <form className='login-form'>
              <label for='password' className='label'>Mật khẩu</label>
              <input type="text" name="password" required
                value={this.state.password}
                onChange={this.handleOnChangePassword} />
            </form>
          </li>
          <li>
            {this.renderRedirect()}
            <button className='btn-login' onClick={this.handleLogin}>Đăng nhập</button>
          </li> */}
          <LoginMenu>
          </LoginMenu>
        </ul>
      </div>
    )
  }
};