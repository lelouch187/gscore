'use client';
import Link from 'next/link';
import s from './popup.module.scss';
import React from 'react';
import { Settings } from '@/components/UI/icons/settings';
import { Logout } from '@/components/UI/icons/Logout';
import { routes } from '@/variables/routes';
import { useAppDispatch } from '@/store';
import { logoutUser } from '@/store/slice/userSlice';
import { useRouter } from 'next/navigation';

type PopupPropsType = {
  setActive: (item: boolean) => void;
};

export const Popup = ({ setActive }: PopupPropsType) => {
  const diptach = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    diptach(logoutUser());
    setActive(false);
    router.push(routes.registration);
  };

  return (
    <nav className={s.nav}>
      <ul className={s.menu}>
        <li>
          <Link className={s.menu__link} href={routes.settings}>
            <Settings width="24" height="24" />
            Settings
          </Link>
        </li>
        <li onClick={logout} className={s.menu__link}>
          <Logout width="24" height="24" />
          Logout
        </li>
      </ul>
    </nav>
  );
};
