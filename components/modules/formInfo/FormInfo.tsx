'use client';
import MyInput from '@/components/UI/MyInput/MyInput';
import s from './formInfo.module.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { useForm } from 'react-hook-form';
import { Colors } from '@/variables/colors';
import { useChangeInfoMutation } from '@/store/services';
import { UNAUTHORIZED } from '@/variables/constant';
import { useDispatch } from 'react-redux';
import { changeNameUser } from '@/store/slice/userSlice';
import { useState } from 'react';

type FormValuesType = {
  username: string;
  email: string;
};
type FormInfoPropsType = {
  resetUser: () => void;
};

export const FormInfo = ({ resetUser }: FormInfoPropsType) => {
  const [changeInfo] = useChangeInfoMutation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await changeInfo(data)
      .unwrap()
      .then((resp) => {
        dispatch(changeNameUser(resp.username));
      })
      .catch((error) => {
        if (error.statuscode === UNAUTHORIZED) {
          resetUser();
        } else {
          setError(error.data.message);
        }
      })
      .finally(() => {
        reset();
        setLoading(false);
      });
  });

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <h3 className={s.form__title}>Personal Info</h3>
      <MyInput
        {...register('username', { required: 'field cannot be empty' })}
        error={errors.username}
        placeholder="Username"
      />
      {errors.username && (
        <span className="error_message">{errors.username.message}</span>
      )}
      <MyInput
        {...register('email', {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            message: 'incorrect email',
          },
        })}
        error={errors.email}
        placeholder="Email"
      />
      {errors.email && (
        <span className="error_message">{errors.email.message}</span>
      )}
      <MyButton
        className={`${Colors.primary} user`}
        isLoading={loading}
        disabled={false}>
        Save
      </MyButton>
      <span className="error_message">{error}</span>
    </form>
  );
};
