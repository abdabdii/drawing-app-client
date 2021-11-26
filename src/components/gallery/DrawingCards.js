import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { DrawingCard } from './DrawingCard'


// CustomCard(userName,userId,liked,userImage,image,likesNumber,drawingTitle
export const DrawingCards = ({drawings}) => {
    let {user} =useSelector((state)=> state.user)
    return (
        <>
        {
            drawings.map((drawing) => 
            <Grid item xs={11} md={6} lg={4}>
                <DrawingCard
                userName={drawing.user.name}
                userId={drawing.user.id}
                liked={drawing.likes.includes(drawing.user.id)}
                likesNumber={drawing.likes.length}
                image={drawing.drawingImg}
                drawingId={drawing.id}
                drawingTitle={drawing.title}
                userImage={drawing.user.image}
                isOwner={drawing.user.id===user.id}
                key={drawing.id}
                />
            </Grid>
             )
        }
        </>
    )
}
