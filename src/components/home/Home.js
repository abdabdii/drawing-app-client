import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Gallery } from '../gallery/Gallery'
import { useNavigate } from 'react-router'
import { setDrawings } from '../../reducers/drawingsReducer'
import { setDone, setPending } from '../../reducers/loadingReducer'
import { fetchDrawings } from '../../services/drawingsServices'


export const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const drawings = useSelector((state) => state.drawings)

    useEffect(() => {
        const loadData = async () => {
            try{
                dispatch(setPending())
                let response = await fetchDrawings()
                dispatch(setDone())
                dispatch(setDrawings(response.data))
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
        <Gallery drawings={drawings} />
    )
}
