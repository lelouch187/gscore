import Link from 'next/link';
import s from './header.module.scss';
import { Navigation } from './navigation/Navigation';
import { Logo } from '../UI/icons/logo';

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
