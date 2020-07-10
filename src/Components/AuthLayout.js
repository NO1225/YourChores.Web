import React from 'react';

import Router from '../Router/Router'

export default function AuthLayout(props) {
    return (
        <div className="auth-container rtl">
            {props.children}
        </div>
    )
}