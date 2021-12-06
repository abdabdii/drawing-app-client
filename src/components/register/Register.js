import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MatLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, registerUser, validateForm } from '../../services/AuthAndRegister';
import { useNavigate, Link, Navigate } from "react-router-dom";
import { duplicated } from '../../reducers/errorsReducer';
import { setDone, setPending } from '../../reducers/loadingReducer';
import { CircularProgress } from '@mui/material';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MatLink color="inherit" href="https://shido.dev/">
        Shido
      </MatLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
    let navigate = useNavigate()
    const {register} = useSelector((state) => state.errors)
    const loading = useSelector((state) => state.loading)
    const {token} = useSelector((state) => state.user)
    const dispatch = useDispatch()
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget)
      const noError = await validateForm(data, dispatch)
      
      if(noError){
        dispatch(setPending())
          try{
            let response = await registerUser({
                username:data.get('username'),
                name:`${data.get('firstName')} ${data.get('lastName')}`,
                password:data.get('password')
              })
              if (response.status===200){
                await authenticateUser(response.data['username'],data.get('password'),dispatch,navigate)
            }
            
          }catch{
              dispatch(duplicated())
              
          }
          dispatch(setDone())
      }

      
    };

  return (
    <>
    {token.length <= 64?
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={register['firstName']}
                  helperText={register['firstName']?'Please enter a valid value':''}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={register['lastName']}
                  helperText={register['lastName']?'Please enter a valid value':''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  error={register['username']}
                  helperText={register['username']?'Please enter a valid value':''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={register['password']}
                  helperText={register['password']?'Please enter a valid value':''}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              { loading?<CircularProgress sx={{color:'white'}} />:'Sign Up'}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" >
                    <Typography  variant="body2">
                    Already have an account? Sign in
                    </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>:<Navigate to="/home" />}
    </>
  );
}