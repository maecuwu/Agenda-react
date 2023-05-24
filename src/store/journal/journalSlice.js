import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        activeNote: null
    },
    reducers: {
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.savedMessage = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.savedMessage = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( (nota) => {
                if (nota.id === action.payload.id) {
                    return action.payload;
                }
                return nota;
            });
            state.savedMessage = `${action.payload.title}, actualizada correctamente`;
        },        
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter( (nota) => nota.id !== action.payload);
            state.activeNote = null;
        },
        setPhotosToActiveNotes: (state, action) => {
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearStateLogout: (state) => {
            state.isSaving = false;
            state.savedMessage = '';
            state.notes = [];
            state.activeNote = null;
        }
    }
});


export const { addNewEmptyNote, setActiveNote, setNotes, 
    setSaving, updateNote, deleteNoteById, setPhotosToActiveNotes, clearStateLogout } = journalSlice.actions;