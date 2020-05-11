const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTE':
            return state = action.data.notification
        default: return state
    }
}

export const setNotification = (notification, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTE',
            data: { notification }
        })
        setTimeout(() => dispatch({
            type: 'SET_NOTE',
            data: { notification: '' }
        }), timeout * 1000)
    }
}

export default reducer