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
    friendList: []

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
            friendList: action.payload[0].friends
        }
    case "ADD_FRIEND":
        return {
            ...state,
            friendList: [action.payload , ...state.friendList]
        }
    default:
        return state
}
}