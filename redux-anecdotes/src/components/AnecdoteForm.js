import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        let content = {}
        content.content = event.target.anecdote.value
        content.votes = 0
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(content.content, 1))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm