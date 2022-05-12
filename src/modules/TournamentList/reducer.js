import {
    GET_TOURNAMENT_LIST,
    INPUT_VALUE_CHANGED_CLUB,
    GET_TOURNAMENT_LIST_SUCCESS,
    JOIN_TOURNAMENT
} from './actions';

// The initial state of the TournamentList Reducer
export const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: {},
    userName: {},
    password: {},
    count:0,
    loginUser:null,
    sessionToken:null,
    requestType: null

  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case GET_TOURNAMENT_LIST:
            return {...state, errors:{}};
        case GET_TOURNAMENT_LIST_SUCCESS:
            let data = actions.data
            console.log('GET_TOURNAMENT_LIST_SUCCESS',actions.data)
            return { ...state, tournamentList: data};
        case INPUT_VALUE_CHANGED_CLUB:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};
        case JOIN_TOURNAMENT:
            console.log(actions.id, actions.value)
            return { ...state, requestType: actions.requestType, tournamentId: actions.tournamentId, clubId: actions.clubId };
            
        default:        
            return state;
    }
}