import React, { useContext, useState, useEffect } from 'react';

import UserContext from '../../Contexts/UserContext'

import { apiRoutes } from '../../GlobalConstants/ApiRoutes';
import { authGet } from '../../GlobalConstants/ApiCalls'

import SettingItemComponent from '../../Components/SettingItemComponent'

export default function SettingsScreen(props) {
    const { userInfo, setUserInfo } = useContext(UserContext);

    const getUserInfo = async () => {
        var data = await authGet(apiRoutes.GetMyInfo);

        if (data.success) {
            setUserInfo(data.response);
        }
    }

    const changeFirstName = async (value)=>{
        console.log(value);
    }

    useEffect(() => {
        getUserInfo();
        return () => {
        }
    }, [apiRoutes.GetMyInfo])

    return (
        <div>
            <SettingItemComponent editable title="الاسم الاول:" value={userInfo.firstName} onSave={changeFirstName}/>
            <SettingItemComponent editable title="الاسم الاخير:" value={userInfo.lastName}/>
            <SettingItemComponent title="اسم المستخدم:" value={userInfo.userName}/>
            <SettingItemComponent title="الايميل:" value={userInfo.email}/>
        </div>
    )
}