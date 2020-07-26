import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'
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

    const demoteAdminAlert = async (userId) => {
        if (userId == userInfo.id) {
            if (window.confirm('هل انت متأكد من ازالة نفسك من المالكين؟؟ ')) {
                await demoteAdmin(userId);
            }
        }
        else {
            demoteAdmin(userId);
        }
    }

    const demoteAdmin = async (userId) => {
        var data = await authPost(apiRoutes.DemoteOwner, {
            "roomId": parseInt(roomId),
            "userId": userId
        });

        if (data.success) {
            getRoomDetails();
        }
    }

    const promoteMember = async (userId) => {
        var data = await authPost(apiRoutes.PromoteMember, {
            "roomId": parseInt(roomId),
            "userId": userId
        });

        if (data.success) {
            getRoomDetails();
        }
    }

    const kickMemberAlert = async (userId) => {
        if (window.confirm("هل انت متأكد من طرد العضو؟؟")) {
            await kickMember(userId);
        }
    }

    const kickMember = async (userId) => {
        var data = await authPost(apiRoutes.KickMember, {
            "roomId": parseInt(roomId),
            "userId": userId
        });

        if (data.success) {
            getRoomDetails();
        }
    }

    const acceptRequest = async (requestId) => {
        var data = await authPost(apiRoutes.AcceptRequest, {
            "roomId": parseInt(roomId),
            "joinRequestId": requestId
        });

        if (data.success) {
            getRoomDetails();
        }
    }

    const cancelInvitation = async (requestId) => {
        var data = await authPost(apiRoutes.CancelInvitaion, {
            "roomId": parseInt(roomId),
            "joinRequestId": requestId
        });

        if (data.success) {
            getRoomDetails();
        }
    }

    const declineRequestAlert = async (requestId) => {
        if (window.confirm("هل انت  متأكد من رفضك للعضو؟؟؟")) {
            await declineRequest(requestId);
        }
    }

    const declineRequest = async (requestId) => {
        var data = await authPost(apiRoutes.DeclineRequest, {
            "roomId": parseInt(roomId),
            "joinRequestId": requestId
        });

        if (data.success) {
            getRoomDetails();
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
                <div>
                    <Link className="btn btn-light" to={screens.goToFindMember(roomId)} >البحث عن عضو</Link>
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
                            onPress: demoteAdminAlert
                        })

                        if (member.userId != userInfo.id) {
                            buttons.push({
                                icon: faBan,
                                onPress: kickMemberAlert
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
                            onPress: kickMemberAlert
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
                            onPress: declineRequestAlert
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
                            onPress: cancelInvitation
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