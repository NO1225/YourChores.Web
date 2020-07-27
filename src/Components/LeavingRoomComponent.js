import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { apiRoutes } from '../GlobalConstants/ApiRoutes'
import { authPost } from '../GlobalConstants/ApiCalls'
import { urgency, papulateOptions } from '../GlobalConstants/Enums'

export default function LeavingRoomComponent(props) {
    let { onFormEnd, confirmationMessage, alternativeIds, currentUserId, onConfirm, showAlternative } = props;

    const [selectedAlternativeId, setSelectedAlternativeId] = useState("");

    const papulateAlternativeId = () => {
        var options = [];
        alternativeIds.map(user => {
            if (user.userId != currentUserId) {
                options.push({
                    value: user.userId,
                    key: user.userId,
                    text: `${user.firstName} ${user.lastName}`
                })
            }
        })

        return options;
    }


    const formEnd = (value) => {

        setSelectedAlternativeId("");
        onFormEnd(!!value);
    }

    const submitForm = async (event) => {
        event.preventDefault();

        await onConfirm(selectedAlternativeId);

    }

    return (
        <Form onSubmit={submitForm}>
            <Form.Text >
                {confirmationMessage}
            </Form.Text>

            {showAlternative ? (
                <Form.Group>
                    <Form.Label>المالك البديل</Form.Label>
                    <Form.Control as="select" value={selectedAlternativeId} onChange={(e) => setSelectedAlternativeId(e.target.value)}>
                        <option value={''} >اختار المالك البديل</option>
                        {papulateAlternativeId().map(option =>
                            <option value={option.value} key={option.key}>{option.text}</option>
                        )}
                    </Form.Control>
                </Form.Group>
            ) : null}


            <div className="d-flex justify-content-between m-3">
                <Button variant="secondary" type="button" onClick={formEnd}>
                    الغاء
                </Button>
                <Button variant="primary" type="submit">
                    تأكيد
                </Button>
            </div>

        </Form>
    )
}