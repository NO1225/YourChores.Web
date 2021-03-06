import React, {useContext} from 'react';

import {  Redirect } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import screens from '../GlobalConstants/Screens'
 


export default function AuthLayout(props) {
    const { signedIn } = useContext(AuthContext);

    if (signedIn) {
        return (
            <Redirect to={screens.TimelineRouter} />
        )
    }
    
    return (
        <div className="auth-container rtl">
            {props.children}
        </div>
    )
}