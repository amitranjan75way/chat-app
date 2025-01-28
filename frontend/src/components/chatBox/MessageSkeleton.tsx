import React from 'react';
import style from './index.module.css';

const MessageSkeleton: React.FC = () => {
  return (
    <div className={style.skeletonMessage}>
      <div className={style.skeletonAvatar}></div>
      <div className={style.skeletonContent}>
        <div className={style.skeletonText}></div>
        <div className={style.skeletonText}></div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
