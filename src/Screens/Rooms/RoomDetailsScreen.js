import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import screens from '../../GlobalConstants/Screens'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { authPost, authGet } from '../../GlobalConstants/ApiCalls'

import ChoreComponent from '../../Components/ChoreComponent'

export default function RoomDetailsScreen(props) {
    let {roomId} = useParams();

    const [chores, setChores] = useState([])
    const [roomName , setRoomName] = useState("");
    const getRoomDetails = async ()=>{
        var data = await authGet(apiRoutes.GetRoomById(roomId));

        if(data.success)
        {
            let choresResponse = data.response.chores;

            choresResponse.forEach(chore => {
                chore.roomId = roomId;
            });

            setChores(data.response.chores);
            setRoomName(data.response.roomName);
        }
    }

    useEffect(() => {
        getRoomDetails()
        return () => {
            
        }
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-between m-3">تفاصيل غرفة {roomName} </div>
            {chores.map(chore=>
                <ChoreComponent chore={chore} onUpdate={getRoomDetails} />
            )}
        </div>
    )
}