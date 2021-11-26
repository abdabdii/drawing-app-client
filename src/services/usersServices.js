import axios from "axios"
const baseURL = process.env.REACT_APP_DRAWING_API

export const fetchUser = (id) => {
    return axios.get(baseURL + '/users/' + id)

}