import { AUTH, AUTH_ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });

        // Correct usage of navigate
        if (navigate && typeof navigate === 'function') {
            navigate('/');
        }
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.response.data.message || 'An error occurred' });
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });

        // Correct usage of navigate
        if (navigate && typeof navigate === 'function') {
            navigate('/');
        }
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.response.data.message || 'An error occurred' });
    }
};
