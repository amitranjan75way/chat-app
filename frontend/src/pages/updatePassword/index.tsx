import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useUpdatePasswordMutation } from '../../services/userApi';
import ButtonLoader from '../../components/buttonLoader';
import style from './index.module.css';

// Form validation schema using Yup
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .min(2, 'New Password must be at least 2 characters'),
});

// Define the form data type
type UpdatePasswordFormData = {
  oldPassword: string;
  newPassword: string;
};

const UpdatePassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<UpdatePasswordFormData>({
    resolver: yupResolver(validationSchema),
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const onSubmit: SubmitHandler<UpdatePasswordFormData> = async (data) => {
    console.log("this is data", data);
    const toastId = toast.loading('Updating password...');
    try {
      const response = await updatePassword(data).unwrap();
      console.log("response: ", response);
      toast.success('Password updated successfully!', { id: toastId });
    } catch (err: any) {
      console.log("Error is in update password : ", err);
      toast.error(err?.data?.message || 'Failed to update password', { id: toastId });
    }
  };

  return (
    <div className={style.updatePasswordContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.header}>Update Password</h1>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Old Password */}
          <div className={style.inputGroup}>
            <label>Old Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showOldPassword ? 'text' : 'password'}
                {...register('oldPassword')}
                placeholder="Enter Old Password"
              />
              <button
                type="button"
                className={style.eyeInsideInput}
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.oldPassword && <p className={style.error}>{errors.oldPassword.message}</p>}
          </div>

          {/* New Password */}
          <div className={style.inputGroup}>
            <label>New Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword')}
                placeholder="Enter New Password"
              />
              <button
                type="button"
                className={style.eyeInsideInput}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && <p className={style.error}>{errors.newPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={style.updateButton}
            disabled={!isDirty || isLoading}
          >
            {isLoading ? <ButtonLoader /> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
