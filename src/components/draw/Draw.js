import { Button, ButtonGroup, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { useDispatch, useSelector } from 'react-redux'
import { ColorPicker } from './ColorPicker'
import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import { Navigate, useNavigate, useParams } from 'react-router'
import { setEdit, setTitle, unSetEdit } from '../../reducers/drawingReducer'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { fetchDrawing, postDrawing, updateDrawing } from '../../services/drawingsServices'
import { setDone, setPending } from '../../reducers/loadingReducer'






export const Draw = () => {
    const color = useSelector((state) => state.color)
    const {token, user} = useSelector((state) => state.user)
    const {title, edit} = useSelector((state) => state.drawingTitle)
    const loading = useSelector((state) => state.loading)
    const dispatch = useDispatch()
    const {id} = useParams()
    const hasId = id? id.length >3:''
    let navigate = useNavigate()

    let canvas =null

    const handleErase = () => {
        canvas.clear()
    }

    const handleUndo = () => {
        canvas.undo()
    }

    const handleSave = async () => {
        dispatch(setPending())
        const drawing = compressToUTF16(canvas.getSaveData())

        if (hasId) {
            try{
                await updateDrawing({title, drawing,drawingImg:canvas.getDataURL(), token,drawingId:id})
                dispatch(setDone())
                navigate('/home', { replace: true })
           }catch{
               alert('Could not Update the drawing')
               dispatch(setDone())
           }

        }else{
            try{
                await postDrawing({title, drawing,drawingImg:canvas.getDataURL(), token})
                dispatch(setDone())
                navigate('/home', { replace: true })
           }catch{
               alert('Could not add the drawing')
               dispatch(setDone())
           }
        }
          
    }

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

    useEffect(() => {
       
        const loadDrawing = async (loadedCanvas) => {
            let response = null
            
            try {
                
                response = await fetchDrawing(id)
                const {title, drawing, user:drawingId} = response.data
                if(!user.id===drawingId){
                    navigate('/error404', { replace: true })
                }
                dispatch(setTitle(title))
                console.log(decompressFromUTF16(drawing));
                setTimeout(()=>loadedCanvas.loadSaveData(decompressFromUTF16(drawing),true),1000) 
                console.log('shido');
            } catch (e){
                console.log('NotOwner');
                navigate('/error404', { replace: true })
            }
        }
        
        if (hasId){
                    loadDrawing(canvas)
                
        }
        // eslint-disable-next-line
    }, [canvas])

    

    return (
        <>
        {token.length >= 64 ?
        <Grid container flexDirection='column'>
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
            <Grid container sx={{width:'100%',justifyContent:'space-evenly',marginTop:'1rem',paddingBottom:'2rem'}} spacing={0.5}>
            <Grid item xs={12} md={3} sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <ColorPicker  />
                <Button sx={{width:'220px',marginY:'1rem'}} onClick={handleSave} variant='contained' color='success' disabled={loading}>
                    {loading?<CircularProgress sx={{color:'white'}} />:'Save'}
                </Button>
                <Box sx={{display:'flex',justifyContent:'space-between',width:'220px',marginY:'1rem'}}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={handleErase}>Erase</Button>
                        <Button onClick={handleUndo}>Undo</Button>
                    </ButtonGroup>
                </Box>
                
            </Grid>
            <Grid item xs={12} md={8}>
                <CanvasDraw 
                ref={canvasDraw => (canvas = canvasDraw)}
                brushColor={color.hex}

                />
            </Grid>
        </Grid>

        </Grid>
        :
        <Navigate to="/login" />
        }
        </>
    )
}
