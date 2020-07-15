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
import RoomDetailsScreen from '../Screens/Rooms/RoomDetailsScreen'

export default function RoomsRouter() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={screens.RoomsScreen} exact>
                    <RoomsScreen />
                </Route>
                <Route path={screens.RoomDetails}>
                    <RoomDetailsScreen />
                </Route>
            </Switch>
        </div>

    )
}
