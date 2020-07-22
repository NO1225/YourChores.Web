import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { urgency } from '../GlobalConstants/Enums'

import { apiRoutes } from '../GlobalConstants/ApiRoutes'
import { authPost } from '../GlobalConstants/ApiCalls'

export default function CardComponent(props) {
    let { texts, buttons, id } = props;





    return (
        <div className="card-container">
            <div className="align-items-center">
                {texts.map((text, index) => (
                    <p className="m-1" key={`${text}${index}`}>{text}</p>
                ))}
            </div>
            <div className="d-flex align-items-center">
                {buttons.map((button) => (<div key={button.icon} className="m-2"><FontAwesomeIcon icon={button.icon} onClick={() => button.onPress(id)} /></div>))}
            </div>
        </div>
    )
}