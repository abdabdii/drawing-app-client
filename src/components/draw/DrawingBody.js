import { Button, ButtonGroup, CircularProgress, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorPicker } from './ColorPicker'
import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import {  postDrawing, updateDrawing } from '../../services/drawingsServices'
import { setDone, setPending } from '../../reducers/loadingReducer'
import { useNavigate, useParams } from 'react-router'
import CanvasDraw from 'react-canvas-draw'
import { fetchDrawing } from '../../services/drawingsServices'
import { setTitle } from '../../reducers/drawingReducer'
import Slider from '@mui/material/Slider'
import { updateBrushSize } from '../../reducers/drawSettingsReducer'



export const DrawingBody = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {token, user} = useSelector((state) => state.user)
    const {title } = useSelector((state) => state.drawingTitle)
    const loading = useSelector((state) => state.loading)
    const {color, brushSize} = useSelector((state) => state.drawSettings)

    const {id} = useParams()
    const hasId = id? id.length >3:''

    let canvas =null

    const handleErase = () => {
        canvas.clear()
    }

    const handleUndo = () => {
        canvas.undo()
    }

    const handleBrushSize = (e) => {
        let newSize = e.target.value
        dispatch(updateBrushSize(parseInt(newSize)))
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
            } catch (e){
                navigate('/error404', { replace: true })
            }
        }
        
        if (hasId){
                    loadDrawing(canvas)
                
        }
        // eslint-disable-next-line
    }, [canvas])

    return (
        <Grid container sx={{width:'100%',justifyContent:'space-evenly',marginTop:'1rem',paddingBottom:'2rem'}} spacing={0.5}>
            <Grid item xs={12} md={3} sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <ColorPicker  />
                <Typography variant="h5" component="h5" sx={{marginBlock:'1rem'}}>
                    Brush Size
                </Typography>
                <Slider defaultValue={brushSize} aria-label="Default" valueLabelDisplay="auto" sx={{width:'220px'}} onChange={handleBrushSize} />  
                <Button sx={{width:'220px',marginY:'1rem'}} onClick={handleSave} variant='contained' color='success' disabled={loading}>
                    {loading?<CircularProgress sx={{color:'white'}} />:'Save'}
                </Button>
                
                <Box sx={{display:'flex',justifyContent:'space-between',width:'220px',marginY:'1rem'}}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={handleErase} sx={{width:'110px'}}>Erase</Button>
                        <Button onClick={handleUndo} sx={{width:'110px'}}>Undo</Button>
                    </ButtonGroup>
                </Box>
                   
            </Grid>
            <Grid item xs={12} md={8}>
            <CanvasDraw
            brushRadius={brushSize}
            ref={canvasDraw => (canvas = canvasDraw)}
            brushColor={color.hex}
            />
            </Grid>
        </Grid>
    )
}
