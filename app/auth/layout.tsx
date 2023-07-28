import s from '../../styles/auth.module.scss';
import { TabsAuth } from '@/components/modules/tabsAuth/TabsAuth';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.auth}>
      <TabsAuth />
      {children}
    </div>
  );
}
