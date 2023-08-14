'use client';

import { Colors } from '@/variables/colors';
import './tabAuth.scss';
import { usePathname } from 'next/navigation';
import { routes } from '@/variables/routes';

type TabAuthPropsType = {
  text: string;
  index: number;
};

export const TabAuth = ({ text, index }: TabAuthPropsType) => {
  const pathname = usePathname();

  const currentIndex = () => {
    return pathname === routes.registration
      ? 0
      : pathname === routes.login
      ? 1
      : 2;
  };
  const className = index <= currentIndex() ? Colors.active : Colors.default;

  return <div className={className}>{text}</div>;
};
