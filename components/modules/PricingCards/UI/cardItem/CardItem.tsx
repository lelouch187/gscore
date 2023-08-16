import s from './cardItem.module.scss';

import { ProductCardType } from '@/store/types';
import { useRouter } from 'next/navigation';
import { Colors } from '@/variables/colors';
import { CheckCircle } from '@/components/UI/icons/CheckCircle';
import { routes } from '@/variables/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectProduct } from '@/store/slice/productsSlice';
import { selectGetUser } from '@/store/slice/userSlice';
import { MyButton } from '@/components/UI/myButton/MyButton';

type CardItemProps = {
  card: ProductCardType;
};

export const CardItem = ({ card }: CardItemProps) => {
  const user = useAppSelector(selectGetUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const classBtn =
    card.id === 2
      ? `${s.card__buttonRed} ${Colors.secondary}`
      : `${s.card__buttonBlack} ${Colors.secondary}`;

  const hanldeSelectPropduct = () => {
    dispatch(selectProduct(card));
    if (user.username) {
      router.push(routes.checkout);
    } else {
      router.push(routes.registration);
    }
  };

  return (
    <div className={card.id === 2 ? `${s.card} ${s.active}` : `${s.card}`}>
      <p className={s.cost}>${card.prices[0].price}</p>
      <h2 className={s.title}>{card.sitesCount} site license</h2>
      <p className={card.id === 2 ? `${s.text} ${s.active}` : `${s.text}`}>
        Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual
        price
      </p>
      <ul className={s.list}>
        <li className={s.list__item}>
          <CheckCircle />
          <span className={s.list__text}>All features for {card.sitesCount} sites</span>
        </li>
        <li className={s.list__item}>
          <CheckCircle />
          <span className={s.list__text}>Special introductory pricing</span>
        </li>
        <li className={s.list__item}>
          <CheckCircle />
          <span className={s.list__text}>Unlimited Pages and Keywords</span>
        </li>
        <li className={s.list__item}>
          <CheckCircle />
          <span className={s.list__text}>Billed annually</span>
        </li>
      </ul>
      <MyButton onClick={hanldeSelectPropduct} className={classBtn}>
        Get Gscore
      </MyButton>
    </div>
  );
};
