export const updateColor = (color) => {
    return {
        type:'UPDATE_COLOR',
        data:color
    }
}

export const updateBrushSize = (size) => {
  return {
    type:'UPDATE_SIZE',
    data:size
  }
}



const drawSettingsReducer = (state = {color:'#fff',brushSize:10}, action) => {
    switch(action.type){
      case "UPDATE_COLOR":
        return {...state, color:action.data}
      case "UPDATE_SIZE":
        return {...state, brushSize:action.data}
      default:
          break
          
      
    }
      
  
    return state
  }
  
  export default drawSettingsReducer