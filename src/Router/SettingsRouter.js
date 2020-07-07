import React from 'react';

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import screens from '../GlobalConstants/Screens';

import SettingsScreen from '../Screens/Settings/SettingsScreen'

export default function SettingsRouter() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={screens.SettingsScreen}>
                    <SettingsScreen />
                </Route>
            </Switch>
        </div>

    )
}
