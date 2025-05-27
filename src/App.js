import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SignupProvider } from './context/SignupContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Writing from './pages/Writing';
import ChatList from './pages/ChatList';
import Chat from './pages/Chat';
import MyPage from './pages/MyPage';
import PostDetail from './pages/PostDetail';


// import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <AuthProvider>
            <SignupProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/writing" element={<Writing />} />
                <Route path="/chat-list" element={<ChatList />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/my-page" element={<MyPage />} />
                <Route path="/post-detail" element={<PostDetail />} />
              </Routes>
            </SignupProvider>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}


export default App;
