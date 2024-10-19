import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { loginUserWithEmailAndPassword, startGoogleSignIn } from '../../store/auth/thunks'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const { email, password, onInputChange } = useForm(formData)
  const { status, errorMessage } = useSelector((state) => state.auth)

  const isAuthenticating = useMemo(() => status === 'Checking credentials...', [status])

  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUserWithEmailAndPassword({ email, password }))
  }

  const onGoogleSignIn = () => {
    console.log(' onGoogleSignIn')

    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn'>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label='Correo'
            type='email'
            placeholder='correo@google.com'
            fullWidth
            onChange={onInputChange}
            name='email'
            value={email}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label='Contraseña'
            type='password'
            placeholder='Contraseña'
            fullWidth
            name='password'
            value={password}
            onChange={onInputChange}
          />
        </Grid>

        <Grid container display={errorMessage ? '' : 'none'} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>

          <Grid item xs={12} sm={6}>
            <Button
              disabled={isAuthenticating}
              type='submit'
              variant='contained'
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={isAuthenticating}
              onClick={onGoogleSignIn}
              variant='contained'
              fullWidth
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Link component={RouterLink} color='inherit' to='/auth/register'>
            Crear una cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  )
}