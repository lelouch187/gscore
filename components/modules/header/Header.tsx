import Link from 'next/link';
import s from './header.module.scss';
import { Navigation } from './UI/navigation/Navigation';
import { Logo } from '@/components/UI/icons/Logo';

export default function Header() {
  return (
    <header className={s.header}>
      <Link className={s.wrapper__logo} href="/">
        <Logo width="170" height="42" />
      </Link>
      <Navigation />
    </header>
  );
}
