export const setTitle = (title) => {
    return {
        type:'SET_TITLE',
        data:title
    }
}

export const setEdit = () => {
    return {type:'SET_EDIT'}
}

export const unSetEdit = () => {
   return {type:'UNSET_EDIT'}
}


const drawingReducer = (state = {title:'Untitled',edit:false, brushSize:10}, action) => {
    switch(action.type){
      case "SET_TITLE":
        return {...state, title:action.data}
      case "SET_EDIT":
        return {...state, edit:true}
      case "UNSET_EDIT":
        return {...state, edit:false}
      default:
          break
          
      
    }
      
  
    return state
  }
  
  export default drawingReducer