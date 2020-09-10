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
    console.log(action.payload, 'in case')
        return {
            ...state,
            userData: action.payload
        }
    default:
        return state
}
}