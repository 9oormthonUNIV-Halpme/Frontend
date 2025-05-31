import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import PostItem from '../components/PostItem';
import MobileLayout from '../components/MobileLayout';
import BottomNavigationBar from '../components/BottomNavigationBar'; // ✅ 직접 import

const PostList = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(!token) return;
    
    axios.get('https://halpme.site/api/v1/posts', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      //console.log('📦 응답 데이터:', res.data);
      setPosts(res.data.data);
    })
    .catch(err => {
      console.error(err);
    });
  }, [token]);

  return (
    <MobileLayout>
      <Wrapper>
        <Region>개신동</Region>
        {Array.isArray(posts) && posts.map(post => (
          <PostItem
            key={post.postId}
            postId={post.postId}
            title={post.title}
            date={post.requestDate}
            startTime={post.startHour}
            endTime={post.endHour}
            nickname={post.nickname}
            createdAgo={post.createdAgo}
          />
        ))}
      </Wrapper>
      <BottomNavigationBar /> 
    </MobileLayout>
  );
};

export default PostList;

// ===== styled-components =====
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 16px 12px 80px 12px; // 하단 네비 여백 고려
  overflow-y: auto;
  box-sizing: border-box;
`;

const Region = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin: 16px 0;
  text-align: center;
`;
