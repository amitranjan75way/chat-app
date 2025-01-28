import React from 'react';
import styles from './index.module.css';
import logo from '../../accets/logo.jpg';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo Here" className={styles.footerlogo}/>
          </div>
          <span className={styles.appName}>Food Delivery App</span>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className={styles.socials}>
          <a href="#facebook" className={styles.icon}>Facebook</a>
          <a href="#twitter" className={styles.icon}>Twitter</a>
          <a href="#instagram" className={styles.icon}>Instagram</a>
        </div>
      </div>
      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
