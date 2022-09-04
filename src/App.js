import React, {Fragment, useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Register from './components/Register'
import MainPage from "./components/MainPage";
import Login from "./components/Login";


function App() {
  const [isAuthenticated, setIsAuth] = useState(false);

  const isAuth = () => {
    if (document.cookie.indexOf('token=') !== -1) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }

  const setAuth = (boolean) => {
    setIsAuth(boolean);
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route 
            exact
            path='/'
            element={
            isAuthenticated ?
            <MainPage setAuth={setAuth}/> :
            <Navigate replace to='/register' />
          }
          />
          <Route 
            exact
            path='/register'
            element={
              isAuthenticated ? 
              <Navigate replace to='/' /> :
              <Register />}
          />
          <Route 
            exact
            path='/login'
            element={
              isAuthenticated ? 
              <Navigate replace to='/' /> :
              <Login setAuth={setAuth}/>}
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
