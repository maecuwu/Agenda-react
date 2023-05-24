import { Grid, Typography } from '@mui/material'
import React from 'react'

export const NothingSelectedView = () => {
    return (
        <Grid container spacing={0} direction="column"
            alignItems="center" justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 }}
        >

            <Grid item xs={12}>
                <span className="material-icons" style={{color: 'white', fontSize: 50}}>
                    star
                </span>
            </Grid>
            <Grid item xs={12}>
                <Typography color='white' variant='h5'>
                    Selecciona o crea una entrada
                </Typography>
            </Grid>

        </Grid>
    )
}
