'use client';

import { useAppSelector } from '@/store';
import { selectGetProduct } from '@/store/slice/productsSlice';
import s from '../../styles/subscription.module.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { Colors } from '@/variables/colors';
import { useRouter } from 'next/navigation';
import { routes } from '@/variables/routes';

export default function Subscription() {
  const selectedProduct = useAppSelector(selectGetProduct);
  const router = useRouter();

  return (
    <div className={s.subscription}>
      <h2 className={s.subscription__title}>Start your subscription</h2>
      <p className={s.subscription__text}>
        We have sent you a payment receipt by e-mail and a link to download the
        plugin with a license key.
      </p>
      <div className={s.subscription__accordion}>
        <div className={s.accordion__title}>
          <span>Package name</span>
          <span>Price</span>
        </div>
        <div className={s.accordion__item}>
          <span>{selectedProduct?.sitesCount} site license</span>
          <span>
            <span className={s.accordion__price}>
              ${selectedProduct?.prices[0].price}
            </span>
          </span>
        </div>
      </div>
      <MyButton
        onClick={() => router.push(routes.subscriptions)}
        className={Colors.primary}
        disabled={false}
        isLoading={false}>
        Go to my subscriptions
      </MyButton>
    </div>
  );
}
