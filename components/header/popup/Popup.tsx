'use client';
import Link from 'next/link';
import s from './popup.module.scss';
import React from 'react';
import Image from 'next/image';

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};

export const Popup = ({ navLinks }: Props) => {
  const icons = [
    { href: '/icons/settings.svg', title: 'settings' },
    { href: '/icons/logout.svg', title: 'logout' },
  ];
  return (
    <nav className={s.nav}>
      <ul className={s.menu}>
        {navLinks.map((navLink, i) => {
          return (
            <Link className={s.menu__link} key={navLink.label} href={navLink.href}>
              <Image
                className={s.img}
                src={icons[i].href}
                alt={icons[i].title}
                width={24}
                height={24}
              />
              {navLink.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
