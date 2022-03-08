import {combineReducers} from "redux";

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return null;
      }
      return JSON.parse(serializedState);
    } catch (e) {
        return "error in loadState";
    }
}
 
const login = (state = {}, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            // console.log('in LOGIN_USER')
            // console.log(action.payload)
            return action.payload;
        case 'LOGOUT':
            return null
        default:
            return state;
    }
}

export default combineReducers({
    userInfo: login,
    persisted: loadState
});
