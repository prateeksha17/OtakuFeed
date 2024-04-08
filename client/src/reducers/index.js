import { combineReducers } from 'redux';

import posts from '../reducers/posts'
import auth from '../reducers/auth'

export default combineReducers({
    posts,
    auth
});