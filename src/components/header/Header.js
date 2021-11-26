import { Avatar, CssBaseline, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, saveUser } from '../../reducers/userReducer';




export const Header = () => {
    const {token ,user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
      localStorage.clear()
      dispatch(authUser(''))
      dispatch(saveUser(''))

      navigate('/home', {replace:true})

    }
    return (
        <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <CssBaseline />
        <Toolbar  sx={{ flexWrap: 'wrap', display:'flex',justifyContent:'space-between' }}>
          <Link to='/home' style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="black" noWrap sx={{ flexGrow: 1 }}>
                    Drawing App
                </Typography>
          </Link>
          <nav style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
            {token.length <= 64?
            <>
            <Link
              to='register'
              style={{ textDecoration: 'none' }}
            >
                <Typography 
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}>
                Register
                </Typography>
                </Link>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  <Button  variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                      Login
                  </Button>
                </Link>
          </>:
          <>
            
            <Button  variant="text" color='error' onClick={handleLogout} sx={{ my: 1, mx: 1.5 }}>
                  Logout
            </Button>

            <Link to='/draw' style={{ textDecoration: 'none' }}>
              <Button  variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                  Draw
              </Button>
            </Link>

            <Typography 
            variant='span'
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}>
            {user.name}
            </Typography>
            
            <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
              <Avatar src={user.image} variant="outlined" sx={{ my: 1, mx: 1.5 }}/>
            </Link>
          </>

          }
          </nav>
          
        </Toolbar>
      </AppBar>
    )
}



