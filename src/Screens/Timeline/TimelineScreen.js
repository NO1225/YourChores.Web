import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { apiRoutes } from '../../GlobalConstants/ApiRoutes'
import { sortBy, papulateOptions } from '../../GlobalConstants/Enums'
import { authGet } from '../../GlobalConstants/ApiCalls'

import ChoreComponent from '../../Components/ChoreComponent'

export default function TimelineScreen(props) {


    const [chores, setChores] = useState([])
    const [selectedSortBy, setSelectedSortBy] = useState(sortBy.MostRecent);


    const getMyChores = async (sortingCritirea) => {
        var data = await authGet(apiRoutes.GetMyChores);

        if (data.success) {
            if (sortingCritirea == sortBy.MostRecent) {

                setChores(await data.response
                    .sort(function (a, b) {
                        a = new Date(a.createdOn);
                        b = new Date(b.createdOn);
                        return a > b ? -1 : a < b ? 1 : 0;
                    }));
            }
            else if (sortingCritirea == sortBy.Urgency) {
                setChores(await data.response
                    .sort(function (a, b) {
                        a = a.urgency;
                        b = b.urgency;
                        return a > b ? -1 : a < b ? 1 : 0;
                    }));
            }
            else {
                setChores(data.response);
            }

        }
    }

    const hundleSortChange = (e) => {
        setSelectedSortBy(e.target.value);
        getMyChores(e.target.value);
    }


    useEffect(() => {
        getMyChores(selectedSortBy)
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
            <div>
                <Form.Control as="select" value={selectedSortBy} onChange={hundleSortChange}>
                    {papulateOptions(sortBy).map(option =>
                        <option value={option.value} key={option.key}>{option.text}</option>
                    )}
                </Form.Control>
            </div>
            {chores.map(chore =>
                <ChoreComponent key={chore.choreId} chore={chore} onUpdate={() => getMyChores(selectedSortBy)} />
            )}
        </div>
    )
}