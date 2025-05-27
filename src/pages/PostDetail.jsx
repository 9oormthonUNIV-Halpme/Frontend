import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

import MobileLayout from "../components/MobileLayout";
import PostContent from "../components/PostContent";
import PostAuthorButtons from "../components/PostAuthorButtons";
import PostVisitorButtons from "../components/PostVisitorButtons";

const mockPosts = [
  {
    postId: 1,
    title: "첫 번째 게시글",
    nickname: "이충북",
    content: "첫 번째 게시글의 내용입니다. 저희 어머니가 거동이 불편하셔서 병원까지 부축해주실 분을 찾고 있어요. 짧은 시간만 도와주셔서도 정말 큰 도움이",
    address: {
      zipCode: "12345",
      basicAddress: "서울특별시 강남구...",
      detailAddress: "테헤란로 123",
      direction: "2층 왼쪽"
    },
    requestDate: "2025-05-26",
    requestTime: "10:00",
    date: "2025-05-26"
  },
];

const PostDetail = () => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
      setPost(mockPosts[0]);
  }, []);

  useEffect(() => {
    if(user && post){
      setIsAuthor(user.nickname === post.nickname);
    }
    else {
      setIsAuthor(false);
    }
  }, [user, post]);

  return (
    <MobileLayout>
      <PostContent value={post} />

      {isAuthor 
        ? ( <PostAuthorButtons /> )
        : ( <PostVisitorButtons /> )
      }
    </MobileLayout>
  );
}

export default PostDetail;