import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateGroupMutation } from '../../services/chatApi'; // Adjust the import path
import style from './index.module.css';
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader'; // Import your ButtonLoader component

interface GroupFormData {
  groupName: string;
  groupDescription: string;
}

const CreateGroupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<GroupFormData>();
  const [createGroup, { isLoading }] = useCreateGroupMutation(); // RTK Query hook
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: GroupFormData) => {
    setLoading(true);
    try {
      // Call the RTK Query mutation to create the group
      const response = await createGroup({
        name: data.groupName,
        description: data.groupDescription,
      }).unwrap();

      toast.success('Group created successfully!');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.pageContainer}>
      <h1>Create a New Group</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
        <div>
          <label htmlFor="groupName">Group Name</label>
          <input
            id="groupName"
            {...register('groupName', { required: 'Group Name is required' })}
            className={style.inputField}
            placeholder="Enter group name"
          />
          {errors.groupName && <p className={style.error}>{errors.groupName.message}</p>}
        </div>

        <div>
          <label htmlFor="groupDescription">Group Description</label>
          <textarea
            id="groupDescription"
            {...register('groupDescription', { required: 'Group Description is required' })}
            className={style.inputField}
            placeholder="Enter group description"
          />
          {errors.groupDescription && <p className={style.error}>{errors.groupDescription.message}</p>}
        </div>

        <div className={style.formActions}>
          <button type="submit" className={style.createBtn} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : 'Create Group'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupPage;
