import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar, SideBar } from '../components';



const drawerWidth = 240;


export const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>

            {/* Navbar */}
            <NavBar drawerWidth={drawerWidth} />

            {/* Sidebar */}
            <SideBar drawerWidth={drawerWidth} />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
                className='animate__animated animate__fadeIn'
            >
                
                <Toolbar></Toolbar>

                {children}

            </Box>
        </Box>
    )
}
