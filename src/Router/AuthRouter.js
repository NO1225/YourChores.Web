import React from 'react';

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import screens from '../GlobalConstants/Screens';

import SignInScreen from '../Screens/Auth/SignInScreen'
import SignUpScreen from '../Screens/Auth/SignUpScreen'

export default function AuthRouter() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={screens.SignInScreen}>
                    <SignInScreen />
                </Route>
                <Route path={screens.SignUpScreen}>
                    <SignUpScreen />
                </Route>
            </Switch>
        </div>

    )
}
