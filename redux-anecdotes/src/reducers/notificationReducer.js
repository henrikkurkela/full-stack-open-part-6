const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTE':
            return state = action.data.notification
        default: return state
    }
}

export const setNotification = (notification) => {
    return ({
        type: 'SET_NOTE',
        data: { notification }
    })
}

export default reducer