import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_VOTES':
			{
				let voted = state.find(anecdote => anecdote.id === action.data.id)
				voted.votes = voted.votes + 1
				let newState = state.map(anecdote => (anecdote.id === voted.id) ? voted : anecdote).sort((a, b) => b.votes - a.votes)
				return state = newState
			}
		case 'NEW_ANECDOTE':
			{
				let newState = state.concat(action.data).sort((a, b) => b.votes - a.votes)
				return newState
			}
		case 'INIT_NOTES':
			return action.data
		default: return state
	}
}

export const addVote = (id) => {
	return async dispatch => {
		const votedAnecdote = await anecdotesService.vote(id)
		dispatch({
			type: 'SET_VOTES',
			data: { id: votedAnecdote.id, votes: votedAnecdote.votes }
		})
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdotesService.createNew(content)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote,
		})
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const notes = await anecdotesService.getAll()
		dispatch({
			type: 'INIT_NOTES',
			data: notes,
		})
	}
}

export default reducer