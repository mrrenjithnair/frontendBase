import {
    GET_USER_LIST,
    INPUT_VALUE_CHANGED_USER,
    GET_USER_LIST_SUCCESS,
    ON_CHANGE_USER_UPDATE,
    USER_UPDATE
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
        case INPUT_VALUE_CHANGED_USER:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};

        case ON_CHANGE_USER_UPDATE:
            var userList = state.userList
            if (userList && userList.length > 0) {
                for (var i = 0; i < userList.length; i++) {
                    if (userList[i].id == actions.id) {
                        userList[i][actions.key] = actions.value
                    }
                }
            }
            return { ...state, userList: userList };

        case USER_UPDATE:
            var userList = state.userList
            var selectedUser
            if (userList && userList.length > 0) {
                for (var i = 0; i < userList.length; i++) {
                    if (userList[i].id == actions.id) {
                        selectedUser = userList[i]
                    }
                }
            }
            return { ...state, selectedUser: selectedUser };
            
        default:        
            return state;
    }
}