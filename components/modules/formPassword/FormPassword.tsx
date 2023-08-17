'use client';
import { useForm } from 'react-hook-form';
import s from './formPassword.module.scss';
import MyInput from '@/components/UI/myInput/MyInput';
import { MyButton } from '@/components/UI/myButton/MyButton';
import { Colors } from '@/variables/colors';
import { useChangePasswordMutation } from '@/store/services';
import { UNAUTHORIZED } from '@/variables/constant';
import { ErrorRegistrationType } from '@/store/types';

type FormValuesType = {
  currentPassword: string;
  newPassword: string;
};
type FormPasswordPropsType = {
  resetUser: () => void;
};

export const FormPassword = ({ resetUser }: FormPasswordPropsType) => {
  const [changePassword, { isLoading, error, isSuccess }] = useChangePasswordMutation<any>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmit = handleSubmit(async (data) => {
    await changePassword(data)
      .unwrap()
      .then(() => reset())
      .catch((error: ErrorRegistrationType) => {
        if (error.statusCode === UNAUTHORIZED) {
          resetUser();
        }
      });
  });

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <h3 className={s.form__title}>Change password</h3>
      <MyInput
        type="password"
        {...register('currentPassword', {
          minLength: {
            value: 6,
            message: 'password cannot be shorter than 6 characters',
          },
        })}
        error={errors.currentPassword}
        placeholder="Current Password"
      />
      {errors.currentPassword && (
        <span className="error_message">{errors.currentPassword.message}</span>
      )}
      <MyInput
        type="password"
        {...register('newPassword', {
          minLength: {
            value: 6,
            message: 'password cannot be shorter than 6 characters',
          },
        })}
        error={errors.newPassword}
        placeholder="New Password"
      />
      {errors.newPassword && <span className="error_message">{errors.newPassword.message}</span>}
      <MyButton className={`${Colors.primary} user`} isLoading={isLoading}>
        Save
      </MyButton>
      {error && <span className="error_message">{error.data.message}</span>}
      {isSuccess && <span className="succes_message">password changed successfully</span>}
    </form>
  );
};
