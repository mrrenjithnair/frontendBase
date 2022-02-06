import { createStore, applyMiddleware } from 'redux';
import { countReducer } from './counter/reducer';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
import { mainSaga } from "./modules/app/mainSaga";
import { mainReducer } from "./modules/app/mainReducer";

function* exampleSaga() {
  console.log("Example saga reached");
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);
