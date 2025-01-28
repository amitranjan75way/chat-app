import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import style from './index.module.css';
import ChatBox from '../../components/chatBox';
import ChatList from '../../components/chatList';

const SOCKET_URL = 'http://localhost:4000';

function Home() {
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      withCredentials: true, 
      query: {
        userId: localStorage.getItem('userId'),
      },
    });

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    socket.on('server-message', (data) => {
      console.log('Message from server:', data);
    });

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  return (
    <div className={style.container}>
      {/* Chat List */}
      <div className={style.chatList}>
        <ChatList />
      </div>

      {/* Chat Box */}
      <div className={style.chatBox}>
        <ChatBox />
      </div>
    </div>
  );
}

export default Home;
