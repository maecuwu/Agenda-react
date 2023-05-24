import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { SidebarItem } from './';

export const SideBar = ({ drawerWidth }) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    return (
        <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer variant='permanent' open sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}>

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName.charAt(0).toLocaleUpperCase() + displayName.substring(1, 100)}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SidebarItem key={note.id} note={note} />
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
