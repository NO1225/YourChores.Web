import React from 'react';

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import screens from '../GlobalConstants/Screens';

import RoomsScreen from '../Screens/Rooms/RoomsScreen'

export default function RoomsRouter() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={screens.RoomsScreen}>
                    <RoomsScreen />
                </Route>
            </Switch>
        </div>

    )
}
