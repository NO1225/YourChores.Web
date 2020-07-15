import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import screens from '../../GlobalConstants/Screens'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { authPost, authGet } from '../../GlobalConstants/ApiCalls'

import RoomComponent from '../../Components/RoomComponent'

export default function RoomDetailsScreen(props) {
    let {roomId} = useParams();

    return (
        <div>
            <div>Room Details {roomId}</div>
        
        </div>
    )
}