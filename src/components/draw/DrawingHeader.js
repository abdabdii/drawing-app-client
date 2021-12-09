import React from 'react'
import { Grid, IconButton, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setEdit, setTitle, unSetEdit } from '../../reducers/drawingReducer'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';



export const DrawingHeader = () => {
    const dispatch = useDispatch()
    const {title, edit} = useSelector((state) => state.drawingTitle)
    

    
    const handleTitle = (e) => {
        dispatch(setTitle(e.target.value))
    }

    const handleDoubleClick = async () => {
        await dispatch(setEdit())
    }

    const changeTitle = () => {
        dispatch(unSetEdit())
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            changeTitle()
          }
    }
    return (
        <Grid item sx={{display:'flex',justifyContent:'center', paddingY:'1rem'}}>
                {!edit?
                <Typography component='h3' variant='h4' textAlign='center' onDoubleClick={handleDoubleClick}>
                    {title}
                    <IconButton onClick={handleDoubleClick} >
                        <EditIcon fontSize='large' color='success' />
                    </IconButton>
                </Typography>:
                <>
                    <TextField hiddenLabel defaultValue={title} onChange={handleTitle} id='title-text-box' autoFocus onKeyDown={handleKeyDown} />
                    <IconButton onClick={changeTitle}>
                        <SaveIcon fontSize='large' color='success' />
                    </IconButton>
                </>
                }
        </Grid>
    )
}
