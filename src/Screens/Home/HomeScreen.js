import React from 'react';
import logoImage from '../../Assets/images/logo.png'

export default function HomeScreen(props)
{
    return (
        <div className="d-flex align-items-center p-3 landing-page-container">
            <img src={logoImage}/>
            <div>
                <h1>
                    واجباتك
                </h1>
                <p>
                    موقع لترتيب وجمع جميع الواجبات اليومية
                </p>
            </div>
        </div>
    )
}