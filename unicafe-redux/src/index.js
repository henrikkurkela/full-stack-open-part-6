import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Button = ({ action, text }) => {
	return (
		<button onClick={action}>{text}</button>
	)
}

const StatisticsLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = () => {
	const all = () => {
		return ((store.getState().good + store.getState().ok + store.getState().bad))
	}
	const average = () => {
		return ((store.getState().good - store.getState().bad) / all())
	}
	const positive = () => {
		return (store.getState().good * 100 / all())
	}

	return (

		<div>
			<h2>Statistics</h2>
			<table>
				<tbody>
					<StatisticsLine text='good' value={store.getState().good} />
					<StatisticsLine text='neutral' value={store.getState().ok} />
					<StatisticsLine text='bad' value={store.getState().bad} />
					<StatisticsLine text='all' value={all()} />
					<StatisticsLine text='average' value={average()} />
					<StatisticsLine text='positive' value={positive().toString().concat(' %')} />
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
	const good = () => {
		store.dispatch({
			type: 'GOOD'
		})
	}
	const bad = () => {
		store.dispatch({
			type: 'BAD'
		})
	}
	const neutral = () => {
		store.dispatch({
			type: 'OK'
		})
	}
	const zero = () => {
		store.dispatch({
			type: 'ZERO'
		})
	}

	const all = () => {
		return ((store.getState().good + store.getState().ok + store.getState().bad))
	}

	if (all() > 0) {
		return (
			<div>
				<h2>Give feedback</h2>
				<Button action={good} text='good' />
				<Button action={neutral} text='neutral' />
				<Button action={bad} text='bad' />
				<Button action={zero} text='reset stats' />
				<Statistics />
			</div>
		)
	} else {
		return (
			<div>
				<h2>Give feedback</h2>
				<Button action={good} text='good' />
				<Button action={neutral} text='neutral' />
				<Button action={bad} text='bad' />
				<Button action={zero} text='reset stats' />
			</div>
		)
	}
}

const renderApp = () => {
	ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
