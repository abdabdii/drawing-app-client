export const setPending = () => {
    return {
        type:'SET_PENDING',
    }
}

export const setDone = () => {
    return {
        type:'SET_DONE',
    }
}

const loadingReducer = (state = false, action) => {
    switch(action.type){
      case "SET_PENDING":
        return true
      case "SET_DONE":
        return false
      default:
          break
          
      
    }
      
  
    return state
  }
  
  export default loadingReducer