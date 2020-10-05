export const signIn = payload => {
    return {
        type: "SIGN_IN",
        payload: payload
    }
}

export const addPost = payload => {
    return {
        type: "ADD_POST",
        payload: payload
    }
}

export const fillFeed = payload => {
    return {
        type: "FILL_FEED",
        payload: payload
    }
}

export const getFriends = payload => {
    return {
        type:'GET_FRIENDS',
        payload: payload
    }
}