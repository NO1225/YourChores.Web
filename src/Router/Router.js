import React from 'react';

import {  Switch, Route } from "react-router-dom";

import screens from '../GlobalConstants/Screens'

import MainRouter from './MainRouter';
import AuthRouter from './AuthRouter';
import HomeRouter from './HomeRouter'

export default function Router(props) {
    return (
        <Switch>
            <Route path={screens.HomeScreen} exact>
                <HomeRouter />
            </Route>
            <Route path={screens.MainRouter}>
                <MainRouter />
            </Route>
            <Route path={screens.AuthRouter}>
                <AuthRouter />
            </Route>

        </Switch>
    )
}