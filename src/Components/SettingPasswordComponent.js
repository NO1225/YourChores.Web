import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function SettingPasswordComponent(props) {
    const [editing, setEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [currentPassward, setCurrentPassward] = useState("");
    const [newPassward, setNewPassward] = useState("");
    const [confirmPassward, setConfirmPassward] = useState("");

    const hundleEditing = () => {
        setCurrentPassward("");
        setNewPassward("");
        setConfirmPassward("");
        setErrorMessage("")

        setEditing(true);
    }

    const hundleCanceling = async () => {
        setEditing(false);
    }
    const hundleSaving = async () => {
        if (newPassward == confirmPassward) {
            await props.onSave(currentPassward, newPassward);
            setEditing(false);
        }
        else {
            setErrorMessage("تأكيد كلمة المرور لا يتطابق")
        }
    }


    if (editing) {
        return (
            <div>
                <div className="row">
                    <p className="setting-item-title">
                        {props.title}
                    </p>

                    <div className="control-container">
                        <p className="setting-item-title">
                            كلمة المرور الحالية
                    </p>
                        <Form.Control type="password" value={currentPassward} onChange={(e) => setCurrentPassward(e.target.value)} />
                    </div>
                    <div className="control-container">
                        <p className="setting-item-title">
                            كلمة المرور الجديدة
                    </p>
                        <Form.Control type="password" value={newPassward} onChange={(e) => setNewPassward(e.target.value)} />
                    </div>
                    <div className="control-container">
                        <p className="setting-item-title">
                            تأكيد المرور الجديدة
                    </p>
                        <Form.Control type="password" value={confirmPassward} onChange={(e) => setConfirmPassward(e.target.value)} />
                    </div>

                    <FontAwesomeIcon onClick={hundleSaving} className="setting-item-icon" icon={faCheck} />
                    <FontAwesomeIcon onClick={hundleCanceling} className="setting-item-icon" icon={faTimes} />
                </div>
                {errorMessage ?
                    <p className="error-message">
                        {errorMessage}
                    </p>
                    : null
                }
            </div>


        )
    }
    else
        return (
            <div className="row">
                <p className="setting-item-title">
                    {props.title}
                </p>
                <p className="setting-item-text">
                    ********
                </p>
                {props.editable ?

                    <FontAwesomeIcon onClick={hundleEditing} className="setting-item-icon" icon={faPencilAlt} />
                    : null}
            </div>
        )
}