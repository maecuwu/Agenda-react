import { useDispatch } from 'react-redux';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/journal';

export const SidebarItem = ({ note }) => {
    
    const dispatch = useDispatch();

    const setCurrentActive = () => {
        dispatch(setActiveNote(note));
    }
    
    
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={setCurrentActive}>
                <ListItemIcon>
                    <span className="material-icons">bookmark</span>
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={(note.title) ? note.title : 'Sin titulo'} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
