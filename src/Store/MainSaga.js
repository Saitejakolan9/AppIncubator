import { all } from 'redux-saga/effects';
import {universitiessaga} from '../Redux/Saga'

function* rootSaga(){
    yield all([
        ...universitiessaga
    ])
}

export default rootSaga;