import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAcceptInviteMutation } from '../../services/chatApi'; // Adjust the import path
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader'; // Import your ButtonLoader component
import style from './index.module.css'; // Adjust the import path for styles

const AcceptInvitationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the invite ID from the URL
  const navigate = useNavigate();
  const [acceptInvite, { isLoading }] = useAcceptInviteMutation(); // RTK Query hook
  const [loading, setLoading] = useState(false);

  const handleJoinGroup = async () => {
    if (!id) return;
    setLoading(true);
    try {
      // Call the RTK Query mutation to accept the invitation
      await acceptInvite(id).unwrap();
      toast.success('You have successfully joined the group!');
      navigate('/dashboard'); // Navigate to your dashboard or group page
    } catch (error) {
      toast.error(error.message || 'Failed to join the group');
    } finally {
      setLoading(false);
    }
  };

  const handleIgnore = () => {
    navigate('/dashboard'); // Navigate to the dashboard or another page
  };

  return (
    <div className={style.pageContainer}>
      <h1>Accept Invitation</h1>
      <p>You have been invited to join a group with ID: {id}</p>

      <div className={style.formActions}>
        <button 
          onClick={handleJoinGroup} 
          className={style.joinBtn} 
          disabled={isLoading}
        >
          {isLoading ? <ButtonLoader /> : 'Join Group'}
        </button>

        <button 
          onClick={handleIgnore} 
          className={style.ignoreBtn}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default AcceptInvitationPage;
