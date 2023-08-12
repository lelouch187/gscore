'use client';

import { Bucket } from '@/components/UI/icons/Bucket';
import s from '../../../styles/auth.module.scss';
import '../../../components/UI/MyButton/myButton.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectGetUser } from '@/store/slice/userSlice';
import { routes } from '@/variables/routes';
import { resetUpgrade, selectProductInfo } from '@/store/slice/productsSlice';
import {
  useBySubscribeMutation,
  useUpgradeSubscribeMutation,
} from '@/store/services';
import { useResetToken } from '@/hooks/resetToken';
import { UNAUTHORIZED } from '@/variables/constant';
import { useState } from 'react';
import { Colors } from '@/variables/colors';

export default function Checkout() {
  const router = useRouter();
  const { selectedProduct, subscribeId, productId } =
    useAppSelector(selectProductInfo);
  const { token } = useAppSelector(selectGetUser);
  const [bySubscribe, { error: subscribeError, isLoading: subscribeLoading }] =
    useBySubscribeMutation<any>();
  const [upgrade, { error, isLoading }] = useUpgradeSubscribeMutation<any>();
  const resetToken = useResetToken();
  const [errorUpgrade, setErrorUpgrade] = useState('');
  const dispatch = useAppDispatch();

  const handlePurchaseSubscribe = async () => {
    if (selectedProduct) {
      await bySubscribe(selectedProduct?.id)
        .then(() => router.push(routes.subscription))
        .catch((err) => {
          if (err.statusCode === UNAUTHORIZED) {
            resetToken();
          }
        });
    }
  };
  const handleUpgradeSubscribe = async () => {
    const selectedProductId = selectedProduct?.id;
    if (productId !== selectedProductId) {
      setErrorUpgrade('');
      await upgrade({ productId: selectedProductId || null, subscribeId })
        .then(() => {
          dispatch(resetUpgrade());
          router.push(routes.subscription);
        })
        .catch((err) => {
          if (err.statusCode === UNAUTHORIZED) {
            resetToken();
          }
        });
    } else {
      setErrorUpgrade('You already this subscription');
    }
  };

  if (!token) {
    router.push(routes.registration);
  }
  if (!selectedProduct) {
    router.push(routes.chooseCard);
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
          <span>{selectedProduct?.sitesCount} site license</span>
          <span>
            <span className={s.accordion__price}>
              ${selectedProduct?.prices[0].price}
            </span>{' '}
            <Bucket />
          </span>
        </div>
      </div>
      <div className={s.checkout__total}>
        <span>Total:</span>
        <span>${selectedProduct?.prices[0].price}</span>
      </div>
      {subscribeId ? (
        <MyButton
          onClick={handleUpgradeSubscribe}
          className={`${Colors.primary} checkout`}
          disabled={false}
          isLoading={isLoading}>
          Upgrade
        </MyButton>
      ) : (
        <MyButton
          onClick={handlePurchaseSubscribe}
          className={`${Colors.primary} checkout`}
          disabled={false}
          isLoading={subscribeLoading}>
          Purchase
        </MyButton>
      )}
      {subscribeError && (
        <span className="error_message">{subscribeError.data.message}</span>
      )}
      {error && <span className="error_message">{error.data.message}</span>}
      {errorUpgrade && <span className="error_message">{errorUpgrade}</span>}
    </div>
  );
}
