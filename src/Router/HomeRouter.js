import React from 'react';

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

export default function HomeRouter() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:profileId`}>
                    <Profile />
                </Route>
            </Switch>
        </div>

    )
}

function Profile() {
    let { profileId } = useParams();

    return (
        <h1>{profileId}</h1>
    )
}