import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.displayName = payload.displayName;
            state.email = payload.email;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, action) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.photoURL = null;
            state.errorMessage = action.payload?.errorMessage;
        },
        checkCredentials: (state) => {
            state.status = 'checking'
        }
    }
});


export const { login, logout, checkCredentials } = authSlice.actions;