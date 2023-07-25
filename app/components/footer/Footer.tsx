import React from 'react';
import s from './footer.module.scss';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footer__top}>
          <Image className={s.img} src="/logo.svg" alt="logo" width={170} height={42} />
          <p className={s.title}>Ut enim ad minim veniam quis nostrud exercitation ea commodo</p>
        </div>
        <div className={s.footer__bottom}></div>
      </div>
    </footer>
  );
};
