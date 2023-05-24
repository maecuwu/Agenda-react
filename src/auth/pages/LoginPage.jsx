import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLoginWithEmail } from '../../store/auth'
import { useMemo } from 'react'


const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const { email, password, onInputChange, formState } = useForm(formData);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(startLoginWithEmail(formState));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }


    return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='Correo' type='email' placeholder='correo@gmail.com'
                            fullWidth name='email' onChange={onInputChange} value={email}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='Contraseña' type='password' placeholder='****'
                            fullWidth name='password' onChange={onInputChange} value={password}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={(!!errorMessage) ? '' : 'none'}>
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant='contained' fullWidth type='submit' disabled={isAuthenticating}>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant='contained' fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating}>
                                <span className="material-icons" style={{ marginRight: '10px' }}>alternate_email</span>
                                Google
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link to='/auth/register' color='inherit' component={RouterLink}>
                            Crear una cuenta nueva
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
