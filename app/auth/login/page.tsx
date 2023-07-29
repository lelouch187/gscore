'use client';

import MyInput from '@/components/UI/MyInput/MyInput';
import s from '../../../styles/auth.module.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { useForm } from 'react-hook-form';
import {
  ErrorRegistrationType,
  loginUserType,
  successLoginType,
} from '@/store/types';
import { useAppDispatch } from '@/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Colors } from '@/variables/colors';
import { useLoginMutation } from '@/store/services';
import { setUser } from '@/store/slice/userSlice';
import { routes } from '@/variables/routes';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserType>();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = handleSubmit(async (user) => {
    setError('');
    setLoading(true);
    await login(user)
      .unwrap()
      .then((resp) => {
        dispatch(setUser(resp as unknown as successLoginType));
        router.push(routes.checkout);
      })
      .catch((error: ErrorRegistrationType) => {
        console.log(error);
        setError(error.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <>
      <div className={s.registration__text}>
        <h1 className={s.registration__title}>Log in</h1>
      </div>
      <form onSubmit={onSubmit} className={s.registration__form}>
        <MyInput
          placeholder="Email"
          error={errors.email}
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: 'incorrect email',
            },
          })}
        />
        {errors.email && (
          <span className="error_message">{errors.email.message}</span>
        )}
        <MyInput
          placeholder="Password"
          error={errors.password}
          {...register('password', {
            minLength: {
              value: 6,
              message: 'password cannot be shorter than 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="error_message">{errors.password.message}</span>
        )}
        <MyButton
          type="submit"
          className={`${Colors.primary} registration`}
          isLoading={loading}
          disabled={false}>
          Log in
        </MyButton>
        <span className="error_message">{error}</span>
      </form>
    </>
  );
}
