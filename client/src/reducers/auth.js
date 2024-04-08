import { AUTH, LOGOUT } from '../constants/actionTypes';

const initialState = {
  authData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH: {
      const updatedAuthData = action?.data;
      localStorage.setItem('profile', JSON.stringify(updatedAuthData));
      return { ...state, authData: updatedAuthData };
    }

    case LOGOUT: {
      localStorage.clear();
      return { ...state, authData: null };
    }

    default:
      return state;
  }
};

export default authReducer;
