import React from 'react';

import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import HomeRouter from './HomeRouter'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <div>root</div>
                </Route>
                <Route path="/home">
                    <HomeRouter/>
                </Route>

            </Switch>
        </BrowserRouter>
    )
}