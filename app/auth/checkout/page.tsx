'use client';

import { Bucket } from '@/components/UI/icons/Bucket';
import s from '../../../styles/auth.module.scss';
import '../../../components/UI/MyButton/myButton.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import { selectGetUser } from '@/store/slice/userSlice';
import { routes } from '@/variables/routes';

export default function Checkout() {
  const router = useRouter();
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
          <span>Single site license</span>
          <span>
            <span className={s.accordion__price}>$77</span>{' '}
            <Bucket width="24" height="24" />
          </span>
        </div>
      </div>
      <div className={s.checkout__total}>
        <span>Total:</span>
        <span>$77</span>
      </div>
      <MyButton className="primary checkout" disabled={false} isLoading={false}>
        Purchase
      </MyButton>
    </div>
  );
}
