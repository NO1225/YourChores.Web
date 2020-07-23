import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { faArrowDown, faArrowUp, faTimes, faBan, faCheck } from '@fortawesome/free-solid-svg-icons'


import screens from '../../GlobalConstants/Screens'
import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { authPost, authGet } from '../../GlobalConstants/ApiCalls'
import { joinRequestType } from '../../GlobalConstants/Enums'

import ChoreComponent from '../../Components/ChoreComponent'
import CreateChoreComponent from '../../Components/CreateChoreComponent'
import Modal from '../../Components/ModalComponent'
import CollapsiblePanelComponent from '../../Components/CollapsiblePanelComponent';
import CardComponent from '../../Components/CardComponent';
import UserContext from '../../Contexts/UserContext';

export default function RoomDetailsScreen(props) {
    let { roomId } = useParams();

    const [roomName, setRoomName] = useState("");
    const [roomMembers, setRoomMembers] = useState([]);
    const [owners, setOwners] = useState([]);
    const [joinRequests, setJoinRequests] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [allowMembersToPost, setAllowMembersToPost] = useState(false);

    const { userInfo } = useContext(UserContext);

    const [collabsed, setCollabsed] = useState(true);

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

    const demoteAdmin = async (userId) => {
        console.log(userId);
    }

    const promoteMember = async (userId) => {
        console.log(userId);
    }

    const kickMember = async (userId) => {
        console.log(userId);
    }

    const acceptRequest = async (requestId) => {
        console.log(requestId);
    }

    const cancelRequest = async (requestId) => {
        console.log(requestId);
    }

    const declineRequest = async (requestId) => {
        console.log(requestId);
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
                    <Form.Check label="السماح للاعضاء بالنشر" defaultChecked={allowMembersToPost} onChange={(e) => changeAllowMemberToPost(e.target.checked)} />
                </Form.Group>
            </div>

            <CollapsiblePanelComponent title="المالكين">
                {owners.map(
                    member => {
                        var buttons = [];
                        buttons.push({
                            icon: faArrowDown,
                            onPress: demoteAdmin
                        })

                        if (member.userId != userInfo.id) {
                            buttons.push({
                                icon: faBan,
                                onPress: kickMember
                            })
                        }


                        return (
                            <CardComponent id={member.userId} texts={[`${member.firstName} ${member.lastName}`]} buttons={buttons} />
                        )
                    }
                )}
            </CollapsiblePanelComponent>

            <CollapsiblePanelComponent title="الاعضاء">
                {roomMembers.map(
                    member => {
                        var buttons = [];

                        buttons.push({
                            icon: faArrowUp,
                            onPress: promoteMember
                        })

                        buttons.push({
                            icon: faBan,
                            onPress: kickMember
                        })
                        return (
                            <CardComponent id={member.userId} texts={[`${member.firstName} ${member.lastName}`]} buttons={buttons} />
                        )
                    }
                )}
            </CollapsiblePanelComponent>

            <CollapsiblePanelComponent title="دعوات الانضمام">
                {joinRequests.map(
                    item => {
                        var buttons = [];

                        buttons.push({
                            icon: faCheck,
                            onPress: acceptRequest
                        })

                        buttons.push({
                            icon: faTimes,
                            onPress: declineRequest
                        })
                        return (
                            <CardComponent id={item.joinRequestId} texts={[`${item.firstName} ${item.lastName}`]} buttons={buttons} />
                        )
                    }
                )}
            </CollapsiblePanelComponent>

            <CollapsiblePanelComponent title="الدعوات المرسلة">
                {invitations.map(
                    item => {
                        var buttons = [];

                        buttons.push({
                            icon: faTimes,
                            onPress: cancelRequest
                        })
                        return (
                            <CardComponent id={item.joinRequestId} texts={[`${item.firstName} ${item.lastName}`]} buttons={buttons} />
                        )
                    }
                )}
            </CollapsiblePanelComponent>





        </div>
    )
}