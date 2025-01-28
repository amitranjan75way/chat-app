// src/components/chatList/ChatListSkeletonLoad.tsx
import React from 'react';
import style from './index.module.css';

const ChatListSkeleton: React.FC = () => {
  return (
    <div className={style.chatItemSkeleton}>
      <div className={style.skeletonAvatar}></div>
      <div className={style.skeletonDetails}>
        <div className={style.skeletonHeader}></div>
        <div className={style.skeletonMessage}></div>
      </div>
    </div>
  );
};

export default ChatListSkeleton;
