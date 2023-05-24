import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { activeNote, savedMessage, isSaving } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(activeNote);
    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (savedMessage.length > 0) {
            Swal.fire('Nota actualizada', savedMessage, 'success');
        }
    }, [savedMessage])


    const onSaveNote = () => {
        dispatch(startSavingNote());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files.length === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }


    return (
        <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>
                    {dateString}
                </Typography>
            </Grid>
            <Grid item>
                <input type='file' multiple onChange={onFileInputChange}
                    style={{ display: 'none' }} ref={fileInputRef}
                />

                <IconButton color='primary' disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                    <span className="material-icons">upload</span>
                </IconButton>

                <Button color='primary' sx={{ padding: 2 }} onClick={onSaveNote} disabled={isSaving}>
                    <span className="material-icons" style={{ fontSize: 30, mr: 1 }}>
                        save
                    </span>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='Título'
                    name='title'
                    value={title}
                    onChange={onInputChange}
                    sx={{ border: 'none', mb: 1 }}
                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    name='body'
                    value={body}
                    onChange={onInputChange}
                    placeholder='Eventos para hoy'
                    minRows={5}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button onClick={onDelete} sx={{ mt: 2 }} color='error'>
                    <span className="material-icons">delete</span>
                </Button>
            </Grid>

            <ImageGallery images={activeNote.imageUrls} />
        </Grid>
    )
}
