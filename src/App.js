import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

// import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </div>
    );
  }
}


export default App;
