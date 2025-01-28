import React from 'react';
import style from './index.module.css';

const ButtonLoader: React.FC = () => {
  return (
    <div className={style.loader}>
        <span className="loader"></span>
    </div>
  );
};

export default ButtonLoader;
