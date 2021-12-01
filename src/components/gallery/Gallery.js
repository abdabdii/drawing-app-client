import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import { DrawingCards } from './DrawingCards'
import { DrawingCardsLoading } from './DrawingCardsLoading'




export const Gallery = ({drawings}) => {
    const loading = useSelector((state) => state.loading)
    
    return (
        <Grid container  spacing={1} sx={{justifyContent:'center',margin:'0.5rem',width:'95%'}}>
            {loading
            ?
            <DrawingCardsLoading />
            :
            <DrawingCards drawings={drawings}  />
           }
            
        </Grid >
    )
}
