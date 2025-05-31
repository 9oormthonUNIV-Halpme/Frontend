import React, { Component, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { SignupProvider } from './context/SignupContext';
import { WebSocketProvider } from './context/WebSocketContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Writing from './pages/Writing';
import ChatList from './pages/ChatList';
import Chat from './pages/Chat';
import MyPage from './pages/MyPage';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import HelpHistoryPage from './pages/HelpHistoryPage';
import VolunteerHistoryPage from './pages/VolunteerHistoryPage';
import Honor from './pages/Honor'; 

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <AuthProvider>
            <WebSocketProvider>
              <SignupProvider>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/edit-profile" element={<Signup />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/writing" element={<Writing />} />
                  <Route path="/chat-list" element={<ChatList />} />
                  <Route path="/my-page" element={<MyPage />} />
                  <Route path="/post-list" element={<PostList />} />
                  <Route path="/post/:postId" element={<PostDetail />} />
                  <Route path="/chat/:chatroomId" element={<Chat />} />
                  <Route path="/help-history" element={<HelpHistoryPage />} />
                  <Route path="/volunteer-history" element={<VolunteerHistoryPage />} />
                  <Route path="/honor" element={<Honor />} />
                </Routes>
              </SignupProvider>
            </WebSocketProvider>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}


export default App;
