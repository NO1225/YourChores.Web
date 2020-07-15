import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'

import screens from '../../GlobalConstants/Screens'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { authPost, authGet } from '../../GlobalConstants/ApiCalls'

import RoomComponent from '../../Components/RoomComponent'

export default function RoomsScreen(props) {
    const [rooms, setRooms] = useState([])
    const [redirect,setRedirect] = useState("");


    const getMyRooms = async () => {
        var data = await authGet(apiRoutes.GetMyRooms);

        if (data.success) {
            setRooms(data.response);
        }
    }

    const goToRoom = (roomId)=>{
        console.log(roomId);
        setRedirect(screens.goToRoomDetails(roomId));
    }

    useEffect(() => {
        getMyRooms()
        return () => {

        }
    }, [])


    if(redirect)
    {
        return(
            <Redirect to={redirect}/>
        )
    }


    return (
        <div>
            <div>Rooms</div>
            {rooms.map(room => (
                <RoomComponent key={`${room.roomIs}`} room={room} onPress={goToRoom}/>
            ))}

        </div>
    )
}