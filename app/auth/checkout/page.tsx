'use client';

import { Bucket } from '@/components/UI/icons/Bucket';
import s from '../../../styles/auth.module.scss';
import '../../../components/UI/MyButton/myButton.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import { selectGetUser } from '@/store/slice/userSlice';
import { routes } from '@/variables/routes';
import { selectGetProduct } from '@/store/slice/productsSlice';

export default function Checkout() {
  const router = useRouter();
  const productCard = useAppSelector(selectGetProduct);
  const { token } = useAppSelector(selectGetUser);

  if (!token) {
    router.push(routes.registration);
  }

  return (
    <div className={s.checkout}>
      <h2 className={s.checkout__title}>Checkout</h2>
      <div className={s.checkout__accordion}>
        <div className={s.accordion__title}>
          <span>Package name</span>
          <span>Price</span>
        </div>
        <div className={s.accordion__item}>
          <span>{productCard?.sitesCount} site license</span>
          <span>
            <span className={s.accordion__price}>
              {productCard?.prices[0].price}
            </span>{' '}
            <Bucket width="24" height="24" />
          </span>
        </div>
      </div>
      <div className={s.checkout__total}>
        <span>Total:</span>
        <span>{productCard?.prices[0].price}</span>
      </div>
      <MyButton className="primary checkout" disabled={false} isLoading={false}>
        Purchase
      </MyButton>
    </div>
  );
}
