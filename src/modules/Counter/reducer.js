import {
    BOOK_ADD_PAGE_INIT,
    INCREMENT,DECREMENT
} from './actions';

// The initial state of the Login Reducer
export const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: {},
    addedBook: {},
    updatedBook: {}
  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case BOOK_ADD_PAGE_INIT:
            return {...state, errors:{}};
        case DECREMENT:
            let count = state.get('count')
            return {...state, count: count  - 1 };
        case INCREMENT:
            return {...state, count: count +1};
        default:        
            return state;
    }
}