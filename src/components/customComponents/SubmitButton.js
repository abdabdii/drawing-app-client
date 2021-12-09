import React from 'react'
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';


export const SubmitButton = ({text}) => {
    const loading = useSelector((state) => state.loading)
    return (
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              { loading?<CircularProgress sx={{color:'white'}} />:text}
            </Button>
    )
}
