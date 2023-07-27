import React from 'react';
import s from './footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footer__top}>
          <Image
            className={s.img}
            src="/logo.svg"
            alt="logo"
            width={170}
            height={42}
          />
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
              <Image
                src="/icons/Facebook.svg"
                alt="facebook"
                width={36}
                height={36}
              />
            </a>
            <a className={s.social__link} href="https://twitter.com">
              <Image
                src="/icons/Twitter.svg"
                alt="twitter"
                width={36}
                height={36}
              />
            </a>
            <a className={s.social__link} href="www.linkedin.com">
              <Image
                src="/icons/LinkedIn.svg"
                alt="linkedIn"
                width={36}
                height={36}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
