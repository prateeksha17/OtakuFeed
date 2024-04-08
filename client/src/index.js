import React, { StrictMode} from 'react';
import { createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';
import './index.css';
import App from './App';
import rootReducer from './reducers/index';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
