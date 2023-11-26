import { PricingCards } from '@/components/modules/PricingCards/PricingCards';
import s from '../styles/home.module.scss';
import Link from 'next/link';

export async function generateStaticParams() {
  const cards = await fetch(
    'https://internship.purrweb.site/api/products',
  ).then((res) => res.json());

  return cards;
}

export default async function Home() {
  const cards = await generateStaticParams();

  return (
    <div className={s.home}>
      <h1 className={s.home__title}>Get started with Gscore today!</h1>
      <div className={s.home__wrapper}>
        <PricingCards cards={cards} />
      </div>
      <p className={s.home__text}>Have more than 10 sites?</p>
      <Link href="#" className={s.home__link}>
        Contact us
      </Link>
    </div>
  );
}
