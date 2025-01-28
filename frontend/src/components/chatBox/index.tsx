import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './index.module.css';
import { setMessages } from '../../store/reducers/messageReducer';
import { useGetGroupMessageQuery } from '../../services/chatApi';
import MessageSkeleton from './MessageSkeleton';
import { Message, ChatResponse } from '../../types'; 
import SendMessage from './sendMessage';
import { useAppSelector } from '../../store/store';

const ChatBox: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedGroupId, messages } = useSelector((state: any) => state.messageReducer);

  // Fetch messages only if `selectedGroupId` exists
  const { data, isLoading } = useGetGroupMessageQuery(selectedGroupId || '', {
    skip: !selectedGroupId,
  });

  // Type data and messages correctly
  const allMessages: Message[] = data?.messages || [];

  useEffect(() => {
    if (allMessages.length > 0) {
      dispatch(setMessages(allMessages));
    }
  }, [messages, dispatch, allMessages]);

  return (
    <div className={style.chatContainer}>
      {selectedGroupId ? (
        <>
          <div className={style.chatHeader}>
            {/* Add logic to display group details */}
            <h3>Group Name</h3>
          </div>
          <div className={style.chatBody}>
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <MessageSkeleton key={index} />
                ))}
              </>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className={style.chatMessage}>
                  <div className={style.messageContainer}>
                    <img
                      src={msg.sender.profilePic || 'https://via.placeholder.com/40'}
                      alt={msg.sender.name}
                      className={style.messageAvatar}
                    />
                    <div className={style.messageContent}>
                      <span className={style.senderName}>{msg.sender.name}</span>
                      <p>{msg.content}</p>
                      <span className={style.timestamp}>
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <SendMessage />
        </>
      ) : (
        <p>Please select a group to start chatting</p>
      )}
    </div>
  );
};

export default ChatBox;
