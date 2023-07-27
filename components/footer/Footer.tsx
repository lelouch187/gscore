import React from 'react';
import s from './footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../UI/icons/logo';
import { Facebook } from '../UI/icons/Facebook';
import { Twitter } from '../UI/icons/Twitter';
import { LinkedIn } from '../UI/icons/LinkedIn';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footer__top}>
          <Logo width="170" height="42" />
          <p className={s.title}>
            Ut enim ad minim veniam quis nostrud exercitation ea commodo
          </p>
        </div>
        <div className={s.footer__bottom}>
          <p className={s.copyright}>
            Copyright © 2022 GScore | All Rights Reserved |{' '}
            <Link className={s.copyright__links} href="/">
              Cookies
            </Link>{' '}
            |{' '}
            <Link className={s.copyright__links} href="/">
              Privacy Policy
            </Link>
          </p>
          <div className={s.social}>
            <a className={s.social__link} href="https://www.facebook.com">
              <Facebook width="36" height="36" />
            </a>
            <a className={s.social__link} href="https://twitter.com">
              <Twitter width="36" height="36" />
            </a>
            <a className={s.social__link} href="www.linkedin.com">
              <LinkedIn width="36" height="36" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
