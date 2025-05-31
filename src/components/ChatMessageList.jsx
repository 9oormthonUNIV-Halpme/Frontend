import React from "react";
import styled from "styled-components";
import { formatTime, isSameMinute } from "../utils/timeFormat";
import profileImgIcon from "../assets/HalpmeLogo.svg";

const ChatMessageList = ({ messages, currentUser }) => {
  if (!currentUser) {
    return null;
  }

  return (
    <ChatContainer>
      {messages.map((msg, index) => {
        const isCurrentUser = msg.sender === currentUser;
        const hasImage = Array.isArray(msg.imageUrls) && msg.imageUrls.length > 0;
        const timeText = formatTime(msg.createdAt);
        const nextMsg = messages[index + 1];
        const prevMsg = messages[index - 1];
        const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;
        
        // 타임스탬프 표시 여부
        const isLastOfSameMinute =
          !nextMsg ||
          nextMsg.sender !== msg.sender ||
          !isSameMinute(msg.createdAt, nextMsg.createdAt);

        // 프로필 이미지 표시 여부 (이전 메시지와 보낸 사람이 다르면 true)
        const showProfileImage =
          !isCurrentUser &&
          (!prevMsg || prevMsg.sender !== msg.sender);

        return (
          <MessageRow key={index} isCurrentUser={isCurrentUser} isLastInGroup={isLastInGroup}>
            <MessageWrapper isCurrentUser={isCurrentUser}>
              {!isCurrentUser && showProfileImage && (
                <ProfileImage src={msg.profileImageUrl || profileImgIcon} alt="프로필 이미지" />
              )}
              {!isCurrentUser && !showProfileImage && <ProfileSpacer />} 

              {isCurrentUser ? (
                <>
                  {isLastOfSameMinute && <Timestamp isCurrentUser={isCurrentUser}>{timeText}</Timestamp>}
                  {msg.readStatus === "false" && <ReadStatus>1</ReadStatus>}
                  <MessageBubble isCurrentUser={isCurrentUser}>
                    {hasImage
                      ? msg.imageUrls.map((url, i) => (
                          <MessageImage key={i} src={url} alt="전송 이미지" isCurrentUser={isCurrentUser} />
                        ))
                      : <MessageText isCurrentUser={isCurrentUser}>{msg.message}</MessageText>
                    }
                  </MessageBubble>
                </>
              ) : (
                <>
                  <MessageBubble isCurrentUser={isCurrentUser}>
                    {hasImage
                      ? msg.imageUrls.map((url, i) => (
                          <MessageImage key={i} src={url} alt="전송 이미지" isCurrentUser={isCurrentUser} />
                        ))
                      : <MessageText isCurrentUser={isCurrentUser}>{msg.message}</MessageText>
                    }
                  </MessageBubble>
                  {msg.readStatus === "false" && <ReadStatus>1</ReadStatus>}
                  {isLastOfSameMinute && <Timestamp isCurrentUser={isCurrentUser}>{timeText}</Timestamp>}
                </>
              )}
            </MessageWrapper>
          </MessageRow>
        );
      })}
    </ChatContainer>
  );
};

export default ChatMessageList;


const ChatContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #F5F5F5;  
`;

const MessageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${({ isCurrentUser }) => (isCurrentUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 16px; 
`;

const MessageRow = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCurrentUser' && prop !== 'isLastInGroup',
})`
  display: flex;
  justify-content: ${({ isCurrentUser }) => (isCurrentUser ? 'flex-end' : 'flex-start')};
  margin-bottom: ${({ isLastInGroup }) => (isLastInGroup ? '8px' : '0')};
`;


const MessageBubble = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})`
  max-width: ${({ isCurrentUser }) => (isCurrentUser ? '210px' : '175px')};
  padding: 8px 16px;
  border-radius: ${({ isCurrentUser }) => (isCurrentUser ? '16px 0px 16px 16px' : '0px 16px 16px 16px')};
  background-color: ${({ isCurrentUser }) => (isCurrentUser ? '#2B9E90' : '#ffffff')};
  text-align: left;
  word-break: break-word;
`;

const MessageText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})`
  font-size: 14px;
  color: ${({ isCurrentUser }) => (isCurrentUser ? '#ffffff' : '#000000')};
  
`;

const MessageImage = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})`
  width: 140px;
  border-radius: ${({ isCurrentUser }) => (isCurrentUser ? '16px 0px 16px 16px' : '0px 16px 16px 16px')};
`;

const Timestamp = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})`
  font-size: 10px;
  color: #888888;
  margin: 0px 2px 0px 2px;
`;

const ReadStatus = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})`
  font-size: 12px;
  color: #000000;
  margin-left: 2px;
  margin-right: 2px;
  white-space: nowrap;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ProfileSpacer = styled.div`
  width: 48px; // 프로필 이미지와 동일한 너비 확보
`;
