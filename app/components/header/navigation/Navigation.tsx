'use client';
import React from 'react';
import s from './navigation.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export const Navigation = () => {
  return (
    <nav className={s.nav}>
      <Link href="/subscriptions">My subscriptions</Link>
      <p>
        name{' '}
        <span>
          <Image src="/icons/ChevronDown.svg" alt="ChevronDown" width={24} height={24} />
        </span>
      </p>
    </nav>
  );
};
