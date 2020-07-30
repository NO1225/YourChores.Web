import React, { useContext, useState, useEffect } from 'react';

import UserContext from '../../Contexts/UserContext'

import { apiRoutes } from '../../GlobalConstants/ApiRoutes';
import { authPost,  authGet } from '../../GlobalConstants/ApiCalls'

import SettingItemComponent from '../../Components/SettingItemComponent'
import SettingPasswordComponent from '../../Components/SettingPasswordComponent'

export default function SettingsScreen(props) {
    const { userInfo, setUserInfo } = useContext(UserContext);

    const getUserInfo = async () => {
        var data = await authGet(apiRoutes.GetMyInfo);

        if (data.success) {
            setUserInfo(data.response);
        }
    }

    const changeFirstName = async (value) => {
        var data = await authPost(apiRoutes.ChangeName, {
            firstname: value
        });

        if (data.success) {
            await getUserInfo();
        }
        else {
            console.log(data.errors);
        }

    }

    const changeLastName = async (value) => {
        var data = await authPost(apiRoutes.ChangeName, {
            lastname: value
        });

        if (data.success) {
            await getUserInfo();
        }
        else {
            console.log(data.errors);
        }

    }

    const ChangePassward = async (oldPassward, newPassward) => {
        var data = await authPost(apiRoutes.ChangePassward, {
            oldPassward, newPassward
        });

        if (data.success) {
            await getUserInfo();
        }
        else {
            console.log(data.errors);
        }

    }

    useEffect(() => {
        getUserInfo();
        return () => {
        }
    }, [apiRoutes.GetMyInfo])

    return (
        <div>
            <SettingItemComponent editable title="الاسم الاول:" value={userInfo.firstName} onSave={changeFirstName} />
            <SettingItemComponent editable title="الاسم الاخير:" value={userInfo.lastName} onSave={changeLastName} />
            <SettingItemComponent title="اسم المستخدم:" value={userInfo.userName} />
            <SettingItemComponent title="الايميل:" value={userInfo.email} />
            <SettingPasswordComponent editable title="كلمة المرور:" onSave={ChangePassward} />
        </div>
    )
}