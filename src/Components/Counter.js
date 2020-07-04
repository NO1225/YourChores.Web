import React, { useState } from 'react'

export default function Counter(props) {

    return (
        <div>
            <h1 onClick={()=>props.setNumber(props.number+1)}>+</h1>
            <h2>{props.number}</h2>
            <h1 onClick={()=>props.setNumber(props.number-1)}>-</h1>
        </div>

    )
}