import React from 'react'
import { SketchPicker } from 'react-color';
import { useDispatch,useSelector } from 'react-redux';
import { updateColor } from '../../reducers/drawSettingsReducer';


export const ColorPicker = () => {
    const {color} = useSelector((state) => state.drawSettings)
    const  dispatch = useDispatch()

    const handleChangeComplete = (color) => {
        dispatch(updateColor(color))
    }

    return (
        
        <SketchPicker
        color={color}
        onChangeComplete={handleChangeComplete}
        />
    )
}
