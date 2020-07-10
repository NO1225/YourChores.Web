import React, { useContext } from 'react';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

import screens from '../GlobalConstants/Screens'
import AuthContext from '../Contexts/AuthContext'

export default function Header() {
    const { signedIn } = useContext(AuthContext);


    return (
        <Navbar className="rtl" bg="light" expand="lg">
            <Link to={screens.HomeScreen}><Navbar.Brand>واجباتي</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav inline className="mr-2">
                    <Link to={screens.TimelineRouter}><Nav.Link href="#home">الصفحة الرئيسية</Nav.Link></Link>
                    <Link to={screens.RoomsRouter}><Nav.Link href="#home">الغرف</Nav.Link></Link>
                    <Link to={screens.SettingsRouter}><Nav.Link href="#home">الاعدادات</Nav.Link></Link>
                </Nav>
                <Nav className="mr-auto">
                    {signedIn ?
                        <Link to={screens.SignUpScreen}><Nav.Link href="#home">تسجيل خروج</Nav.Link></Link>
                        : null
                    }
                    {!signedIn ?
                        <Link to={screens.SignInScreen}><Nav.Link href="#home">تسجيل دخول</Nav.Link></Link>
                        : null
                    }
                    {!signedIn ?
                        <Link to={screens.SignUpScreen}><Nav.Link href="#home">انشاء حساب</Nav.Link></Link>
                        : null
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}