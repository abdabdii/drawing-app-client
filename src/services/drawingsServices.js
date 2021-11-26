import axios from "axios"
const baseURL = process.env.REACT_APP_DRAWING_API

export const fetchDrawing = (id) => {
    return axios.get(baseURL + '/drawings/' + id)

}

export const fetchDrawings = () => {
    return axios.get(baseURL + '/drawings')
}



export const postDrawing =  ({title, drawing,drawingImg, token}) => {

    return axios.post(baseURL + '/drawings', {
        title,
        drawing,
        drawingImg
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const fetchUserDrawings = (userId) => {
    return axios.get(baseURL + `/drawings/user/${userId}`)
}



export const updateDrawing =  ({title, drawing,drawingImg, token,drawingId}) => {
    

    return axios.put(baseURL + `/drawings/${drawingId}`, {
        title,
        drawing,
        drawingImg
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const likeDrawing = (token, drawingId) => {
    return axios.put(baseURL + `/drawings/${drawingId}`, {like:'like'},{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const deleteDrawing = (token,drawingId) => {
    return axios.delete(baseURL + `/drawings/${drawingId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}