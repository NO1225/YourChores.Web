import React, { useState, useEffect } from 'react';

import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import {  authGet } from '../../GlobalConstants/ApiCalls'

import ChoreComponent from '../../Components/ChoreComponent'

export default function TimelineScreen(props) {


    const [chores, setChores] = useState([])
   


    const getMyChores = async () => {
        var data = await authGet(apiRoutes.GetMyChores);

        if (data.success) {            
            setChores(data.response);            
        }
    }


    useEffect(() => {
        getMyChores()
        return () => {

        }
    }, [])
    

    return (
        <div>
           

            <div className="d-flex justify-content-between m-3">
                <div>
                    واجباتي
                </div>
               
            </div>
            {chores.map(chore =>
                <ChoreComponent key={chore.choreId} chore={chore} onUpdate={getMyChores} />
            )}
        </div>
    )
}