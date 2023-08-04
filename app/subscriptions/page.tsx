'use client';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import s from '../../styles/subscriptions.module.scss';
import { Colors } from '@/variables/colors';
import { NoSubscriptions } from '@/components/modules/noSubscriptions/NoSubscriptions';

export default function Subscriptions() {
  return (
    <div className={s.subscriptions}>
      <div className={s.subscriptions__top}>
        <h1 className={s.subscriptions__text}>My subscriptions</h1>
        <MyButton
          className={`${Colors.primary} subscriptions`}
          isLoading={false}
          disabled={false}>
          Upgrade
        </MyButton>
      </div>
      <NoSubscriptions />
    </div>
  );
}
