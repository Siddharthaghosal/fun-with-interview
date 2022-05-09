import React, { useReducer, useState } from 'react'
import { TODO_ACTIONS } from './actions'

const newTodo = (name: any) => { return { id: Date.now(), name, completed: false } }


const reducer = (todos: any, action: any) => {

    switch (action) {
        case TODO_ACTIONS.ADD:
            const adding = newTodo(action.payload.name)
            console.log(adding)
            return [...todos, adding];
        default:
            return todos
    }
}

export const Todos = () => {

    const [name, setName] = useState('')




    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch({ type: TODO_ACTIONS.ADD, payload: { name } })
        setName('')
    }


    const [todos, dispatch] = useReducer(reducer, [])

    return (

        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </form>
        </>
    )

}
