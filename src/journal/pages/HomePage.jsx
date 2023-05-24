import { useDispatch, useSelector } from "react-redux";
import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { startNewNote } from "../../store/journal";


export const HomePage = () => {

    const { isSaving, activeNote } = useSelector(state => state.journal);
    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <JournalLayout>
            {
                (activeNote)
                    ? <NoteView />
                    : <NothingSelectedView />
            }

            <IconButton size='large' sx={{
                color: 'white',
                backgroundColor: 'error.main',
                ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                position: 'fixed',
                right: 50,
                bottom: 50
            }}
                onClick={onClickNewNote} disabled={isSaving}
            >
                <span className="material-icons">add</span>
            </IconButton>
        </JournalLayout>
    )
}
