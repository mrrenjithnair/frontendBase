
export const BOOK_ADD_PAGE_INIT = 'BOOK_ADD_PAGE_INIT';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function bookAddPageInit() {
    return {
        type: BOOK_ADD_PAGE_INIT,
    };
}

export function handleIncrementClick(payload) {
    return {
        type: INCREMENT,
        payload
    };
}


export function handleDecrementClick(payload) {
    return {
        type: DECREMENT,
        payload
    };
}

