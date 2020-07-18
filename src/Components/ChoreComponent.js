import React, { useState } from 'react';

import { urgency } from '../GlobalConstants/Enums'

import { apiRoutes } from '../GlobalConstants/ApiRoutes'
import { authPost } from '../GlobalConstants/ApiCalls'

export default function SettingItemComponent(props) {
    let { chore } = props;

    const getClassName = () => {
        switch (chore.urgency) {
            case urgency.Low:
                return "right-banner low-urgency"
                break;
            case urgency.Medium:
                return "right-banner medium-urgency"
                break;
            case urgency.High:
                return "right-banner high-urgency"
                break;

            default:
                return "right-banner low-urgency"
                break;
        }
    }

    const hundleClicking = async (e) => {
        e.preventDefault();
        if(props.chore.done)
        {
            return;
        }
        var data = await authPost(apiRoutes.UpdateChore, {
            "choreId": props.chore.choreId,
            "roomId": parseInt(props.chore.roomId)
        })
        console.log(data);

        if (data.success) {
            props.onUpdate();
        }
    }

    return (
        <div className="chore-container">
            <div>
                <div>{chore.description}</div>
                {chore.roomName ?
                    <div>{chore.roomName}</div>
                    : null}
            </div>
            <div className="d-flex align-items-center">
                <input type="checkbox" checked={chore.done} onClick={hundleClicking} />
            </div>
            <div className={getClassName()}></div>
        </div>
    )
}