import React, { useState, useContext } from 'react';

import { Form, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

import { post } from '../../GlobalConstants/ApiCalls'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import screens from '../../GlobalConstants/Screens'
import AuthContext from '../../Contexts/AuthContext'

export default function SignInScreen(props) {
    const [redirect,setRedirect] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [userNameOrEmail, setUserNameOrEmail] = useState("");
    const [passward, setPassward] = useState("");

    const {setSignedIn} = useContext(AuthContext);
    const hundleFormSubmission = async (event) => {
        event.preventDefault();

        var data = await post(apiRoutes.SignIn, {
            userNameOrEmail,
            passward
        });


        if (data.errors) {
            var errorstring = "";
            data.errors.map(error => errorstring = errorstring + error + '\n\r');

            setErrorMessage(errorstring);
        }
        else{
            localStorage.setItem("TOKEN",data.response.token);
            localStorage.setItem("USERID",data.response.userId);
            setSignedIn(true);
            setRedirect(screens.TimelineRouter);
        }
        

        console.log(data);
    }


    if(redirect)
    {
        return(
            <Redirect to={redirect}/>
        )
    }

    return (
        <Form onSubmit={hundleFormSubmission}>
            <Form.Text >
                {errorMessage}
            </Form.Text>
            <Form.Group controlId="userNameOrEmail">
                <Form.Label>اسم المستخدم</Form.Label>
                <Form.Control placeholder="اسم المستخدم" value={userNameOrEmail} onChange={(e) => setUserNameOrEmail(e.target.value)} />
            </Form.Group>

       

            <Form.Group controlId="passward">
                <Form.Label>كلمة المرور</Form.Label>
                <Form.Control type="password" placeholder="كلمة المرور" value={passward} onChange={(e) => setPassward(e.target.value)} />
            </Form.Group>


            <Button variant="primary" type="submit">
                تسجيل دخول
            </Button>

            <Link to={screens.SignUpScreen} className="navigation-link" >مستخدم جديد؟؟ قم بانشاء حسابك!</Link>
        </Form>
    )
}