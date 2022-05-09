import React, { useReducer, useState } from 'react'
import { COUNT_ACTIONS } from './actions'

export const CountX = () => {

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case COUNT_ACTIONS.INCREMENT:
                return { count: state.count + 1 }

            case COUNT_ACTIONS.DECREMENT:
                return { count: state.count - 1 }


            default:
                return state


        }

    }
    const [state, dispatch] = useReducer(reducer, { count: 0 })
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            {state.count}
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    )
}
