import { Avatar, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchUserDrawings } from '../../services/drawingsServices'
import { Gallery } from '../gallery/Gallery'
import { useNavigate } from 'react-router'
import { setDrawings } from '../../reducers/drawingsReducer'
import { setDone, setPending } from '../../reducers/loadingReducer'
import { useDispatch, useSelector } from 'react-redux'
import { saveSingleUser } from '../../reducers/userReducer'
import { Box } from '@mui/system'
import { UploadImage } from './UploadImage'


export const User = () => {
    const {id} =useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {singleUser} = useSelector((state) => state.user)
    const loading = useSelector((state) => state.loading)
    const drawings = useSelector((state) => state.drawings)
    

    useEffect(() => {
        const loadData = async () => {
            try{
                dispatch(setPending())
                let response = await fetchUserDrawings(id)
                
                
                dispatch(setDone())
                dispatch(setDrawings(response.data))
                dispatch(saveSingleUser(response.data[0].user))
            } catch(e){
                alert(`Could not fetch data ${e.message}`)
                dispatch(setDone())
                navigate('/home', {replace: true})
            }
        }
        loadData()
        // eslint-disable-next-line 
    }, [])


    return (
        <Grid container sx={{flexDirection:'column',width:'97%'}}  spacing={2}>
            <Grid item sx={{display:'flex',justifyContent:'space-between',margin:'1rem',alignItems:'center',flexWrap='wrap'}}>
                
                {!loading?<Box >
                <Typography
                    variant='h5'
                    component='span'
                    textAlign='center'
                    sx={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingRight:'1rem'}}
                >
                    <Avatar src={singleUser.image} variant="outlined" sx={{ my: 1, mx: 1.5 }}/>
                    {`${singleUser.name}'s Gallary`}
                </Typography>
                   
                </Box>:''}
                <UploadImage id={id} />
            </Grid>
            <Divider />
            <Gallery drawings={drawings} />
            
        </Grid>
    )
}
