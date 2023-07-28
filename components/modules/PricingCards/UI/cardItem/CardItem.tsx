import s from './cardItem.module.scss';
import { MyButton } from '../../../../UI/MyButton/MyButton';
import { ProductCardType } from '@/store/types';
import { useRouter } from 'next/navigation';
import { useGetUserQuery } from '@/store/services';
import { Colors } from '@/variables/colors';
import { CheckCircle } from '@/components/UI/icons/CheckCircle';
import { routes } from '@/variables/routes';
import { useAppDispatch } from '@/store';
import { selectProduct } from '@/store/slice/productsSlice';

type CardItemProps = {
  card: ProductCardType;
};

export const CardItem = ({ card }: CardItemProps) => {
  const { data: user, error } = useGetUserQuery(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const classBtn =
    card.id === 2
      ? `${s.card__buttonRed} ${Colors.secondary}`
      : `${s.card__buttonBlack} ${Colors.secondary}`;

  const hanldeSelectPropduct = () => {
    dispatch(selectProduct(card));
    if (error) {
      router.push(routes.registration);
    }
  };

  return (
    <div className={card.id === 2 ? `${s.card} ${s.active}` : `${s.card}`}>
      <p className={s.cost}>${card.prices[0].price}</p>
      <h2 className={s.title}>{card.sitesCount} site license</h2>
      <p className={card.id === 2 ? `${s.text} ${s.active}` : `${s.text}`}>
        Get the advanced WordPress plugin that optimizes content with GSC
        keywords at one low annual price
      </p>
      <ul className={s.list}>
        <li className={s.list__item}>
          <CheckCircle width="26" height="26" />
          <span className={s.list__text}>
            All features for {card.sitesCount} sites
          </span>
        </li>
        <li className={s.list__item}>
          <CheckCircle width="26" height="26" />
          <span className={s.list__text}>Special introductory pricing</span>
        </li>
        <li className={s.list__item}>
          <CheckCircle width="26" height="26" />
          <span className={s.list__text}>Unlimited Pages and Keywords</span>
        </li>
        <li className={s.list__item}>
          <CheckCircle width="26" height="26" />
          <span className={s.list__text}>Billed annually</span>
        </li>
      </ul>
      <MyButton
        onClick={hanldeSelectPropduct}
        className={classBtn}
        disabled={false}
        isLoading={false}
        variant="primary">
        Get Gscore
      </MyButton>
    </div>
  );
};
