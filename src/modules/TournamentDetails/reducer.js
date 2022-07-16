import {
    GET_TOURNAMENT_DETAIL,
    INPUT_VALUE_CHANGED_CLUB,
    GET_TOURNAMENT_DETAIL_SUCCESS,
    INPUT_VALUE_CHANGED_EDIT_CLUB,
    JOIN_TOURNAMENT,
    INPUT_VALUE_CHANGED_EDIT_TEAM,
    INPUT_VALUE_CHANGED_TEAM
} from './actions';

// The initial state of the TournamentDetails Reducer
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
    selectedTeam:'',
    selectedItem:''

  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case GET_TOURNAMENT_DETAIL:
            return {...state, errors:{}};
        case GET_TOURNAMENT_DETAIL_SUCCESS:
            let data = actions.data
            console.log('GET_TOURNAMENT_DETAIL_SUCCESS',actions.data)
            return { ...state, tournamentDetails: data[0]};
        case INPUT_VALUE_CHANGED_TEAM:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};

        case INPUT_VALUE_CHANGED_EDIT_TEAM:
            let selectedTeam = state.selectedTeam
            selectedTeam.map((item)=>{
                if(item.key == actions.id){
                    item.value = actions.value
                }
            })
            console.log(actions.id, actions.value)
            return {...state, selectedTeam};


            
        case JOIN_TOURNAMENT:
            console.log(actions.id, actions.value)
            return { ...state, requestType: actions.requestType, tournamentId: actions.tournamentId, clubId: actions.clubId };

        default:        
            return state;
    }
}