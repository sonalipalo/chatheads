import axios from 'axios'
import actions from '../actions';
import { put, takeEvery } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';


function * handleSearchChatheads(action){
    const searchData = yield axios.post(actionTypes.ONLINE_ENDPOINT+'searchChatheads',action.searchDetails).then(response => response.data).catch(error => error);
    if(searchData instanceof Error){
        if(searchData.response){
            yield put(actions.chatsActions.searchChatheadsFailure(searchData.response))
        } else {
            yield put(actions.chatsActions.searchChatheadsFailure(searchData.message))
        }
    }
    else{
        yield put(actions.chatsActions.searchChatheadsSuccess(searchData))
    }
}

export function * catchInitiateSearchChatheads(){
    yield takeEvery(actionTypes.INITIATE_SEARCH_CHATHEADS, handleSearchChatheads)
}

function * handleSendMessage(action){
    const sendMessageData = yield axios.post(actionTypes.ONLINE_ENDPOINT+'sendMessage',action.messageDetails).then(response => response.data).catch(error => error);
    if(sendMessageData instanceof Error){
        if(sendMessageData.response){
            yield put(actions.chatsActions.sendingMessageFailure(sendMessageData.response))
        } else {
            yield put(actions.chatsActions.sendingMessageFailure(sendMessageData.message))
        }
    }
    else{
        yield put(yield put(actions.chatsActions.sendingMessageSuccess(sendMessageData)))
    }
}

export function * catchInitiateSendMessage(){
    yield takeEvery(actionTypes.INITIATE_SENDING_MESSAGE, handleSendMessage)
}

function * handleUpdateUserId(action){
    const updateUserIdData = yield axios.post(actionTypes.ONLINE_ENDPOINT+'updateUsername',action.payload).then(response => response.data).catch(error => error);
    if(updateUserIdData instanceof Error){
        if(updateUserIdData.response){
            yield put(actions.chatsActions.updateUserIdFailure(updateUserIdData.response))
        } else {
            yield put(actions.chatsActions.updateUserIdFailure(updateUserIdData.message))
        }
    }
    else{
        yield put(actions.chatsActions.updateUserIdSuccess(updateUserIdData))
    }
}

export function * catchInitiateUpdateUserId(){
    yield takeEvery(actionTypes.UPDATE_USERID, handleUpdateUserId)
}

function * handleGetMessages(action){    
    const updateUserIdData = yield axios.post(actionTypes.ONLINE_ENDPOINT+'getMessages',action.userDetails).then(response => response.data).catch(error => error);
    if(updateUserIdData instanceof Error){
        if(updateUserIdData.response){
            yield put(actions.chatsActions.getMessagesFailure(updateUserIdData.response))
        } else {
            yield put(actions.chatsActions.getMessagesFailure(updateUserIdData.message))
        }
    }
    else{
        yield put(actions.chatsActions.getMessagesSuccess(updateUserIdData))
    }
}

export function * catchGetMessages(){
    yield takeEvery(actionTypes.GET_MESSAGES, handleGetMessages)
}

function * handleMarkRead(action){    
    const readMessageData = yield axios.post(actionTypes.ONLINE_ENDPOINT+'markRead',action.userDetails).then(response => response.data).catch(error => error);    
    if(readMessageData instanceof Error){
        if(readMessageData.response){
            yield put(actions.chatsActions.markReadFailure(readMessageData.response))
        } else {
            yield put(actions.chatsActions.markReadFailure(readMessageData.message))
        }
    }
    else{
        yield put(actions.chatsActions.markReadSuccess(readMessageData))
    }
}

export function * catchMarkRead(){
    yield takeEvery(actionTypes.MARK_READ, handleMarkRead)
}
