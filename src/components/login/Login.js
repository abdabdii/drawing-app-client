import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MatLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../../services/AuthAndRegister';
import { Link, useNavigate, Navigate } from "react-router-dom";








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

export default function Login() {
  let navigate = useNavigate()
  const {token} = useSelector((state) => state.user)
  const dispatch = useDispatch()


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    await authenticateUser(data.get('username'), data.get('password') ,dispatch, navigate)
  };

  return (
    <>
    {!token.length >= 64?
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {token==='invalid'?
            <Typography component="h5" color="#d32f2f">
                Invalid username or password
            </Typography>:
            null
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
              <Link to="/register" >
                <Typography  variant="body2">
                   {"Don't have an account? Sign Up"}
                 </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>:<Navigate to="/home" />}
    </>
  );
}