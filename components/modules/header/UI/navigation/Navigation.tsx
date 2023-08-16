'use client';
import React, { useState } from 'react';
import s from './navigation.module.scss';
import Link from 'next/link';
import { Popup } from '../popup/Popup';
import { ChevronDown } from '@/components/UI/icons/ChevronDown';
import { routes } from '@/variables/routes';
import { useAppSelector } from '@/store';
import { selectGetUser } from '@/store/slice/userSlice';

export const Navigation = () => {
  const user = useAppSelector(selectGetUser);
  const [isActive, setActive] = useState(false);

  if (!user.token) {
    return null;
  }

  return (
    <nav className={s.nav}>
      <Link className={s.link} href={routes.subscriptions}>
        My subscriptions
      </Link>
      <div onClick={() => setActive((prev) => !prev)} className={s.name}>
        {user.username}
        <span className={isActive ? `${s.arrow} ${s.active}` : `${s.arrow}`}>
          <ChevronDown />
        </span>
      </div>
      {isActive && <Popup setActive={setActive} />}
    </nav>
  );
};
