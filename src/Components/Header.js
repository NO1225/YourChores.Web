import React, { useContext } from 'react';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

import screens from '../GlobalConstants/Screens'
import AuthContext from '../Contexts/AuthContext'
import UserContext from '../Contexts/UserContext'

export default function Header() {
    const { signedIn, setSignedIn } = useContext(AuthContext);
    const { userInfo, setUserInfo } = useContext(UserContext)

    const signOut = async () => {
        await localStorage.removeItem("TOKEN");
        await localStorage.removeItem("USERID");
        setSignedIn(false);
        setUserInfo({});
    }

    return (
        <Navbar className="rtl" bg="light" expand="lg">
            <Link to={screens.HomeScreen}><Navbar.Brand>واجباتي</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav inline className="mr-2">
                    <Link className="navigation-link" to={screens.TimelineRouter}>الصفحة الرئيسية</Link>
                    <Link className="navigation-link" to={screens.RoomsRouter}>الغرف</Link>
                    <Link className="navigation-link" to={screens.SettingsRouter}>الاعدادات</Link>
                </Nav>
                <Nav className="mr-auto">
                    {signedIn ?
                        <Link className="navigation-link" to="#" >مرحبا {userInfo.userName}</Link>
                        : null
                    }
                    {signedIn ?
                        <Link className="navigation-link"  to="#" onClick={signOut} >تسجيل خروج</Link>
                        : null
                    }
                    {!signedIn ?
                        <Link className="navigation-link"  to={screens.SignInScreen} >تسجيل دخول</Link>
                        : null
                    }
                    {!signedIn ?
                        <Link className="navigation-link"  to={screens.SignUpScreen}>انشاء حساب</Link>
                        : null
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}