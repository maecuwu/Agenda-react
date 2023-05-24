import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmail } from '../../store/auth'



const formData = {
    email: '',
    displayName: '',
    password: ''
}

const validations = {
    email: [(value) => value.includes('@'), 'El correo debe tener una @'],
    password: [(value) => value.length >= 6, 'La contraseña debe tener minimo 6 caracteres'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}


export const RegisterPage = () => {

    const { errorMessage, status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { email, displayName, password, onInputChange, formState,
        isFormValid, emailValid, displayNameValid, passwordValid } = useForm(formData, validations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmail(formState));
    }

    return (
        <AuthLayout title='Crear cuenta'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='Nombre completo' type='text' placeholder='Paquito Perez'
                            fullWidth name='displayName' onChange={onInputChange} value={displayName}
                            error={!!displayNameValid && formSubmitted}
                            helperText={(!!displayNameValid && formSubmitted) ? displayNameValid : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='Correo' type='email' placeholder='correo@gmail.com'
                            fullWidth name='email' onChange={onInputChange} value={email}
                            error={!!emailValid && formSubmitted}
                            helperText={(!!emailValid && formSubmitted) ? emailValid : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='Contraseña' type='password' placeholder='******'
                            fullWidth name='password' onChange={onInputChange} value={password}
                            error={!!passwordValid && formSubmitted}
                            helperText={(!!passwordValid && formSubmitted) ? passwordValid : ''}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={(!!errorMessage) ? '' : 'none'}>
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' fullWidth type='submit' disabled={isAuthenticating}>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
                        <Link to='/auth/login' color='inherit' component={RouterLink}>
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
