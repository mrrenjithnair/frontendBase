import {
    GET_CLUB_REQUEST,
    INPUT_VALUE_CHANGED_CLUB,
    GET_CLUB_REQUEST_SUCCESS,
    INPUT_VALUE_CHANGED_EDIT_CLUB,
    REQUEST_ACTION
} from './actions';

// The initial state of the Request Reducer
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
    requestType: null,
    requestList:[]

  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case GET_CLUB_REQUEST:
            return {...state, errors:{}};
        case GET_CLUB_REQUEST_SUCCESS:
            let data = actions.data
            console.log('GET_CLUB_REQUEST_SUCCESS',actions.data)
            return { ...state, requestList: data};
        case INPUT_VALUE_CHANGED_CLUB:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};

        case INPUT_VALUE_CHANGED_EDIT_CLUB:
            let selectedTournament = state.selectedTournament
            selectedTournament.map((item)=>{
                if(item.key == actions.id){
                    item.value = actions.value
                }
            })
            console.log(actions.id, actions.value)
            return {...state, selectedTournament};

            
        case REQUEST_ACTION:
            console.log(actions.id, actions.value)
            return { ...state, requestType: actions.requestType, tournamentId: actions.tournamentId, clubId: actions.clubId, status: actions.status, requestId:  actions.requestId };
            
        default:        
            return state;
    }
}