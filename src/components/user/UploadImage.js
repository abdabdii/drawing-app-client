import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveImage } from '../../reducers/userReducer'
import { updateUser } from '../../services/usersServices'


export const UploadImage = ({id}) => {
    const dispatch = useDispatch()
    const {user,token} = useSelector((state)=>state.user)

    const handleChange = async (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = async function () {
            try{
                let response = await updateUser(token,reader.result,user.id)
                if(response.status===200){
                    dispatch(saveImage(reader.result))
                }
            }catch{
                alert('Could Not Update Image')
            }
            
        }
    }

    return (
        <>
        {user.id===id?<label htmlFor="upload-photo">
            <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e)=>handleChange(e)}
                accept="image/png, image/gif, image/jpeg"
            />

            <Button color="secondary" variant="contained" component="span">
                Upload Image
            </Button>
       </label>:''}
       </>
    )
}
