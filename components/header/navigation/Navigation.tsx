'use client';
import React, { useState } from 'react';
import s from './navigation.module.scss';
import Link from 'next/link';
import { Popup } from '../popup/Popup';
import { useGetUserQuery } from '@/store/services';
import { ChevronDown } from '@/components/UI/icons/ChevronDown';
import { routes } from '@/variables/routes';

export const Navigation = () => {
  const { data: user, isLoading, error } = useGetUserQuery(null);
  const [isActive, setActive] = useState<boolean>(false);

  if (isLoading || error) {
    return null;
  }

  return (
    <nav className={s.nav}>
      <Link className={s.link} href={routes.subscriptions}>
        My subscriptions
      </Link>
      <div onClick={() => setActive((prev) => !prev)} className={s.name}>
        {user?.username}
        <span className={isActive ? `${s.arrow} ${s.active}` : `${s.arrow}`}>
          <ChevronDown width="24" height="24" />
        </span>
      </div>
      {isActive && <Popup />}
    </nav>
  );
};
