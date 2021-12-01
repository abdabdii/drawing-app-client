import { Grid } from '@mui/material'
import React from 'react'
import { DrawingCardLoading } from './DrawingCardLoading'


export const DrawingCardsLoading = () => {

    return (
        <>
             {[...Array(10)].map((item,index) => 
                 <Grid item xs={11} md={6} lg={4} sx={{justifyContent:'center',display:'flex'}} key={`grid-${index+10}`}>
                     <DrawingCardLoading key={`sekelton-${index+10}`} />
                 </Grid>
             )}
        </>
    )
}
