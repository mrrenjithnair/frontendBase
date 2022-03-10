import {
    INPUT_VALUE_CHANGED_GLOBAL,
    GET_CLUB_DETAIL_SUCCESS
} from './actions';

// The initial state of the Dashboard Reducer
export const initialState = {
    sessionToken:null,
    clubDetails:null,
    nearByClub: false
  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case INPUT_VALUE_CHANGED_GLOBAL:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};        
        case GET_CLUB_DETAIL_SUCCESS:
            console.log(actions.id, actions.value)
            return {...state, 'clubDetails':actions.payload};

            
        default:        
            return state;
    }
}