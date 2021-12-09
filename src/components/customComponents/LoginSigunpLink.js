import { Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';


export const LoginSigunpLink = ({redirect, text}) => {
    return (
      <Grid container>
        <Grid item>
            <Link to={redirect} >
                <Typography  variant="body2">
                    {text}
                </Typography>
          </Link>
        </Grid>
      </Grid>
    )
}
