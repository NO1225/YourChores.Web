import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { apiRoutes } from '../GlobalConstants/ApiRoutes'
import { authPost } from '../GlobalConstants/ApiCalls'
import { urgency, papulateOptions } from '../GlobalConstants/Enums'

export default function CreateChoreComponent(props) {
    let { onFormEnd, roomId } = props;

    const [errorMessage, setErrorMessage] = useState("");
    const [description, setDescription] = useState("");
    const [choreUregency, setChoreUregency] = useState(urgency.Low);


    const formEnd = (value) => {
        setErrorMessage("");
        setDescription("");
        setChoreUregency(urgency.Low);
        onFormEnd(!!value);
    }

    const createChore = async (event) => {
        event.preventDefault();

        var data = await authPost(apiRoutes.CreateChore, {
            "roomId": parseInt( roomId),
            "description": description,
            "urgency": parseInt(choreUregency)
        })

        if (data.success) {
            formEnd(true);
        }
        else {
            var errorstring = "";
            data.errors.map(error => errorstring = errorstring + error + '\n\r');

            setErrorMessage(errorstring);
        }

    }

    return (
        <Form onSubmit={createChore}>
            <Form.Text >
                {errorMessage}
            </Form.Text>
            <Form.Group>
                <Form.Label>تفاصيل الواجب</Form.Label>
                <Form.Control placeholder="تفاصيل الواجب" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>اهمية الواجب</Form.Label>
                <Form.Control as="select" value={choreUregency} onChange={(e)=>setChoreUregency(e.target.value)}>
                    {papulateOptions(urgency).map(option=>
                        <option value={option.value} key={option.key}>{option.text}</option>
                    )}
                </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-between m-3">
                <Button variant="secondary" type="button" onClick={onFormEnd}>
                    الغاء
                </Button>
                <Button variant="primary" type="submit">
                    عمل واجب جديد
                </Button>
            </div>

        </Form>
    )
}