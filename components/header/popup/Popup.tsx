'use client';
import Link from 'next/link';
import s from './popup.module.scss';
import React from 'react';
import Image from 'next/image';
import { Settings } from '@/components/UI/icons/settings';
import { Logout } from '@/components/UI/icons/logout';
import { routes } from '@/variables/routes';

export const Popup = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.menu}>
        <li>
          <Link className={s.menu__link} href={routes.settings}>
            <Settings width="24" height="24" />
            Settings
          </Link>
        </li>
        <li className={s.menu__link}>
          <Logout width="24" height="24" />
          Logout
        </li>
      </ul>
    </nav>
  );
};
