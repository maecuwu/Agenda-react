import { authSlice, checkCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authslice', () => {

    test('Estado inicial y llamarse auth', () => {
        const state = authSlice.reducer(initialState, {});

        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);
    });

    test('Debe de realizar la autenticacion', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual(authenticatedState);
    });

    test('Debe de realizar el logout', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('Logout con mensaje de error', () => {
        const errorMessage = 'error123';
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        expect(state).toEqual({
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'error123'
        });
    })

    test('Debe cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkCredentials());
        expect(state.status).toBe('checking')
    })
})