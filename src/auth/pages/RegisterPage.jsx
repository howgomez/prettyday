import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length > 6, 'La contraseña debe tener 6 caracteres'],
  displayName: [(value) => value.length >= 2, 'El nombre es obligatorio']
}

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {
    email,
    password,
    displayName,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid
  } = useForm(formData, formValidations)

  const dispatch = useDispatch()

  // Obtener estado de autenticación para verificar si hay algun error...
  const { status, errorMessage } = useSelector((state) => state.auth)
  const isAuthenticating = useMemo(() => status === 'Checking credentials...', [status])

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return

    dispatch(startCreatingUserWithEmailAndPassword(formState))
    console.log(formState)
  }

  return (
    <AuthLayout title='Registro'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn'>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label='Nombre completo'
            type='text'
            placeholder='Fernando doe'
            fullWidth
            name='displayName'
            value={displayName}
            onChange={onInputChange}
            error={!!displayNameValid && formSubmitted}
            helperText={displayNameValid}

          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label='Correo'
            type='email'
            placeholder='correo@google.com'
            fullWidth
            name='email'
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={emailValid}

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
            error={!!passwordValid && formSubmitted}
            helperText={passwordValid}

          />
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ mb: 2, mt: 1 }}
          // Desactivar alert si no hay mensaje de error
          display={errorMessage ? '' : 'none'}

        >
          {/* Mostrar alert si hay mensaje de error */}
          <Grid item xs={12} sm={6}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Button
            // Desactivar button si estamos comprobando credenciales
              disabled={isAuthenticating}
              onClick={onSubmit}
              variant='contained'
              fullWidth
            >
              Crear cuenta
            </Button>
          </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Typography sx={{ mr: 1 }}>Ya tengo una cuenta</Typography>
          <Link component={RouterLink} color='inherit' to='/auth/login'>
            Ingresar
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  )
}
