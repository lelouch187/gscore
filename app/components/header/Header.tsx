import Link from 'next/link';
import s from './header.module.scss';
import Image from 'next/image';
import { Navigation } from './navigation/Navigation';

export default function Header() {
  return (
    <header className={s.header}>
      <Link className={s.wrapper__logo} href="/">
        <Image src="/logo.svg" alt="logo" width={170} height={42} />
      </Link>
      <Navigation />
    </header>
  );
}
