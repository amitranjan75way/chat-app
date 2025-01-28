import React, { useEffect } from 'react';
import style from './index.module.css';
import { useGetChatListQuery } from '../../services/chatApi';
import ChatListSkeleton from './ChatListSkeletonLoad';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setGroups } from '../../store/reducers/groupList';
import { setSelectedGroupId } from '../../store/reducers/messageReducer';
import { useNavigate } from 'react-router-dom';

interface Group {
  _id: string;
  name: string;
  description: string;
  profilePic?: string;
  admin: string;
  members: string[];
  inviteLink: string;
  joinRequests: { user: string; status: "PENDING" | "ACCEPTED" | "REJECTED" }[];
  createdAt: string;
  updatedAt: string;
}

const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetChatListQuery({});
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groupList.groups);
  const { selectedGroupId } = useAppSelector((state) => state.messageReducer);
  const { name } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (data?.groups) {
      dispatch(setGroups(data.groups));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className={style.chatContainer}>
        <div className={style.chatListContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <ChatListSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className={style.errorMessage}>Error fetching chat list</div>;
  }

  const showChatHandle = (id: string) => {
    dispatch(setSelectedGroupId(id)); // Update the selected group ID in the store
  }

  return (
    <div className={style.chatContainer}>
      <div className={style.chatListContainer}>
        {groups.map((group: Group) => (
          <div
            key={group._id}
            className={`${style.chatItem} ${group._id === selectedGroupId ? style.selectedChat : ''}`}
            onClick={() => showChatHandle(group._id)}
          >
            <img
              src={group.profilePic || 'https://via.placeholder.com/150'}
              alt={group.name}
              className={style.avatar}
            />
            <div className={style.chatDetails}>
              <div className={style.chatHeader}>
                <span className={style.chatName}>{group.name}</span>
                <span className={style.chatTime}>
                  {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                </span>
              </div>
              <div className={style.lastMessage}>
                <span className={group.joinRequests.length > 0 ? style.unreadMessage : ''}>
                  {group.joinRequests.length > 0
                    ? `${group.joinRequests.length} Pending Request(s)`
                    : group.description || 'No description available'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile and Logout Section */}
      <div className={style.bottomLeftContainer}>
        <div className={style.profileSection}>
          <img
            src="https://ui-avatars.com/api/${name}?background=random"
            alt="Profile"
            className={style.profileAvatar}
          />
        </div>
        <div className={style.iconSection}>
          <button className={style.createGroup} onClick={()=>navigate("/create-group")}>create group</button>
          <button className={style.logoutBtn}>Logout</button>  
        </div>
      </div>
    </div>
  );
};

export default ChatList;
