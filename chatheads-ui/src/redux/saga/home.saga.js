import {put, takeEvery} from 'redux-saga/effects'
import actionTypes from '../actions/actionTypes'
import axios from 'axios'
import actions from '../actions'

function * handleGetJwtToken(action){
    const jwtTokenDetails = yield axios.post(actionTypes.ONLINE_ENDPOINT+'getJwtToken',action.authHeader).then(response => response.data).catch(error => error)
    
    if(jwtTokenDetails instanceof Error){
        if(jwtTokenDetails.response){
            yield put(actions.homeActions.getJwtTokenFailure(jwtTokenDetails.response))
        }
        else{
            yield put(actions.homeActions.getJwtTokenFailure(jwtTokenDetails.message))
        }
    }
    else{
        yield put(actions.homeActions.getJwtTokenSuccessful(jwtTokenDetails))
    }
}

export function * catchGetJwtToken(){
    yield takeEvery(actionTypes.GET_JWT_TOKEN, handleGetJwtToken)
}