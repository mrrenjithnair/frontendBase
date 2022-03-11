import {
    INPUT_VALUE_CHANGED_GLOBAL,
    GET_CLUB_DETAIL_SUCCESS,
    SET_SESSION_TOKEN_FROM_LOCAL
} from './actions';

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
            
        case SET_SESSION_TOKEN_FROM_LOCAL:
            const sessionToken = localStorage.getItem("token");
            let user = localStorage.getItem("user");
            user = user ? JSON.parse(user) : null
            console.log('SET_SESSION_TOKEN_FROM_LOCAL', sessionToken)

            return {...state, 'sessionToken': sessionToken,"myDetails":user};   
                
        case GET_CLUB_DETAIL_SUCCESS:
            console.log(actions.id, actions.value)
            return {...state, 'clubDetails':actions.payload};

            
        default:        
            return state;
    }
}