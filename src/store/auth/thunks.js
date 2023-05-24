import { loginWithEmail, logoutFirebase, registerWithEmail, signInWithGoogle } from "../../firebase/providers";
import { clearStateLogout } from "../journal/journalSlice";
import { checkCredentials, login, logout } from "./"

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkCredentials());

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startCreatingUserWithEmail = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkCredentials());

        const result = await registerWithEmail({ email, password, displayName });
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
}

export const startLoginWithEmail = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkCredentials());

        const result = await loginWithEmail({ email, password });
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearStateLogout());
        dispatch(logout());
    }
}