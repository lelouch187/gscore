'use client';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import s from '../../../styles/subscriptions.module.scss';
import { Colors } from '@/variables/colors';
import { useRouter } from 'next/navigation';
import { routes } from '@/variables/routes';
import SubscriptionsClose from '@/components/UI/icons/SubscriptionsClose';

export const NoSubscriptions = () => {
  const router = useRouter();

  return (
    <div className={s.subscriptions__out}>
      <SubscriptionsClose />
      <p className={s.subscriptions__title}>No active subscriptions</p>
      <p className={s.subscriptions__subtitle}>
        You can subscribe right now by clicking on the button below
      </p>
      <MyButton
        onClick={() => router.push(routes.chooseCard)}
        className={`${Colors.primary} out`}
        isLoading={false}
        disabled={false}>
        Get Gscore
      </MyButton>
    </div>
  );
};
