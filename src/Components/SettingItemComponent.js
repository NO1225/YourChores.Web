import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function SettingItemComponent(props) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(props.value);

    const hundleEditing = () => {
        setEditing(true);
    }

    const hundleCanceling = async () => {
        setValue(props.value);
        setEditing(false);

    }
    const hundleSaving = async () => {
        await props.onSave(value);

        setEditing(false);
    }


    if (editing) {
        return (
            <div className="row">
                <p className="setting-item-title">
                    {props.title}
                </p>
                <div className="control-container">
                    <p className="setting-item-text">
                        {props.value}
                    </p>

                    <Form.Control placeholder={props.value} value={value} onChange={(e) => setValue(e.target.value)} />
                </div>


                <FontAwesomeIcon onClick={hundleSaving} className="setting-item-icon" icon={faCheck} />
                <FontAwesomeIcon onClick={hundleCanceling} className="setting-item-icon" icon={faTimes} />
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
                    {props.value}
                </p>
                {props.editable ?

                    <FontAwesomeIcon onClick={hundleEditing} className="setting-item-icon" icon={faPencilAlt} />
                    : null}
            </div>
        )
}