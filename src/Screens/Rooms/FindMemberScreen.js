import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { faArrowDown, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons'


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

export default function FindMemberScreen(props) {
    let { roomId } = useParams();

    const [searchQuery, setSearchQuery] = useState('');

    const [users, setUsers] = useState([]);

    const searchForMembers = async () => {
        var data = await authPost(apiRoutes.FindMember, {
            roomId: parseInt(roomId),
            userName: searchQuery
        });

        if (data.success) {
            setUsers(data.response);
        }
    }

    const inviteMember = async (userId)=>{
        var data = await authPost(apiRoutes.Invite,{
            roomId: parseInt(roomId),
            userId: userId
        })

        if(data.success)
        {
            searchForMembers();
        }
    }

    return (
        <div>

            <div className="d-flex justify-content-between m-3">
                <div>
                    البحث عن اعضاء
                </div>

            </div>
            <Form.Group controlId="userNameOrEmail">
                <div className="d-flex justify-content-between m-3">
                    <Form.Control placeholder="اسم العضو" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className="btn btn-light" type="button" onClick={searchForMembers} >بحث</button>
                </div>
            </Form.Group>

            {users.map(
                user => {
                    var buttons = [];

                    if (!user.isMember) {
                        if (user.isRequestingJoin) {
                            buttons.push({
                                icon: faCheck,
                                onPress: inviteMember
                            })
                        }
                        else if(user.isInvited){

                        }
                        else {
                            buttons.push({
                                icon: faEnvelope,
                                onPress: inviteMember
                            })
                        }
                    }

                    return (
                        <CardComponent id={user.userId} texts={[`${user.firstName} ${user.lastName}`, `${user.userName}`]} buttons={buttons} />
                    )
                }
            )}






        </div>
    )
}