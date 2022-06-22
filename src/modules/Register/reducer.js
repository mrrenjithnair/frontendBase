import {
    INPUT_VALUE_CHANGED_REGISTER,
} from './actions';

// The initial state of the Register Reducer
export const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: {},
    addedBook: {},
    updatedBook: {},
    count:0,
    playerType: 'A',
    category: 'all-rounder'
  };

export default function(state = initialState,actions){
    switch(actions.type){
            case INPUT_VALUE_CHANGED_REGISTER:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};
        default:        
            return state;
    }
}