import Link from 'next/link';
import s from './header.module.scss';
import { Navigation } from './UI/navigation/Navigation';
import { Logo } from '@/components/UI/icons/Logo';
import MobilePopup from './UI/mobilePopup/MobilePopup';
import { routes } from '@/variables/routes';

export default function Header() {
  return (
    <header className={s.header}>
      <Link className={s.wrapper__logo} href={routes.chooseCard}>
        <Logo />
      </Link>
      <Navigation />
      <MobilePopup />
    </header>
  );
}
