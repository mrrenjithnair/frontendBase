import {
    INPUT_VALUE_CHANGED_GLOBAL,
    GET_CLUB_DETAIL_SUCCESS,
    SET_DATA_FROM_LOCAL
} from './actions';
import roleInfo from '../utils/roleInfo';

// The initial state of the Dashboard Reducer
export const initialState = {
    sessionToken:null,
    clubDetails:null,
    nearByClub: false,
    myDetails: null
  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case INPUT_VALUE_CHANGED_GLOBAL:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};   
            
        case SET_DATA_FROM_LOCAL:
            console.log(roleInfo)
            const sessionToken = localStorage.getItem("token");
            let user = localStorage.getItem("user");
            let userPrivileges = localStorage.getItem("userPrivileges");
            user = user ? JSON.parse(user.replace(/\r?\n|\r|\t/g, '')) : null
            userPrivileges = userPrivileges ? JSON.parse(userPrivileges) : null
            roleInfo.set(JSON.parse(userPrivileges.replace(/\r?\n|\r|\t/g, '')))
            console.log(roleInfo,"after")

            return {...state, 'sessionToken': sessionToken,"myDetails":user,"userPrivileges":userPrivileges};   
                
        case GET_CLUB_DETAIL_SUCCESS:
            console.log(actions.id, actions.value)
            return {...state, 'clubDetails':actions.payload};

            
        default:        
            return state;
    }
}