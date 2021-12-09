import { Grid} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { DrawingBody } from './DrawingBody'
import { DrawingHeader } from './DrawingHeader'







export const Draw = () => {
    
    const {token} = useSelector((state) => state.user)    
    let isAuthed = token.length >= 64

    return (
        <>
        {isAuthed ?
        <Grid container flexDirection='column'>
            <DrawingHeader />
            <DrawingBody />   
        </Grid>
        :
        <Navigate to="/login" />
        }
        </>
    )
}
