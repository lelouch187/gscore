import Image from 'next/image';
import s from './pricingCard.module.scss';
import { MyButton } from '../UI/MyButton';

export const PricingCard = () => {
  return (
    <div className={s.card}>
      <p className={s.cost}>77$</p>
      <h2 className={s.title}>Single site license</h2>
      <p className={s.text}>
        Get the advanced WordPress plugin that optimizes content with GSC
        keywords at one low annual price
      </p>
      <ul className={s.list}>
        <li className={s.list__item}>
          <Image
            className={s.list__img}
            src="/icons/checkCircle.svg"
            width={26}
            height={26}
            alt="checked"
          />{' '}
          Single site license
        </li>
        <li className={s.list__item}>
          <Image
            className={s.list__img}
            src="/icons/checkCircle.svg"
            width={26}
            height={26}
            alt="checked"
          />{' '}
          Special introductory pricing
        </li>
        <li className={s.list__item}>
          <Image
            className={s.list__img}
            src="/icons/checkCircle.svg"
            width={26}
            height={26}
            alt="checked"
          />{' '}
          Unlimited Pages and Keywords
        </li>
        <li className={s.list__item}>
          <Image
            className={s.list__img}
            src="/icons/checkCircle.svg"
            width={26}
            height={26}
            alt="checked"
          />{' '}
          Billed annually
        </li>
      </ul>
      <MyButton
        className={s.card__buttonRed}
        disabled={false}
        isLoading={false}
        variant="secondary">
        Get Gscore
      </MyButton>
    </div>
  );
};
