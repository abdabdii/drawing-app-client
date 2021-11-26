import { Grid } from '@mui/material'
import React from 'react'
import { DrawingCardLoading } from './DrawingCardLoading'


export const DrawingCardsLoading = () => {

    return (
        <>
             {[...Array(10)].map((item,index) => 
                 <Grid item xs={11} md={6} lg={4}>
                     <DrawingCardLoading key={index} />
                 </Grid>
             )}
        </>
    )
}
