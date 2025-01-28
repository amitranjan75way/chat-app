import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginUserMutation } from '../../services/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import { useAppDispatch } from '../../store/store';
import { login } from '../../store/reducers/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import ButtonLoader from '../../components/buttonLoader';

// Define the type for the form data
type LoginFormData = {
  email: string;
  password: string;
};

// Validation schema using yup
const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  // LoginForm.tsx (updated)

const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
  try {
    const result = await loginUser(data).unwrap();
    toast.success('Login successful!');
    dispatch(
      login({
        name: result.data.name,
        email: result.data.email,
        role: result.data.role,
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        groups: result.data.groups,
      })
    );
    window.localStorage.setItem('name', result.data.name);
    window.localStorage.setItem('email', result.data.email);
    window.localStorage.setItem('role', result.data.role);
    window.localStorage.setItem('accessToken', result.data.accessToken);
    window.localStorage.setItem('refreshToken', result.data.refreshToken);
    window.localStorage.setItem('isAuthenticated', 'true');
    window.localStorage.setItem('groups', JSON.stringify(result.data.groups)); // Store groups in localStorage
    navigate('/');
  } catch (err) {
    const errorCode = (err as any)?.data?.error_code;
    if (errorCode === 404) {
      toast.error('User not found.');
    } else if (errorCode === 401) {
      toast.error('Incorrect password.');
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }
};


  return (
    <div className={style.loginContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.header}>Welcome Back!</h1>
        <p className={style.subHeader}>Log in to continue</p>

        {/* Login Form */}
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${style.inputGroup} ${errors.email ? style.errorInputGroup : ''}`}>
            <label>Enter Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Your Email"
              className={errors.email ? style.errorInput : ''}
            />
            {errors.email && <p className={style.error}>{errors.email.message}</p>}
          </div>

          <div className={`${style.inputGroup} ${errors.password ? style.errorInputGroup : ''}`}>
            <label>Enter Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Your Password"
                className={`${style.passwordInput} ${errors.password ? style.errorInput : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={style.eyeIcon}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className={style.error}>{errors.password.message}</p>}
          </div>


          <button type="submit" className={style.loginButton} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : 'Log In'}
          </button>

          {/* Register Link */}
          <div className={style.registerLink}>
            <p>
              Don't have an account?{' '}
              <Link to="/register" className={style.registerButton}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
