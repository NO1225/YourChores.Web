import React, { useState, useEffect, useContext } from 'react';
import { useParams, redirect, Redirect } from 'react-router-dom'
import { Form } from 'react-bootstrap'


import screens from '../../GlobalConstants/Screens'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { choreState, papulateOptions } from '../../GlobalConstants/Enums'
import { authPost, authGet } from '../../GlobalConstants/ApiCalls'
import UserContext from '../../Contexts/UserContext'

import ChoreComponent from '../../Components/ChoreComponent'
import CreateChoreComponent from '../../Components/CreateChoreComponent'
import Modal from '../../Components/ModalComponent'
import LeavingRoomComponent from '../../Components/LeavingRoomComponent';

export default function RoomDetailsScreen(props) {
    let { roomId } = useParams();
    let { userInfo } = useContext(UserContext)

    const [redirect, setRedirect] = useState("");

    const [chores, setChores] = useState([])
    const [roomName, setRoomName] = useState("");
    const [allowChoreCreation, setAllowChoreCreation] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [choreCreationPopupVisible, setChoreCreationPopupVisible] = useState(false);

    const [leavingRoomPopupVisible, setLeavingRoomPopupVisible] = useState(false);
    const [showAlternative, setShowAlternative] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const [roomMembers, setRoomMembers] = useState([]);

    const [selectedChoreState, setSelectedChoreState] = useState(choreState.All);


    const getRoomDetails = async (choreStateFilter) => {
        var data = await authGet(apiRoutes.GetRoomById(roomId));

        if (data.success) {
            let choresResponse = data.response.chores;

            choresResponse.forEach(chore => {
                chore.roomId = roomId;
            });

            if (choreStateFilter == choreState.Done) {
                setChores(await data.response.chores.filter(chore => chore.done));
            }
            else if (choreStateFilter == choreState.Pending) {
                setChores(await data.response.chores.filter(chore => !chore.done));
            }
            else {
                setChores(data.response.chores);
            }

            setRoomName(data.response.roomName);
            setIsOwner(data.response.isOwner);
            var allow = false;

            if (data.response.isOwner) {
                allow = true;
            }
            else if (data.response.allowMembersToPost) {
                allow = true;
            }

            setAllowChoreCreation(allow);

            if (data.response.roomMembers) {
                setRoomMembers(data.response.roomMembers);
            }
            else {
                setRoomMembers([]);
            }
        }
    }

    const hundleChoreCreation = async () => {
        setChoreCreationPopupVisible(!choreCreationPopupVisible);
    }

    const hundleRoomCreationEnd = (value) => {
        if (true) {
            getRoomDetails(selectedChoreState);
        }
        hundleChoreCreation();
    }

    const redirectToRoomSettings = () => {
        setRedirect(screens.goToRoomSettings(roomId));
    }

    const hundleLeavingTheRoom = async () => {
        var owners = await roomMembers.filter(roomMember => roomMember.isOwner);
        var alone = owners.length == 1;

        if (isOwner == false) {
            setShowAlternative(false);
            setPopupMessage("هل انت متأكد من مغادرة الغرفة؟؟");
            setLeavingRoomPopupVisible(true);
        }
        else if (roomMembers.length == 1) {
            setShowAlternative(false);
            setPopupMessage("سيتم حذف الغرفة حال مغادرتك، هل انت متأكد من مغادرة الغرفة؟؟");
            setLeavingRoomPopupVisible(true);
        }
        else if (alone) {
            setShowAlternative(true);
            setPopupMessage("انت اخر مالك لهذه الغرفة، قم باختيار مالك بديل لادارة الغرفة بعد مغادرتك!");
            setLeavingRoomPopupVisible(true);
        }
        else {
            setShowAlternative(false);
            setPopupMessage("هل انت متأكد من مغادرة الغرفة؟؟");
            setLeavingRoomPopupVisible(true);
        }
    }

    const leaveRoom = async (alternativeId = null) => {
        console.log({
            roomId: roomId,
            alternativeId: alternativeId
        })

        var data = await authPost(apiRoutes.LeaveRoom, {
            roomId: parseInt(roomId),
            alternativeId: alternativeId
        })

        if (data.success) {
            setRedirect(screens.RoomsScreen);
        }
    }

    const hundleFilterChange = (e) => {
        setSelectedChoreState(e.target.value);
        getRoomDetails(e.target.value);
    }



    useEffect(() => {
        getRoomDetails(selectedChoreState)
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
            <Modal visible={leavingRoomPopupVisible}>
                <LeavingRoomComponent onFormEnd={() => setLeavingRoomPopupVisible(false)}
                    confirmationMessage={popupMessage}
                    alternativeIds={roomMembers}
                    currentUserId={userInfo.id}
                    showAlternative={showAlternative}
                    onConfirm={leaveRoom}
                />
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
                <div>
                    <button className="btn btn-light" onClick={hundleLeavingTheRoom} type="button" >مغادرة الغرفة</button>
                </div>
            </div>
            <div>
                <Form.Control as="select" value={selectedChoreState} onChange={hundleFilterChange}>
                    {papulateOptions(choreState).map(option =>
                        <option value={option.value} key={option.key}>{option.text}</option>
                    )}
                </Form.Control>
            </div>
            {chores.map(chore =>
                <ChoreComponent key={chore.choreId} chore={chore} onUpdate={() => getRoomDetails(selectedChoreState)} />
            )}
        </div>
    )
}