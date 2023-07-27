'use client';
import React, { useState } from 'react';
import s from './navigation.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Popup } from '../popup/Popup';
import { useGetUserQuery } from '@/store/services';

const navItems = [
  { label: 'Settings', href: '/settings' },
  { label: 'Login', href: '/login' },
];

export const Navigation = () => {
  const { data: user, error } = useGetUserQuery(null);
  const [isActive, setActive] = useState<boolean>(false);

  if (error) {
    return null;
  }

  return (
    <nav className={s.nav}>
      <Link className={s.link} href="/subscriptions">
        My subscriptions
      </Link>
      <div onClick={() => setActive((prev) => !prev)} className={s.name}>
        {user?.username}
        <span className={isActive ? `${s.arrow} ${s.active}` : `${s.arrow}`}>
          <Image
            src="/icons/ChevronDown.svg"
            alt="ChevronDown"
            width={24}
            height={24}
          />
        </span>
      </div>
      {isActive && <Popup navLinks={navItems} />}
    </nav>
  );
};
