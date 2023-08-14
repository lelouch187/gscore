import { PricingCards } from '@/components/modules/PricingCards/PricingCards';
import s from '../styles/home.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={s.home}>
      <h1 className={s.home__title}>Get started with Gscore today!</h1>
      <div className={s.home__wrapper}>
        <PricingCards />
      </div>
      <p className={s.home__text}>Have more than 10 sites?</p>
      <Link href="#" className={s.home__link}>
        Contact us
      </Link>
    </div>
  );
}
