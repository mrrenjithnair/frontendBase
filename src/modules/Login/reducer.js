import {
    LOGIN
} from './actions';

// The initial state of the Login Reducer
export const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: {},
    userName: {},
    password: {},
    count:0
  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case LOGIN:
            return {...state, errors:{}};
        default:        
            return state;
    }
}