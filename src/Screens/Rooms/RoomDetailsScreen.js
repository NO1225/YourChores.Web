import React, { useState, useEffect } from 'react';
import { useParams, redirect, Redirect } from 'react-router-dom'

import screens from '../../GlobalConstants/Screens'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { authPost, authGet } from '../../GlobalConstants/ApiCalls'

import ChoreComponent from '../../Components/ChoreComponent'
import CreateChoreComponent from '../../Components/CreateChoreComponent'
import Modal from '../../Components/ModalComponent'

export default function RoomDetailsScreen(props) {
    let { roomId } = useParams();

    const [redirect, setRedirect] = useState("");

    const [chores, setChores] = useState([])
    const [roomName, setRoomName] = useState("");
    const [allowChoreCreation, setAllowChoreCreation] = useState(false);
    const [isOwner, setIsOwener] = useState(false);
    const [choreCreationPopupVisible, setChoreCreationPopupVisible] = useState(false);


    const getRoomDetails = async () => {
        var data = await authGet(apiRoutes.GetRoomById(roomId));

        if (data.success) {
            let choresResponse = data.response.chores;

            choresResponse.forEach(chore => {
                chore.roomId = roomId;
            });

            setChores(data.response.chores);
            setRoomName(data.response.roomName);
            setIsOwener(data.response.isOwner);
            var allow = false;

            if (data.response.isOwner) {
                allow = true;
            }
            else if (data.response.allowMembersToPost) {
                allow = true;
            }

            setAllowChoreCreation(allow);
        }
    }

    const hundleChoreCreation = async () => {
        setChoreCreationPopupVisible(!choreCreationPopupVisible);
    }

    const hundleRoomCreationEnd = (value) => {
        if (true) {
            getRoomDetails();
        }
        hundleChoreCreation();
    }

    const redirectToRoomSettings = () => {
        setRedirect(screens.goToRoomSettings(roomId));

    }



    useEffect(() => {
        getRoomDetails()
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
            <Modal visible={choreCreationPopupVisible}>
                <CreateChoreComponent roomId={roomId} onFormEnd={hundleRoomCreationEnd} />
            </Modal>

            <div className="d-flex justify-content-between m-3">
                <div>
                    تفاصيل غرفة {roomName}
                </div>
                {allowChoreCreation ?
                    <div>
                        <button className="btn btn-light" onClick={hundleChoreCreation} type="button" >عمل واجب جديد</button>
                    </div>
                    : null}
                {isOwner ?
                    <div>
                        <button className="btn btn-light" onClick={redirectToRoomSettings} type="button" >اعدادات الغرفة</button>
                    </div>
                    : null}
            </div>
            {chores.map(chore =>
                <ChoreComponent chore={chore} onUpdate={getRoomDetails} />
            )}
        </div>
    )
}