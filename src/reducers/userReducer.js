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

export const saveImage = (img) => {
  return {
      type:'SAVE_IMG',
      data:img
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
      case "SAVE_IMG":
          return {...state, user:{...state.user, image:action.data}, singleUser:{...state.singleUser, image:action.data}}
      default:
        break
    }
      
  
    return state
  }
  
  export default userReducer