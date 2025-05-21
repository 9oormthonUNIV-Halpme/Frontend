import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SignupProvider } from './context/SignupContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddressSearch from './pages/AddressSearch';


// import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>

          <SignupProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/search-address" element={<AddressSearch />} />

          </Routes>
          </SignupProvider>

        </Router>
      </div>
    );
  }
}


export default App;
