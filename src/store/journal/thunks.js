import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNotes, setSaving, updateNote } from "./journalSlice";
import { loadNotes, fileUpload } from "../../helpers";


export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(activeNote));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        
        const fileUploadPromises = [];
        for (const file of files){
            fileUploadPromises.push(fileUpload(file))
        }

        const photosURLs = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNotes(photosURLs));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id));
    }
}