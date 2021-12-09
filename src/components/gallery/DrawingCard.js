import React, {memo} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { deleteDrawings, updateDrawings } from '../../reducers/drawingsReducer'
import { deleteDrawing, likeDrawing } from '../../services/drawingsServices'
import CustomCard from '../customComponents/CustomCard'



// CustomCard(userName,userId,liked,userImage,image,likesNumber,drawingTitle, handleFavorite,handleDelete,handleEdit)
export const DrawingCard = memo(({userName,userId,liked,userImage,image,likesNumber,drawingTitle,drawingId,isOwner}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log('22');
    const handleDelete = async () => {
        try{
            let response = await deleteDrawing(localStorage.getItem('token'),drawingId)
            if(response.status===204){
                dispatch(deleteDrawings(drawingId))
            }
        }catch{
            alert('Could not delete drawing')
        }

    }

    const handleEdit = () => {
        navigate(`/draw/${drawingId}`, { replace: true })
    }

    const handleFavorite = async () => {
        try{
            let response = await likeDrawing(localStorage.getItem('token'),drawingId)
            if(response.status===200){
                dispatch(updateDrawings(response.data))
            }
        }catch{
            navigate('/login', {replace: true})
        }
    }
    
    return (
        <>
            <CustomCard 
            
            userName={userName}
            userId={userId}
            liked={liked}
            userImage={userImage}
            image={image}
            isOwner={isOwner}
            likesNumber={likesNumber}
            drawingTitle={drawingTitle}
            handleFavorite={handleFavorite}
            handleDelete={handleDelete}
            handleEdit={handleEdit} 
            /> 
        </>
    )
})
