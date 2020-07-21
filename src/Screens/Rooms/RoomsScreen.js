import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

import screens from '../../GlobalConstants/Screens'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { authGet } from '../../GlobalConstants/ApiCalls'

import RoomComponent from '../../Components/RoomComponent'
import CreateRoomComponent from '../../Components/CreateRoomComponent'
import Modal from '../../Components/ModalComponent'

export default function RoomsScreen(props) {
    const [rooms, setRooms] = useState([])
    const [redirect, setRedirect] = useState("");
    const [roomCreationPopupVisible, setRoomCreationPopupVisible] = useState(false);
    

    const getMyRooms = async () => {
        var data = await authGet(apiRoutes.GetMyRooms);

        if (data.success) {
            setRooms(data.response);
        }
    }

    const goToRoom = (roomId) => {
        console.log(roomId);
        setRedirect(screens.goToRoomDetails(roomId));
    }

    const hundleRoomCreationPopUp = () => {
        setRoomCreationPopupVisible(!roomCreationPopupVisible);
    }

    const hundleRoomCreationEnd = (value)=>{
        if(true)
        {
            getMyRooms();
        }
        hundleRoomCreationPopUp();
    }

    useEffect(() => {
        getMyRooms()
        return () => {

        }
    }, [])


    if (redirect) {
        return (
            <Redirect to={redirect} />
        )
    }


    return (
        <div>

            <Modal visible={roomCreationPopupVisible}>
                <CreateRoomComponent onFormEnd={hundleRoomCreationEnd}/>
            </Modal>

            <div className="d-flex justify-content-between m-3">
                <div>
                    الغرف
                </div>
                <div>
                    <button className="btn btn-light" onClick={hundleRoomCreationPopUp} type="button" >عمل غرفة جديدة</button>
                </div>
            </div>
            {rooms.map(room => (
                <RoomComponent key={`${room.roomId}`} room={room} onPress={goToRoom} />
            ))}

        </div>
    )
}