import React, { useState } from 'react';

import {urgency} from '../GlobalConstants/Enums'

export default function SettingItemComponent(props) {
    let { room } = props;

    const getClassName = ()=>{
        switch (room.highestUrgency) {
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
        props.onPress(room.roomId);
    }

    return (
        <div onClick={hundleClicking} className="room-container">
            <div>
                <div>{room.roomName}</div>
                <div>
                    عدد الواجبات الغير منجزة: {room.numberOfPendingChores}
                </div>
            </div>
            <div className={getClassName()}></div>
        </div>
    )
}