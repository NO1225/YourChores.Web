import React from 'react';

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import screens from '../GlobalConstants/Screens';

import TimelineScreen from '../Screens/Timeline/TimelineScreen'

export default function TimelineRouter() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={screens.TimelineScreen}>
                    <TimelineScreen />
                </Route>
            </Switch>
        </div>

    )
}
