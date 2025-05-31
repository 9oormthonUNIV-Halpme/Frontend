import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import styled from "styled-components";

import MobileLayout from "../components/MobileLayout";
import PostContent from "../components/PostContent";
import PostAuthorButtons from "../components/PostAuthorButtons";
import PostVisitorButtons from "../components/PostVisitorButtons";

const PostDetail = () => {
  const { user, token } = useContext(AuthContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if(!token) return ;

      try {
        const response = await axios.get(`https://halpme.site/api/v1/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            postId: postId
          },
        });
        setPost(response.data.data);
      }
      catch {
        console.error("포스트 상세 조회가 실패하였습니다.")
      }
    };

    if(postId){
      fetchPostDetail();
    }

  }, []);

  useEffect(() => {
    if(user && post){
      setIsAuthor(user.nickname === post.nickname);
    }
    else {
      setIsAuthor(false);
    }
  }, [user, post]);

  if(!post) return;

  return (
    <MobileLayout>
      <PostContent value={post} />

      {isAuthor 
        ? ( <PostAuthorButtons value={post} /> )
        : ( <PostVisitorButtons postId={post.postId}/> )
      }
    </MobileLayout>
  );
}

export default PostDetail;