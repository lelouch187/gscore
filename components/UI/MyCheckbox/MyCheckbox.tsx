import { InputHTMLAttributes } from 'react';
import { Check } from '../icons/Check';
import './myCheckbox.scss';

const MyCheckbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="checkbox">
      <div className="checkbox__wrapper">
        <Check />
      </div>
      <input
        {...props}
        className="checkbox__input"
        type="checkbox"
        name="checkbox"
      />
      <label htmlFor="checkbox">{props.value}</label>
    </div>
  );
};
export default MyCheckbox;
