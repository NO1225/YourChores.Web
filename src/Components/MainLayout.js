import React, {useContext} from 'react';

import {  Redirect } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import screens from '../GlobalConstants/Screens'
 


export default function MainLayout(props) {
    const { signedIn } = useContext(AuthContext);

    if (signedIn == false) {
        return (
            <Redirect to={screens.SignInScreen} />
        )
    }
    
    return (
        <div className="container rtl">
            {props.children}
        </div>
    )
}