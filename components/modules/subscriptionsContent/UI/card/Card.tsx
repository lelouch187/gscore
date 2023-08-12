import StatusText from '@/components/UI/statusText/StatusText';
import s from './card.module.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { Colors } from '@/variables/colors';
import { subscriptionType } from '@/store/types';
import getDate from '@/utils/getDate';

type CardPropsType = {
  subscription: subscriptionType;
  isDisabled: boolean;
  setActiveCard: () => void;
};

const Card = ({ subscription, isDisabled }: CardPropsType) => {
  const date = getDate(subscription.currentPeriodEnd);

  return (
    <div className={isDisabled ? `${s.card}` : `${s.card} ${s.disabled}`}>
      <div className={s.card__header}>
        <p className={s.header__title}>Gscore</p>
        <StatusText status={subscription.status} />
      </div>
      <div className={s.card__main}>
        <div className={s.card__left}>
          <p className={s.card__title}>{subscription.product.name} license</p>
          <p className={s.card__subtitle}>valid until {date}</p>
        </div>
        <div className={s.card__right}>
          ${subscription.product.prices[0].price}
        </div>
      </div>
      <div className={s.btn__wrapper}>
        <MyButton
          className={`${Colors.secondary} btn__card`}
          isLoading={false}
          disabled={false}>
          View
        </MyButton>
      </div>
    </div>
  );
};
export default Card;
