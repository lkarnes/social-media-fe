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
    default:
        return state
}
}