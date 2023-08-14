import MyCheckbox from '@/components/UI/MyCheckbox/MyCheckbox';
import s from './accordion.module.scss';
import { CodeType } from '@/store/types';
import { Copy } from '@/components/UI/icons/Copy';
import { INACTIVE } from '@/variables/constant';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { Colors } from '@/variables/colors';
import { useActivateCodeMutation } from '@/store/services';
import StatusText from '@/components/UI/statusText/StatusText';

type AccordionPropsType = {
  cardCode: CodeType;
  selectCodes: (checked: boolean) => void;
  checked: boolean;
};

const Accordion = ({ cardCode, selectCodes, checked }: AccordionPropsType) => {
  const [activate, { isLoading: activateLoading }] = useActivateCodeMutation();
  const isActive = cardCode.status !== INACTIVE;
  const isActiveButton = !isActive;

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleActiveCode = async () => {
    activate({ code: cardCode.code });
  };

  return (
    <div className={s.accordion}>
      <div className={s.check__wrapper}>
        <MyCheckbox onChange={() => selectCodes(checked)} checked={checked} />
      </div>
      <div className={s.license}>
        <div className={s.license__code}>
          <p className={s.license__title}>License code</p>
          <div className={s.license__links}>
            <div className={s.license__link}>{cardCode.code}</div>
            <button
              onClick={() => copyText(cardCode.code)}
              className={s.copy__btn}>
              <Copy />
            </button>
          </div>
        </div>
        <div className={s.domain}>
          <div className={s.domain__title}>Domain</div>
          <div
            className={
              isActive ? `${s.domain__link} activeDomain` : `${s.domain__link}`
            }>
            {cardCode.origin}
          </div>
        </div>
        <div className={s.activate__status}>
          {isActiveButton && (
            <MyButton
              loaderColor="#FC5842"
              onClick={handleActiveCode}
              className={`${Colors.secondary} activate`}
              isLoading={activateLoading}
              disabled={activateLoading}>
              Activate
            </MyButton>
          )}
        </div>
        <div className={s.status__state}>
          <div className={s.status__title}>Status</div>
          <StatusText status={cardCode.status} />
        </div>
      </div>
    </div>
  );
};
export default Accordion;
