'use client';

import React, { useState } from 'react';
import s from './mobilePopup.module.scss';
import { MobileMenu } from '@/components/UI/icons/MobileMenu';
import { Close } from '@/components/UI/icons/Close';
import { LogoMobile } from '@/components/UI/icons/LogoMobile';
import { useAppDispatch, useAppSelector } from '@/store';
import { logoutUser, selectGetUser } from '@/store/slice/userSlice';
import { ChevronDown } from '@/components/UI/icons/ChevronDown';
import Link from 'next/link';
import { routes } from '@/variables/routes';
import { Setting } from '@/components/UI/icons/Setting';
import { useRouter } from 'next/navigation';
import { Logout } from '@/components/UI/icons/Logout';
import { resetUpgrade } from '@/store/slice/productsSlice';

const MobilePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setisActive] = useState(false);
  const user = useAppSelector(selectGetUser);

  const disptach = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    disptach(logoutUser());
    disptach(resetUpgrade());
    setisActive(false);
    setIsVisible(false);
    router.push(routes.registration);
  };

  return (
    <div className={s.popup}>
      <div onClick={() => setIsVisible(true)}>
        <MobileMenu />
      </div>
      <aside className={isVisible ? `${s.aside} ${s.visible}` : `${s.aside}`}>
        <div className={s.popup__header}>
          <div onClick={() => setIsVisible(false)} className={s.close__wrapper}>
            <Close />
          </div>
          <div className={s.logo__wrapper}>
            <LogoMobile />
          </div>
        </div>
        <p
          onClick={() => {
            router.push(routes.subscriptions);
            setIsVisible(false);
          }}
          className={s.subscriptions}>
          My subscriptions
        </p>
        {user.username && (
          <div className={s.content}>
            <p onClick={() => setisActive((prev) => !prev)} className={s.name}>
              {user.username}
              <span
                className={isActive ? `${s.arrow} ${s.active}` : `${s.arrow}`}>
                <ChevronDown />
              </span>
            </p>
            {isActive && (
              <nav className={s.nav}>
                <ul className={s.menu}>
                  <li>
                    <Link
                      onClick={() => {
                        setIsVisible(false);
                        setisActive(false);
                      }}
                      className={s.menu__link}
                      href={routes.settings}>
                      <Setting />
                      Settings
                    </Link>
                  </li>
                  <li onClick={logout} className={s.menu__link}>
                    <Logout />
                    Logout
                  </li>
                </ul>
              </nav>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};

export default MobilePopup;
