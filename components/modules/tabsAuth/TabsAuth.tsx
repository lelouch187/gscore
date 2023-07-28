import { TabAuth } from '@/components/UI/TabAuth/TabAuth';
import s from './tabsAuth.module.scss';

export const TabsAuth = () => {
  const texts = ['Create account', 'Log in', 'Checkout'];

  return (
    <div className={s.tabs}>
      {texts.map((text, i) => {
        return <TabAuth key={i} index={i} text={text} />;
      })}
    </div>
  );
};
