import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

import { apiRoutes } from '../GlobalConstants/ApiRoutes'
import { authPost } from '../GlobalConstants/ApiCalls'

export default function CreateRoomComponent(props) {
    let { onFormEnd } = props;

    const [errorMessage, setErrorMessage] = useState("");
    const [roomName, setRoomName] = useState("");
    const [allowMembersToPost, setAllowMembersToPost] = useState(false);
    

    const formEnd = (value) => {
        setErrorMessage("");
        setRoomName("");
        setAllowMembersToPost(false);
        onFormEnd(!!value);
    }

    const createRoom = async (event) => {
        event.preventDefault();

        var data = await authPost(apiRoutes.CreateRoom, {
            roomName,
            allowMembersToPost
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
        <Form onSubmit={createRoom}>
            <Form.Text >
                {errorMessage}
            </Form.Text>
            <Form.Group>
                <Form.Label>اسم الغرفة</Form.Label>
                <Form.Control placeholder="اسم الغرف" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            </Form.Group>

            <Form.Group className="ltr d-flex justify-content-around">
                <Form.Check label="السماح للاعضاء بالنشر" value={allowMembersToPost} onChange={(e) => setAllowMembersToPost(e.target.value)} />
            </Form.Group>

            <div className="d-flex justify-content-between m-3">
                <Button variant="secondary" type="button" onClick={onFormEnd}>
                    الغاء
                </Button>
                <Button variant="primary" type="submit">
                    عمل غرفة جديدة
                </Button>
            </div>

        </Form>
    )
}