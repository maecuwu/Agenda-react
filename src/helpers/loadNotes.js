import { collection, getDocs, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async(uid = '') => {
    
    if (!uid) throw new Error('UID no establecido');

    const docs = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`));

    const notes = [];
    docs.forEach( doc => {
        notes.push({id: doc.id, ...doc.data()});
    });

    return notes;
}