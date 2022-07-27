import { createStore , applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './MainReducer';
import rootSaga from './MainSaga';

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();
// mount it on the store
const store = createStore (
    rootReducer,
 applyMiddleware(sagaMiddleware)
);
// run the saga

sagaMiddleware.run(rootSaga);


export default store;