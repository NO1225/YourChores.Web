import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'


export default function CollapsiblePanelComponent(props) {
    let { title, children } = props;
    const [collabsed, setCollabsed] = useState(true);

    return (

        <div>
            <div className="border rounded-top d-flex justify-content-between mt-3 mr-3 ml-3 mb-0 p-2 align-items-center" onClick={() => setCollabsed(!collabsed)}>
                <h3>{title}</h3>
                <FontAwesomeIcon icon={faSortDown} />
            </div>
            {collabsed ? null : (
                <div className="border rounded-bottom mt-0 mr-3 ml-3 mb-3 p-2">
                    {children}
                </div>
            )}

        </div>
    )
}