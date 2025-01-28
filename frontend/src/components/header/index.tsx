import React from 'react';
import style from './index.module.css';
import logo from '../../accets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { logout } from '../../store/reducers/authReducer';
import { useLogoutUserMutation } from '../../services/userApi';

const Header = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, name } = useAppSelector((store) => store.auth);

  const handleLogout = async() => {
    try {
      const response = await logoutUser({});
      console.log("User logout", response)
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
      window.localStorage.removeItem('role');
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('isAuthenticated');
  
      dispatch(logout());
      navigate('/');
      console.log(response);
    } catch (error) {
      console.log(error)
    }
   
  };

  return (
    <header className={style.header}>
      <div className={style.logo} onClick={() => navigate('/')}>
        <img src={logo} alt="FApp Logo" />
        <h1>Sout-Chat</h1>
      </div>
      
      <div className={style.actions}>
        {isAuthenticated ? (
          <>
            <div className={style.profile} onClick={() => navigate('/profile')}>
              <span className={style.userName}>{name}</span>
              <i className="fas fa-user-circle" style={{ fontSize: '20px', marginLeft: '5px' }}></i>
            </div>
            <button className={style.logout} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className={style.login} onClick={() => navigate('/login')}>Login</button>
            <button className={style.signup} onClick={() => navigate('/register')}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
