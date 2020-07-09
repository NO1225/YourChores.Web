import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap'

import { post } from '../../GlobalConstants/ApiCalls'

import { apiRoutes } from '../../GlobalConstants/ApiRoutes'

export default function SignUpScreen(props) {
    const [errorMessage, setErrorMessage] = useState("");

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [passward, setPassward] = useState("");
    const [confirmPassward, setConfirmPassward] = useState("");

    const hundleFormSubmission = async (event) => {
        event.preventDefault();

        if(passward != confirmPassward)
        {
            setErrorMessage("كلمة السر لا تطابق التأكيد");
            return;
        }

        var data = await post(apiRoutes.SignUp, {
            userName,
            email,
            passward
        });


        if (data.errors) {
            var errorstring = "";
            data.errors.map(error => errorstring = errorstring + error + '\n\r');

            setErrorMessage(errorstring);
        }

        console.log(data);
    }

    return (
        <Form onSubmit={hundleFormSubmission}>
            <Form.Text >
                {errorMessage}
            </Form.Text>
            <Form.Group controlId="userName">
                <Form.Label>اسم المستخدم</Form.Label>
                <Form.Control placeholder="اسم المستخدم" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>البريد الالكتروني</Form.Label>
                <Form.Control type="email" placeholder="البريد الالكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="passward">
                <Form.Label>كلمة المرور</Form.Label>
                <Form.Control type="password" placeholder="كلمة المرور" value={passward} onChange={(e) => setPassward(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="confirmPassward">
                <Form.Label>تأكيد كلمة المرور</Form.Label>
                <Form.Control type="password" placeholder="كلمة المرور" value={confirmPassward} onChange={(e) => setConfirmPassward(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
                انشاء الحساب
            </Button>
        </Form>
    )
}