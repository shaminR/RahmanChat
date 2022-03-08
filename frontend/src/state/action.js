export const updateLoggedInUser = (user) => dispatch => {
    console.log('in updateLoggedInUser action')
    dispatch({type: "LOGIN_USER", payload: user})
}

export const logOut = () => async dispatch => {
    console.log('log out')
    dispatch({type: "LOGOUT"});
}
