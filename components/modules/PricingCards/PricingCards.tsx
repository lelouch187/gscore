'use client';

import s from './pricingCard.module.scss';
import { CardItem } from './UI/cardItem/CardItem';
import { ProductCardType } from '@/store/types';

export const PricingCards = ({ cards }: any) => {
  return (
    <div className={`${s.cardWrapper} container`}>
      {cards &&
        cards.map((card: ProductCardType) => {
          return <CardItem key={card.id} card={card} />;
        })}
    </div>
  );
};
