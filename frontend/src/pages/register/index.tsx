import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import { useRegisterUserMutation } from '../../services/authApi';
import { login } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { Eye, EyeOff } from 'lucide-react'; // For password visibility toggle icons

// Define the type for the form data
type FormData = {
  name: string;
  email: string;
  password: string;
};

// Validation schema using yup
const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Password must be at least 8 characters')
});

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const [showPassword, setShowPassword] = useState(false);

  // SignupForm.tsx (updated)

const onSubmit: SubmitHandler<FormData> = async (data) => {
  try {
    const response = await registerUser(data).unwrap();

    dispatch(login({
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      groups: response.data.groups, // Store groups on registration
    }));

    window.localStorage.setItem('name', response.data.name);
    window.localStorage.setItem('email', response.data.email);
    window.localStorage.setItem('accessToken', response.data.accessToken);
    window.localStorage.setItem('refreshToken', response.data.refreshToken);
    window.localStorage.setItem('isAuthenticated', 'true');
    window.localStorage.setItem('groups', JSON.stringify(response.data.groups)); // Store groups in localStorage

    toast.success('User Registered successfully');
    reset();
    navigate('/');
  } catch (err) {
    if ((err as any)?.data?.err_code === 409) {
      toast.error('User already exists');
    }
    if((err as any)?.data?.err_code === 500) {
      toast.error('Something went wrong')
    }
  }
};


  return (
    <div className={style.signupContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.header}>
          Welcome to <span className={style.brandName}>My App</span>
        </h1>
        <p className={style.subHeader}>Register to get started!</p>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputGroup}>
            <label>Enter Name</label>
            <input type="text" {...register('name')} placeholder="Your Name" />
            {errors.name && <p className={style.error}>{errors.name.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Enter Email</label>
            <input type="email" {...register('email')} placeholder="Your Email" />
            {errors.email && <p className={style.error}>{errors.email.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Enter Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Your Password"
              />
              <button
                type="button"
                className={style.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className={style.error}>{errors.password.message}</p>}
          </div>

          {isError && error && (
            <p className={style.error}>{error.data?.message || 'An error occurred!'}</p>
          )}

          <button type="submit" className={style.registerButton} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : <span>Register</span>}
          </button>
          <p>
            Already have an account?{' '}
            <Link to="/login" className={style.loginButton}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
