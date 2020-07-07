import React from 'react';

import {
    Switch,
    Route,    
    useRouteMatch,
    useParams
} from "react-router-dom";

import screens from '../GlobalConstants/Screens'

import TimelineRouter from './TimelineRouter';
import RoomsRouter from './RoomsRouter';
import SettingsRouter from './SettingsRouter';

export default function MainRouter() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={screens.TimelineRouter}>
                    <TimelineRouter/>
                </Route>
                <Route path={screens.RoomsRouter}>
                    <RoomsRouter/>
                </Route>
                <Route path={screens.SettingsRouter}>
                    <SettingsRouter/>
                </Route>
            </Switch>
        </div>

    )
}
