'use client';
import Link from 'next/link';
import s from './popup.module.scss';
import React from 'react';
import { Settings } from '@/components/UI/icons/Settings';
import { Logout } from '@/components/UI/icons/Logout';
import { routes } from '@/variables/routes';
import { useAppDispatch } from '@/store';
import { logoutUser } from '@/store/slice/userSlice';
import { useRouter } from 'next/navigation';

type PopupPropsType = {
  setActive: (item: boolean) => void;
};

export const Popup = ({ setActive }: PopupPropsType) => {
  const disptach = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    disptach(logoutUser());
    setActive(false);
    router.push(routes.registration);
  };

  return (
    <nav className={s.nav}>
      <ul className={s.menu}>
        <li>
          <Link onClick={() => setActive(false)} className={s.menu__link} href={routes.settings}>
            <Settings />
            Settings
          </Link>
        </li>
        <li onClick={logout} className={s.menu__link}>
          <Logout />
          Logout
        </li>
      </ul>
    </nav>
  );
};
