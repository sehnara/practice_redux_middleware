import React from 'react'

function Counter({number, onIncrease, onDecrease}) {

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onDecrease}>-</button>
            <button onClick={onIncrease}>+</button>
        </div>
    )
}

export default Counter
