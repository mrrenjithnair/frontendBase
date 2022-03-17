import {
    GET_USER_LIST,
    INPUT_VALUE_CHANGED_CLUB,
    GET_USER_LIST_SUCCESS
} from './actions';

// The initial state of the UserList Reducer
export const initialState = {
    userList: false,
    sessionToken:null

  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case GET_USER_LIST:
            return {...state, errors:{}};
        case GET_USER_LIST_SUCCESS:
            let data = actions.data
            console.log('GET_USER_LIST_SUCCESS',actions.data)
            return { ...state, userList: data};
        case INPUT_VALUE_CHANGED_CLUB:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};
        default:        
            return state;
    }
}