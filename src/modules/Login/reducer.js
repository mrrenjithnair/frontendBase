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
    updatedBook: {},
    count:0
  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case BOOK_ADD_PAGE_INIT:
            return {...state, errors:{}};
        case DECREMENT:
            let count = state.count
            console.log(state)
            console.log('count',count)
            return {...state, count: count  - 1 };
        case INCREMENT:
            let countTemp = state.count
            console.log(state)
            console.log('countTemp',countTemp)
            return {...state, count: countTemp +1};
        default:        
            return state;
    }
}