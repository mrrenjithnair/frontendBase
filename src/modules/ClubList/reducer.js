import {
    GET_CLUB_LIST,
    INPUT_VALUE_CHANGED_CLUB,
    GET_CLUB_LIST_SUCCESS
} from './actions';

// The initial state of the ClubList Reducer
export const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: {},
    userName: {},
    password: {},
    count:0,
    loginUser:null,
    sessiontoken:null

  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case GET_CLUB_LIST:
            return {...state, errors:{}};
        case GET_CLUB_LIST_SUCCESS:
            let data = actions.data
            console.log('GET_CLUB_LIST_SUCCESS',actions.data)
            return { ...state, clubList: data};
        case INPUT_VALUE_CHANGED_CLUB:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};
        default:        
            return state;
    }
}