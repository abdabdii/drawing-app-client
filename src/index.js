import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux'
import { createStore } from 'redux'
import userReducer from './reducers/userReducer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Home } from './components/home/Home';
import errorsReducer from './reducers/errorsReducer';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { Header } from './components/header/Header';
import { User } from './components/user/User';
import { Draw } from './components/draw/Draw';
import colorReducer from './reducers/colorReducer';
import drawingReducer from './reducers/drawingReducer';
import loadingReducer from './reducers/loadingReducer';
import { Error404 } from './components/error404/Error404';
import drawingsReducer from './reducers/drawingsReducer';






const reducer = combineReducers({
  user:userReducer,
  errors: errorsReducer,
  color: colorReducer,
  drawingTitle: drawingReducer,
  loading: loadingReducer,
  drawings:drawingsReducer


})

const store = createStore(reducer,composeWithDevTools())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="/draw" element={<Draw />} />
          <Route path="/draw/:id" element={<Draw />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
