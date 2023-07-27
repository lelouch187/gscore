import Image from 'next/image';
import s from './cardItem.module.scss';
import { MyButton } from '../../UI/MyButton/MyButton';
import { ProductCardType } from '@/store/types';

type CardItemProps = {
  card: ProductCardType;
};

export const CardItem = ({ card }: CardItemProps) => {
  return (
    <div className={card.id === 2 ? `${s.card} ${s.active}` : `${s.card}`}>
      <p className={s.cost}>{card.prices[0].price}</p>
      <h2 className={s.title}>{card.sitesCount} site license</h2>
      <p className={card.id === 2 ? `${s.text} ${s.active}` : `${s.text}`}>
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
          All features for {card.sitesCount} sites
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
        className={
          card.id === 2 ? `${s.card__buttonRed}` : `${s.card__buttonBlack}`
        }
        disabled={false}
        isLoading={false}
        variant="secondary">
        Get Gscore
      </MyButton>
    </div>
  );
};
