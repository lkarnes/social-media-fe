export const initialState = {
    userData: {
        id: null,
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        profile_picture: null
    },
    feedArray: [],
    friendList: [],
    likes: []

}


export const reducer = (state=initialState, action) => {
switch(action.type) {
    case"SIGN_IN":
        return {
            ...state,
            userData: action.payload
        }
    case "ADD_POST":
        console.log('add post is working')
        return {
            ...state,
            feedArray: [action.payload , ...state.feedArray]
        }
    case "FILL_FEED":
        return {
            ...state,
            feedArray: [...action.payload]
        }
    case "GET_FRIENDS":
        return {
            ...state,
            friendList: action.payload
        }
    case "ADD_FRIEND":
        return {
            ...state,
            friendList: [action.payload , ...state.friendList]
        }
    case "LIKE_POST":
        if(state.likes.includes(action.payload)){
            var newLikes = state.likes
            var index = state.likes.indexOf(action.payload)
            newLikes.pop(index)
            return {
                ...state,
                likes: newLikes
            }
        }
        return {
            ...state,
            likes: [action.payload, ...state.likes]
        }
    default:
        return state
}
}