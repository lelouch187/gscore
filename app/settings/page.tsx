'use client';
import { useState } from 'react';
import s from '../../styles/settings.module.scss';
import { FormInfo } from '@/components/modules/formInfo/FormInfo';
import { FormPassword } from '@/components/modules/formPassword/FormPassword';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import { selectGetUser } from '@/store/slice/userSlice';
import { routes } from '@/variables/routes';
import { useResetToken } from '@/hooks/resetToken';

export default function Settings() {
  const [activeTub, changeActiveTab] = useState(0);
  const { username } = useAppSelector(selectGetUser);
  const resetUser = useResetToken();
  const router = useRouter();

  if (!username) {
    router.push(routes.registration);
  }

  return (
    <div className={s.settings}>
      <h2 className={s.settings__title}>Settings</h2>
      <nav className={s.settings__tabs}>
        {['Personal info', 'Change password'].map((item, i) => {
          return (
            <p
              key={i}
              onClick={() => changeActiveTab(i)}
              className={activeTub === i ? `${s.settings__item} ${s.active}` : s.settings__item}>
              {item}
            </p>
          );
        })}
      </nav>
      {activeTub === 1 ? (
        <FormPassword resetUser={resetUser} />
      ) : (
        <FormInfo resetUser={resetUser} />
      )}
    </div>
  );
}
