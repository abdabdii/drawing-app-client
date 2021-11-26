export const updateColor = (color) => {
    return {
        type:'UPDATE_COLOR',
        data:color
    }
}

const colorReducer = (state = '#fff', action) => {
    switch(action.type){
      case "UPDATE_COLOR":
        return action.data
      default:
          break
          
      
    }
      
  
    return state
  }
  
  export default colorReducer