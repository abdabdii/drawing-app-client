import axios from 'axios'
import { addError } from '../reducers/errorsReducer';
import { authUser } from '../reducers/userReducer';
import { saveUser } from '../reducers/userReducer';



const baseURL = process.env.REACT_APP_DRAWING_API

const loginUser = async ({username, password}) => {
    return await axios.post(baseURL+'/login',{
        username, pass:password
    })
}

export const registerUser = async ({username, name, password}) => {
    return await axios.post(baseURL+'/users',{
        username, name, pass:password
    })
}



export const authenticateUser = async ( username, password ,dispatch, navigate) => {
            //Set date for expiration in UNIX
            var date = new Date(); // Now
            date.setDate(date.getDate() + 1)
            
    try{
        const response = await loginUser({username, password})
        if (response.status===200) {
            const data = response.data
            const {token} = data
            const  {id,username, name, image} = data
            dispatch(authUser(token))
            dispatch(saveUser({id,username, name, image}))
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify({id,username, name, image, expiry:date.getTime() / 1000}))
            navigate("/home", { replace: true })}
        }catch{
            dispatch(authUser('invalid'))
        }
}

export const validateForm = async (data, dispatch) => {
    let validationData = {
        firstName:validateField(data.get('firstName'),3),
        lastName:validateField(data.get('lastName'),3),
        password:validateField(data.get('password')),
        username:validateField(data.get('username'))
    }
    dispatch(addError(validationData))
    return Object.values(validationData).every(item => item === false)


} 

const validateField = (field, length = 8) => {
    if (field.length < length) {
        return true
    }
    return false
}

