import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth';

export const NavBar = ({ drawerWidth }) => {

    const dispatch = useDispatch();
    
    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar position='fixed' sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` }
        }}
        >
            <Toolbar>
                <IconButton color='inherit' edge='start' sx={{ mr: 2, display: { sm: 'none' } }}>
                    <span className="material-icons">menu</span>
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> Journal App </Typography>

                    <IconButton color='error' onClick={onLogout}>
                        <span className="material-icons">logout</span>
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
