import MyCheckbox from '@/components/UI/MyCheckbox/MyCheckbox';
import s from './accordion.module.scss';

const Accordion = () => {
  return (
    <div className={s.accordion}>
      <div className={s.check__wrapper}>
        <MyCheckbox />
      </div>

      <div className={s.license}>
        <p className={s.license__title}>License code</p>
      </div>
    </div>
  );
};
export default Accordion;
