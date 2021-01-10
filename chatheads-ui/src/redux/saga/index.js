import {all} from 'redux-saga/effects'
import {catchInitiateSignIn} from './signIn.saga'
import {catchInitiateSignUp} from './signUp.saga'
import {catchGetJwtToken} from './home.saga'
import {catchInitiateSearchChatheads, catchInitiateSendMessage, catchInitiateUpdateUserId} from './chats.saga'

export default function * chatheadsSaga(){
    yield all([
        catchInitiateSignIn(),
        catchInitiateSignUp(),
        catchGetJwtToken(),
        catchInitiateSearchChatheads(),
        catchInitiateSendMessage(),
        catchInitiateUpdateUserId()
    ])
}