const intialState = {register:{firstName:false,lastName:false,username:false,password:false}}


export const addError = (error) => {
    return {
        type:'ADD_ERROR_REGISTER',
        data:error
    }
}

export const duplicated = () => {
    return {
        type:'DUPLICATED_USERNAME_ERROR'
    }
}
const errorsReducer = (state = intialState, action) => {
    switch(action.type){
      case "ADD_ERROR_REGISTER":
        return {...state, register:action.data}
      case "DUPLICATED_USERNAME_ERROR":
        return {...state, register:{...state.register, username:true}}
      default:
          break
          
      
    }
      
  
    return state
  }
  
  export default errorsReducer