import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux"
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./state/reducer"
import Chat from './components/chat';

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {console.error(e)}
};

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store = {store}>
        <Route exact path = "/" component = {App} />
        <Route exact path = "/chat" component = {Chat} />
      </Provider>
  </BrowserRouter>,

  document.getElementById('root')
);

reportWebVitals();
