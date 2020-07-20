import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'

import screens from '../../GlobalConstants/Screens'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { authPost, authGet } from '../../GlobalConstants/ApiCalls'
import { joinRequestType } from '../../GlobalConstants/Enums'

import ChoreComponent from '../../Components/ChoreComponent'
import CreateChoreComponent from '../../Components/CreateChoreComponent'
import Modal from '../../Components/ModalComponent'

export default function RoomDetailsScreen(props) {
    let { roomId } = useParams();

    const [roomName, setRoomName] = useState("");
    const [roomMembers, setRoomMembers] = useState([]);
    const [owners, setOwners] = useState([]);
    const [joinRequests, setJoinRequests] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [allowMembersToPost, setAllowMembersToPost] = useState(false);


    const getRoomDetails = async () => {
        var data = await authGet(apiRoutes.GetRoomById(roomId));

        if (data.success) {
            let choresResponse = data.response.chores;

            choresResponse.forEach(chore => {
                chore.roomId = roomId;
            });

            setRoomMembers(await data.response.roomMembers.filter(member => !member.isOwner));
            setOwners(await data.response.roomMembers.filter(member => member.isOwner));

            setJoinRequests(await data.response.joinRequests.filter(request => request.joinRequestType == joinRequestType.Join))
            setInvitations(await data.response.joinRequests.filter(request => request.joinRequestType == joinRequestType.Invite))

            setRoomName(data.response.roomName);
            setAllowMembersToPost(data.response.allowMembersToPost)

        }
    }

    const changeAllowMemberToPost = async (allow) => {

        var data = await authPost(apiRoutes.UpdateRoom, {
            "roomId": parseInt(roomId),
            "allowMembersToPost": allow
        });

        if (data.success) {
            setAllowMembersToPost(allow);
        }
    }

    useEffect(() => {
        getRoomDetails()
        return () => {

        }
    }, [])

    return (
        <div>

            <div className="d-flex justify-content-between m-3">
                <div>
                    اعدادات غرفة {roomName}
                </div>
                <Form.Group className="ltr d-flex justify-content-around">
                    <Form.Check label="السماح للاعضاء بالنشر" checked={allowMembersToPost} onChange={(e) => changeAllowMemberToPost(e.target.checked)} />
                </Form.Group>
            </div>

            {roomMembers.map(
                member => (
                    <p>{member.firstName} {member.lastName}</p>
                )
            )}
        </div>
    )
}