'use client';
import MyInput from '@/components/UI/MyInput/MyInput';
import s from './formInfo.module.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { useForm } from 'react-hook-form';
import { Colors } from '@/variables/colors';
import { useChangeInfoMutation, useGetUserQuery } from '@/store/services';
import { EMAILVALIDATION, UNAUTHORIZED } from '@/variables/constant';
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
  const [changeInfo, { error, isLoading }] = useChangeInfoMutation<any>();
  const { data: user } = useGetUserQuery(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmit = handleSubmit(async (data) => {
    await changeInfo(data)
      .unwrap()
      .then((resp) => {
        dispatch(changeNameUser(resp.username));
      })
      .catch((error) => {
        if (error.statuscode === UNAUTHORIZED) {
          resetUser();
        }
      })
      .finally(() => {
        reset();
      });
  });

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <h3 className={s.form__title}>Personal Info</h3>
      <MyInput
        {...register('username', { required: 'field cannot be empty' })}
        error={errors.username}
        placeholder={user?.username || 'Username'}
      />
      {errors.username && (
        <span className="error_message">{errors.username.message}</span>
      )}
      <MyInput
        {...register('email', {
          pattern: {
            value: EMAILVALIDATION,
            message: 'incorrect email',
          },
        })}
        error={errors.email}
        placeholder={user?.email || 'email'}
      />
      {errors.email && (
        <span className="error_message">{errors.email.message}</span>
      )}
      <MyButton className={`${Colors.primary} user`} isLoading={isLoading}>
        Save
      </MyButton>
      {error && <span className="error_message">{error.data.message}</span>}
    </form>
  );
};
