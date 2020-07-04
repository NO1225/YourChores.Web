import React, {useState} from 'react';
import Greating from './Greating'
import Counter from './Counter'

export default function Body(props){
    const [number, setNumber] = useState(2);
    const [number1, setNumber1] = useState(2);

    return(
        <body>
            <div>
                <Greating name={props.name}/>
                <Counter number={number} setNumber={setNumber}/>
                <Counter number={number1} setNumber={setNumber1}/>
                <Counter number={number} setNumber={setNumber}/>
                <Counter number={number1} setNumber={setNumber1}/>
            </div>
        </body>
    )
}