import React, { useState } from 'react';
import { useSendMessageMutation } from '../../services/chatApi';
import { addMessage } from '../../store/reducers/messageReducer';
import style from './index.module.css';
import { useAppDispatch, useAppSelector } from '../../store/store';


const SendMessage: React.FC = () => {
  
  const [messageContent, setMessageContent] = useState('');
  const dispatch = useAppDispatch();
  const { selectedGroupId } = useAppSelector((state: any) => state.messageReducer);
  const { name, groups, email } = useAppSelector((state: any) => state.auth); 

  const [sendMessage] = useSendMessageMutation();

  // Check if user is a member of the selected group
  const isMember = groups.includes(selectedGroupId); // Check if selectedGroupId is in the groups array

  const handleMessageSend = async () => {
    if (messageContent.trim() === '') {
      return;
    }

    try {
      const newMessage = {
        groupId: selectedGroupId,
        content: messageContent,
      };
      
      // Call the mutation to send the message
      const response = await sendMessage(newMessage).unwrap(); 
      console.log(response)

      // After the message is successfully sent, add it to Redux state
      const messageToStore = {
        _id: response.sentMessage._id,
        sender: {
          _id: response.sentMessage.sennder,
          name: name,
          email: email,
        },
        content: messageContent,
        createdAt: new Date().toISOString(),
        group: selectedGroupId,
      };
      
      dispatch(addMessage(messageToStore)); 
      setMessageContent('');

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleJoinRequest = () => {
    // Dispatch action or make an API call to send join request
    console.log('Sending join request to the group');
  };

  return (
    <div className={style.messageFooter}>
      {isMember ? ( 
        <div className={style.messageForm}>
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type a message..."
            className={style.messageInput}
          />
          <button onClick={handleMessageSend} className={style.sendBtn}>
            Send
          </button>
        </div>
      ) : ( // If the user is not a member, show join request button
        <button onClick={handleJoinRequest} className={style.joinRequestBtn}>
          Request to Join
        </button>
      )}
    </div>
  );
};

export default SendMessage;
