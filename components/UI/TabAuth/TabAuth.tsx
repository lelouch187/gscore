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
    if (pathname === routes.registration) {
      return 0;
    } else if (pathname === routes.login) {
      return 1;
    }
    return 2;
  };
  const className = index <= currentIndex() ? Colors.active : Colors.default;

  return <div className={className}>{text}</div>;
};
