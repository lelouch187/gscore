'use client';
import { useGetProductCardQuery } from '@/store/services';
import s from './pricingCard.module.scss';
import { CardItem } from './UI/cardItem/CardItem';

export const PricingCards = () => {
  const { data: cards } = useGetProductCardQuery(null);
  return (
    <div className={`${s.cardWrapper} container`}>
      {cards &&
        cards.map((card) => {
          return <CardItem key={card.id} card={card} />;
        })}
    </div>
  );
};
