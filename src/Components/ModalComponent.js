import React, { useState } from 'react';

export default function ModalComponent(props) {
    let { children, visible } = props;


    if (!visible)
        return null;
    return (
        <div className="pop-up d-flex align-items-center">
            <div className="pop-up-content">
                {children}
            </div>
        </div>
    )
}