import { PricingCard } from './components/pricingCard/PricingCard';
import s from './home.module.scss';

export default function Home() {
  return (
    <div className={s.home}>
      <h1 className={s.home__title}>Get started with Gscore today!</h1>
      <div className={`${s.cardWrapper} container`}>
        <PricingCard />
        <PricingCard />
        <PricingCard />
      </div>
    </div>
  );
}
