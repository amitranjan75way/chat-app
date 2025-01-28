import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSendInviteMutation } from '../../services/chatApi'; // Adjust the import path
import style from './index.module.css';
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader'; // Import your ButtonLoader component
import { useLocation } from 'react-router-dom';

interface InvitationFormData {
  email: string;
}

const SendInvitationPage: React.FC = () => {
  
  const location = useLocation();
  const { groupId } = location.state || {};
  const { register, handleSubmit, formState: { errors } } = useForm<InvitationFormData>();
  const [sendInvite, { isLoading }] = useSendInviteMutation();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: InvitationFormData) => {
    setLoading(true);
    try {
      // Call the RTK Query mutation to send the invitation
      const response = await sendInvite({ email: data.email, groupId }).unwrap();
      
      toast.success('Invitation link sent successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to send the invitation link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.pageContainer}>
      <h1>Send Invitation Link</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
        <div>
          <label htmlFor="email">Recipient's Email</label>
          <input
            id="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' } 
            })}
            className={style.inputField}
            placeholder="Enter recipient's email"
          />
          {errors.email && <p className={style.error}>{errors.email.message}</p>}
        </div>

        <div className={style.formActions}>
          <button type="submit" className={style.sendBtn} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : 'Send Invitation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendInvitationPage;
