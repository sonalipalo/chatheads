import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";

import signInConstants from '../../common/constants/signInConstants'
import actions from '../../redux/actions/index'
import styleVals from '../../common/styleVals/global'
import {withStyles} from '@material-ui/core/styles'
import useLazyLoading from '../../common/utilities/useLazyLoading'

import PageContainer from '../../common/components/page-container/index'
import TextInput from "../../common/components/text-input/index"
import AlertBox from "../../common/components/alert-box";

import { 
    PageWrapper,      
    AlertWithLoginWrapper,
    LoginWrapper,
    UsernameWrapper,
    PasswordWrapper,
    SignInButtonWrapper,
    Loader
} from "./styles";
import { H1 } from "../../common/components/typography";


const mapStateToProps = store => {
  return {
    signInData: store.signIn,
    homeData: store.homeData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initiateSignIn: (signInDetails) => dispatch(actions.signInActions.initiateSignIn(signInDetails))
  }
}

const SignIn = (props) =>{

  const loaderStyle = {
    colorPrimary: props.theme==='dark'?styleVals.color.bestOrange:styleVals.color.ogBlue
  }
  const AppLoader = withStyles(loaderStyle)(Loader)

  const [isLoading, setIsLoading] = useLazyLoading(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },2000)
  })

  //useState
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [alert, setAlert] = useState({
    showAlert: false,
    message: ''
  })
  const [redirect, setRedirect] = useState(false)

  //useEffects
  useEffect(()=>{
    if(props.signInData.loading){
      setShowLoader(true)
    }
    else{
      setShowLoader(false)
    }
  },[props.signInData])

  useEffect(()=>{
    if(props.signInData.data){      
      if(props.signInData.status === 'failure'){
        if(props.signInData.data.data){
          setAlert({
            showAlert:true,
            message: props.signInData.data.data
          })
        }
        else{
          setAlert({
            showAlert:true,
            message: props.signInData.data
          })
        }
      }
      else{
        if(props.signInData.data.data.message){
          setAlert({
            showAlert:false,
            message: ''
          })
          setRedirect(true)                    
        }
      }
    }
  },[props.signInData])

  const handleUsername = (event) => {    
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleSignIn = (e) => {
    e.preventDefault()
    let signInDetails = {
      jwtToken: props.homeData.data ? props.homeData.data.data.jwtToken: null ,
      data: {
        userId: username,
        password
      }
    }
    props.initiateSignIn(signInDetails)
  }


  return (
    <React.Fragment>      
      {!redirect
      ?<React.Fragment>                  
        <PageContainer {...props}>
          <PageWrapper {...props}>
            <AlertWithLoginWrapper>
              {alert.showAlert && <AlertBox theme={props.theme}>{alert.message}</AlertBox>}
              {showLoader && <AppLoader theme={props.theme}/>} 
              <form onSubmit = {handleSignIn}>
              <LoginWrapper {...props}>
                  <H1 theme={props.theme}>Sign in, fellow Chathead!</H1>
                  <UsernameWrapper>
                    <TextInput
                      {...props}
                      value={username}
                      label={signInConstants.USERNAME}
                      requiredField={true}
                      onChange={handleUsername}                                                 
                    />
                  </UsernameWrapper>
                  <PasswordWrapper>
                    <TextInput
                      {...props}    
                      value={password}                
                      label={signInConstants.PASSWORD}
                      requiredField={true}
                      isPassword={true}
                      onChange={handlePassword}                
                    /> 
                  </PasswordWrapper>            
                <SignInButtonWrapper
                  type='submit'                   
                  {...props}
                >
                  {signInConstants.SIGN_IN}
                </SignInButtonWrapper>              
              </LoginWrapper>
              </form>
            </AlertWithLoginWrapper>
          </PageWrapper>
        </PageContainer>
      </React.Fragment>
     : <Redirect to='/chats'/>}
    </React.Fragment>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)