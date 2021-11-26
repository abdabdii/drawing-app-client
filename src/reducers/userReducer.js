let initialState = () => {
  let user = JSON.parse(localStorage.getItem('user')) || {}
  if ( !user.expiry || user.expiry >= Date.now() ){
    return {token:'',user:'',singleUser:{'name':'empty'}}
  }else{
    return {token:localStorage.getItem('token'),user,singleUser:{'name':'empty'}}
  }


}

export const saveSingleUser = (user) => {
  return {
    type:'SINGLE_USER',
    data:user
}
}

export const saveUser = (user) => {
    return {
        type:'SAVE_USER',
        data:user
    }
}

export const authUser = (token) => {
    return {
        type:'SAVE_TOKEN',
        data:token
    }
}

const userReducer = (state = initialState(), action) => {
    switch(action.type){
      case "SAVE_USER":
        return {...state, user:action.data}
      case "SAVE_TOKEN":
        return {...state, token:action.data}
      case "SINGLE_USER":
          return {...state, singleUser:action.data}
      default:
        break
    }
      
  
    return state
  }
  
  export default userReducer