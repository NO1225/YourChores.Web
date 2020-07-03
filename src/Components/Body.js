import React from 'react';
import Greating from './Greating'

export default function Body(props){
    return(
        <body>
            <div>
                <Greating name={props.name}/>
            </div>
        </body>
    )
}