import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SignupProvider } from './context/SignupContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Writing from './pages/Writing';

// import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <SignupProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/writing" element={<Writing />} />
            </Routes>
          </SignupProvider>
        </Router>
      </div>
    );
  }
}


export default App;
