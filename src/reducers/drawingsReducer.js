export const updateDrawings = (updatedDrawing) => {
    return {
        type:'UPDATE_DRAWING',
        data:updatedDrawing
    }
}

export const deleteDrawings = (drawingId) => {
    return {
        type:'DELETE_DRAWING',
        data:drawingId
}
}

export const addDrawing = (newDrawing) => {
   return {
       type:'ADD_DRAWING',
       data:newDrawing
    }
}

export const setDrawings = (drawings) => {
    return {
        type:'SET_DRAWINGS',
        data:drawings
     }
}

const drawingsReducer = (state = [], action) => {
    switch(action.type){
      case "UPDATE_DRAWING":
        return state.map((drawing) => {
            if (drawing.id === action.data.id) {
                return {...drawing, likes:action.data.likes}
            } else {
                return drawing
            }
        })
      case "DELETE_DRAWING":
        return state.filter((drawing) => drawing.id !==action.data)
      case "ADD_DRAWING":
        return state.concat(action.data)
      case "SET_DRAWINGS":
        return action.data
      default:
          break
          
      
    }
      
  
    return state
  }
  
  export default drawingsReducer