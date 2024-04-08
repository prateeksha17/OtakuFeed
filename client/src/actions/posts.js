import * as api from '../api';

// Action Type Constants
const FETCH_ALL = 'FETCH_ALL';
const FETCH_ALL_ERROR = 'FETCH_ALL_ERROR';
const CREATE = 'CREATE';
const CREATE_ERROR = 'CREATE_ERROR';
const UPDATE = 'UPDATE';
const UPDATE_ERROR = 'UPDATE_ERROR';
const DELETE = 'DELETE';
const DELETE_ERROR = 'DELETE_ERROR';
const LIKE = 'LIKE';
const LIKE_ERROR = 'LIKE_ERROR';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data }); 
    } catch (error) {
        dispatch({ type: FETCH_ALL_ERROR, payload: error.message });
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
       const { data } = await api.createPost(post);
       console.log('Created post:', data);
       dispatch({ type: CREATE, payload: data });
    } catch(error) {
        dispatch({ type: CREATE_ERROR, payload: error.message });        
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        console.log('Updated post:', data);
        dispatch({ type: UPDATE, payload: data });
    } catch(error) {
        dispatch({ type: UPDATE_ERROR, payload: error.message });
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch(error) {
        dispatch({ type: DELETE_ERROR, payload: error.message });
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        console.log('Liked post:', data);
        dispatch({ type: LIKE, payload: data });
    } catch(error) {
        dispatch({ type: LIKE_ERROR, payload: error.message });
    }
}
