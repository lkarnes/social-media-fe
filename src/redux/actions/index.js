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

export const addToFeed = payload => {
    return {
        type: 'ADD_TO_FEED',
        payload: payload
    }
}

export const removeFromFeed = payload => {
    return {
        type: 'REMOVE_FROM_FEED',
        payload: payload
    }
}

export const getFriends = payload => {
    return {
        type:'GET_FRIENDS',
        payload: payload
    }
}

export const likePost = payload => {
    return {
        type: 'LIKE_POST',
        payload: payload
    }
}

export const removeFriend = payload => {
    return {
        type: 'REMOVE_FRIEND',
        payload: payload
    }
}

export const addFriend = payload => {
    return {
        type: 'ADD_FRIEND',
        payload: payload
    }
}