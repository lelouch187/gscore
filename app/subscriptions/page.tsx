'use client';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import s from '../../styles/subscriptions.module.scss';
import { Colors } from '@/variables/colors';
import { NoSubscriptions } from '@/components/modules/noSubscriptions/NoSubscriptions';
import { useGetSubscriptionsQuery } from '@/store/services';

export default function Subscriptions() {
  const { data: subscriptions, isLoading } = useGetSubscriptionsQuery(null);

  return (
    <div className={s.subscriptions}>
      <div className={s.subscriptions__top}>
        <h1 className={s.subscriptions__text}>My subscriptions</h1>
        {!subscriptions?.length ||
          (isLoading && (
            <MyButton
              className={`${Colors.primary} subscriptions`}
              isLoading={false}
              disabled={false}>
              Upgrade
            </MyButton>
          ))}
      </div>
      {subscriptions?.length || isLoading ? <div></div> : <NoSubscriptions />}
    </div>
  );
}
