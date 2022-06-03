import React, { useState } from 'react'
import logo from './images/logo1.png'
import { LoginMenu } from '../../api-authorization/LoginMenu'
import { FaPhoneAlt } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {

    return (
        <div className='header'>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    <img src={logo} alt='logo' />
                </a>
                <p style={{ color: 'white' }}><FaPhoneAlt />+84 38 213 2704</p>
                <LoginMenu>
                </LoginMenu>
            </nav>
        </div >
    )
}

export default Navbar