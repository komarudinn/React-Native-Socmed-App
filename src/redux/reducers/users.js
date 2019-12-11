const users = {
    email: '',
    username: '',
    profile_pict: '',
    id: 0
}

function UsersReducer(state = users, action) {
    if (action.type === 'REGISTER_SUCCESS') {
        return action.payload
    } else {
        return state
    }
}

export default UsersReducer;