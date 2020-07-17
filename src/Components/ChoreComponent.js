import React, { useState } from 'react';

import {urgency} from '../GlobalConstants/Enums'

export default function SettingItemComponent(props) {
    let { chore } = props;

    const getClassName = ()=>{
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

    const hundleClicking=()=>{
        props.onPress(chore.choreId);
    }

    return (
        <div onClick={hundleClicking} className="chore-container">
            <div>
                <div>{chore.description}</div>
                {chore.roomName?
                <div>{chore.roomName}</div>
                :null}
            </div>
            <div className="d-flex align-items-center">
                <input type="checkbox" value={chore.done} onClick={()=>{}}/>
            </div>
            <div className={getClassName()}></div>
        </div>
    )
}