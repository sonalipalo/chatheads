const chatheadsModel = require('../model/index')
const service = require('../utilities/validator')
const chatheadsService = {}
const validator = service.validator
const jwtToken = service.jwtToken


chatheadsService.getJwtToken = (authHeader) => {    
    return new Promise((resolve, reject)=> {
        if(authHeader === 'codered516'){
            return resolve(jwtToken)
        }
        else{
            return reject(new Error('There was some problem with your session. Please refresh the page.'))
        }        
    })
}

chatheadsService.signUp = (signUpDetails) => {
    if(validator.validateToken(signUpDetails.jwtToken)){
        if(validator.validateUserId(signUpDetails.data.userId)){
            if(validator.validatePassword(signUpDetails.data.password)){
                if(validator.validateName(signUpDetails.data.name)){
                    if(validator.validatePhoneNumber(signUpDetails.data.phoneNumber)){
                        return chatheadsModel.signUp(signUpDetails.data).then((response)=>{                
                            return response
                        }).catch((err)=>{                
                            if(err.message){
                                throw err;
                            }
                            else{
                                let error = new Error("Couldn't connect to database");
                                error.status = 400;
                                throw error;
                            }
                        })
                    }
                }
            }    
        }
    }
}

chatheadsService.updateUserId = (userIdDetails) => {
    if(validator.validateToken(userIdDetails.jwtToken)){
        if(validator.validateUserId(userIdDetails.data.newUserId)){
            return chatheadsModel.updateUserId(userIdDetails.data).then((response)=>{                
                return response
            }).catch((err)=>{                
                if(err.message){
                    throw err;
                }
                else{
                    let error = new Error("Couldn't connect to database");
                    error.status = 400;
                    throw error;
                }
            })                
            }
        }
    }    


chatheadsService.signIn = (signInDetails) => {
    if(validator.validateToken(signInDetails.jwtToken)){
        return chatheadsModel.signIn(signInDetails.data).then((response)=>{                
            return response
        }).catch((err)=>{                
            if(err.message){
                throw err;
            }
            else{
                let error = new Error("Couldn't connect to database");
                error.status = 400;
                throw error;
            }
        })
    }    
}

module.exports = chatheadsService